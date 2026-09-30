require('dotenv').config({ path: '.env.local' });

const fs = require('node:fs/promises');
const path = require('node:path');
const { createClient } = require('@supabase/supabase-js');

const inputPath = process.argv[2] || path.join(process.env.TEMP || process.env.TMP, 'bianca-ebay-scraped.json');
const stagingDir = path.join(process.env.TEMP || process.env.TMP, 'bianca-ebay-images');
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !serviceKey) throw new Error('Missing Bianca Supabase service environment.');
const supabase = createClient(supabaseUrl, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

const clean = (value) => String(value || '').replace(/\s+/g, ' ').trim();
const slugify = (value) => clean(value).normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function parseSpecifics(raw) {
  const lines = String(raw || '').split(/\r?\n/);
  const fields = {};
  for (let i = 0; i < lines.length - 2; i++) {
    const container = lines[i].match(/container\s+(.+?)\s*$/);
    if (!container) continue;
    const label = clean(container[1]);
    if (!label || ['Item specifics', 'Category'].includes(label)) continue;
    const labelLine = lines.slice(i + 1, i + 3).some((line) => new RegExp(`\\btext\\s+${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'i').test(line));
    if (!labelLine) continue;
    const valueLine = lines.slice(i + 1, i + 5).find((line) => /^\s*\d+ text\s+/.test(line) && !new RegExp(`\\btext\\s+${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'i').test(line));
    const value = clean(valueLine?.replace(/^\s*\d+ text\s+/, '').replace(/[“”]/g, ''));
    if (value && value !== '—' && value !== 'Not specified') fields[label] = value;
  }
  return fields;
}

function parseDescription(raw) {
  const lines = String(raw || '').split(/\r?\n/).map((line) => clean(line.replace(/^\s*\d+ text\s+/, '')));
  const skip = /^(Item description from the seller|Import Duties & Customs|Professional Packaging|What's Included|Design & Craftsmanship|History & Dating|Collector Appeal|Condition|Dimensions|Specifications|Shipping|Returns|Payment|Terms|Delivery)$/i;
  return lines.filter((line) => line && !/^\d+ /.test(line) && !skip.test(line) && !/^https?:\/\//i.test(line))
    .filter((line) => !/unable to provide shipping|import duties|customs fees|professionally packed|shop with confidence|feedback consistently/i.test(line))
    .join(' ');
}

function parsePrice(raw) {
  const match = clean(raw).match(/^(C\s*\$|US\s*\$|GBP\s*)([0-9,]+(?:\.\d{1,2})?)/i);
  if (!match) throw new Error(`Cannot parse listing price: ${raw}`);
  return {
    currency: /^C/i.test(match[1]) ? 'CAD' : /^GBP/i.test(match[1]) ? 'GBP' : 'USD',
    price: Number(match[2].replace(/,/g, '')),
  };
}

function normalizeCondition(raw, id, title, description) {
  const condition = clean(raw);
  if (/^new(?:\s|$)/i.test(condition)) return 'New';
  if (/used|pre-owned|previously owned/i.test(condition)) return 'Used';
  if (id === '397784686481') return 'Used'; // Listing has no condition field; avoid asserting new for an unverified handmade collectible.
  if (id === '283051475136') return 'Used'; // Seller describes this as vintage and states its condition.
  if (/vintage|retired|antique|pre-owned|used/i.test(`${title} ${description}`)) return 'Used';
  throw new Error(`Condition not established for listing ${id}`);
}

function buildDescription(item, fields, condition) {
  const title = clean(item.title);
  const sourceText = parseDescription(item.description);
  const relevant = Object.entries(fields).filter(([key, value]) => value && !/^(UPC|EAN|MPN|ISBN|Model|Condition|Seller Notes)$/i.test(key));
  const brief = sourceText
    .split(/(?<=[.!?])\s+/)
    .filter((sentence) => sentence.length > 35 && !/no shipping|import duties|customs|seller|photographs form/i.test(sentence))
    .slice(0, 2).join(' ');
  const detailPairs = relevant.slice(0, 14).map(([key, value]) => `${key}: ${value}`);
  return [
    `${title}. ${brief || `A collectible ${fields.Type || 'decorative piece'} offered in ${condition.toLowerCase()} condition.`}`,
    detailPairs.length ? `Specifications and features: ${detailPairs.join('; ')}.` : '',
    `Condition: ${condition}. Please review the product photographs and listing details for the exact item and included components.`,
  ].filter(Boolean).join('\n\n');
}

function categoryFor(item, fields) {
  const text = `${item.title} ${fields.Type || ''} ${fields.Subject || ''}`.toLowerCase();
  if (/print|painting|artwork|watercolor|birth of venus|screaming skull/.test(text)) return 'Art & Prints';
  if (/sculpture|statue|bust|elephant/.test(text)) return 'Sculptures & Statues';
  return 'Collectible Figurines';
}

function brandFor(item, fields) {
  const brand = clean(fields.Brand);
  if (brand) return brand;
  const title = clean(item.title);
  const first = title.match(/^(?:Retired\s+)?(Lladro|Lladró|NAO|Cosmos Gifts|Hussar|Schwarzburger Werkstätten|Giuseppe Armani|Andy Warhol|Salvator Rosa|Bill Owens|WorldBazzar)\b/i);
  return first ? first[1] : 'Unbranded';
}

function extensionFromType(type) {
  if (/image\/webp/i.test(type)) return 'webp';
  if (/image\/png/i.test(type)) return 'png';
  if (/image\/gif/i.test(type)) return 'gif';
  if (/image\/avif/i.test(type)) return 'avif';
  return 'jpg';
}

async function mapLimit(items, limit, worker) {
  let next = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next++;
      await worker(items[index], index);
    }
  });
  await Promise.all(runners);
}

async function main() {
  const items = JSON.parse(await fs.readFile(inputPath, 'utf8'));
  if (items.length !== 38 || new Set(items.map((item) => item.id)).size !== items.length) {
    throw new Error(`Expected 38 distinct listings; received ${items.length}.`);
  }
  await fs.mkdir(stagingDir, { recursive: true });
  const staged = new Map();
  const jobs = items.flatMap((item) => item.images.map((url, index) => ({ item, url, index })));
  let downloaded = 0;
  await mapLimit(jobs, 5, async ({ item, url, index }) => {
    const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://www.ebay.com/' } });
    if (!response.ok) throw new Error(`Image download failed (${response.status}) for ${item.id} image ${index + 1}`);
    const type = response.headers.get('content-type') || '';
    if (!type.startsWith('image/')) throw new Error(`Non-image response for ${item.id} image ${index + 1}: ${type}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length < 1000) throw new Error(`Suspiciously small image for ${item.id} image ${index + 1}`);
    const dir = path.join(stagingDir, item.id);
    await fs.mkdir(dir, { recursive: true });
    const file = path.join(dir, `${String(index + 1).padStart(2, '0')}.${extensionFromType(type)}`);
    await fs.writeFile(file, bytes);
    const list = staged.get(item.id) || [];
    list[index] = { file, type, bytes: bytes.length };
    staged.set(item.id, list);
    downloaded++;
    if (downloaded % 25 === 0) console.log(`Downloaded ${downloaded}/${jobs.length} images`);
  });
  console.log(`Downloaded and verified ${downloaded} images for ${items.length} products.`);

  const existing = await supabase.from('products').select('id,slug').limit(1000);
  if (existing.error) throw new Error(`Product preflight failed: ${existing.error.message}`);
  const existingIds = new Set((existing.data || []).map((row) => row.id));
  const existingSlugs = new Set((existing.data || []).map((row) => row.slug));
  const productRows = [];
  let uploaded = 0;
  for (const item of items) {
    const fields = parseSpecifics(item.specs);
    const parsedPrice = parsePrice(item.price);
    const rawDescription = parseDescription(item.description);
    const condition = normalizeCondition(item.condition, item.id, item.title, rawDescription);
    const category = categoryFor(item, fields);
    const slug = `${slugify(item.title).slice(0, 75)}-${item.id.slice(-6)}`;
    if (existingIds.has(`ebay-${item.id}`) || existingSlugs.has(slug)) {
      console.log(`Skipping already imported listing ${item.id}`);
      continue;
    }
    const images = [];
    for (const [index, image] of staged.get(item.id).entries()) {
      const objectPath = `ebay-collectibles/${slug}/${String(index + 1).padStart(2, '0')}.${path.extname(image.file).slice(1)}`;
      const bytes = await fs.readFile(image.file);
      const { error } = await supabase.storage.from('product-images').upload(objectPath, bytes, {
        contentType: image.type,
        upsert: true,
        cacheControl: '31536000',
      });
      if (error) throw new Error(`Upload failed for ${item.id} image ${index + 1}: ${error.message}`);
      const { data } = supabase.storage.from('product-images').getPublicUrl(objectPath);
      images.push(data.publicUrl);
      uploaded++;
    }
    if (!images.length || images.some((url) => !url.startsWith(`${supabaseUrl}/storage/v1/object/public/product-images/`))) {
      throw new Error(`Invalid hosted image list for listing ${item.id}`);
    }
    productRows.push({
      id: `ebay-${item.id}`,
      slug,
      title: clean(item.title),
      description: buildDescription(item, fields, condition),
      price: parsedPrice.price,
      rating: 0,
      review_count: 0,
      images,
      condition,
      category,
      brand: brandFor(item, fields),
      payee_email: '',
      currency: parsedPrice.currency,
      checkout_link: `https://www.ebay.com/itm/${item.id}`,
      checkout_flow: 'external',
      reviews: [],
      meta: {
        published: true,
        gmc_enabled: false,
        source_platform: 'eBay',
        source_url: `https://www.ebay.com/itm/${item.id}`,
        source_condition: clean(item.condition),
        item_specifics: fields,
      },
      in_stock: true,
      is_featured: false,
      listed_by: null,
      collections: ['collectibles'],
    });
  }

  if (productRows.length) {
    const { error } = await supabase.from('products').upsert(productRows, { onConflict: 'id' });
    if (error) throw new Error(`Product import failed after ${uploaded} image uploads: ${error.message}`);
  }
  console.log(JSON.stringify({ productsInserted: productRows.length, imagesUploaded: uploaded, stagedImages: downloaded, stagingDir }, null, 2));

  const verification = await supabase.from('products')
    .select('id,slug,title,description,price,currency,images,condition,category,brand,checkout_link,checkout_flow,published,meta')
    .like('id', 'ebay-%');
  if (verification.error) throw new Error(`Verification query failed: ${verification.error.message}`);
  const imported = verification.data || [];
  const bad = imported.filter((row) => !row.title || !row.description || !row.price || !row.currency || !row.condition || !row.category || !row.brand || !row.images?.length || row.images.some((url) => !url.startsWith(`${supabaseUrl}/storage/v1/object/public/product-images/`)) || row.meta?.published !== true || row.meta?.gmc_enabled !== false);
  if (bad.length) throw new Error(`Post-import validation found ${bad.length} invalid products.`);
  console.log(JSON.stringify({ verifiedProducts: imported.length, totalHostedImages: imported.reduce((sum, row) => sum + row.images.length, 0), allPublished: imported.every((row) => row.meta?.published === true), allGmcDisabled: imported.every((row) => row.meta?.gmc_enabled === false), externalImageRefs: imported.some((row) => row.images.some((url) => /ebayimg\.com/i.test(url))) }, null, 2));
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
