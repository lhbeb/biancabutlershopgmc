import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';

interface HeroProps {
  products?: Product[];
}

interface HeroTile {
  label: string;
  title: string;
  cta: string;
  href: string;
  image: string;
  alt: string;
}

function isEligibleProduct(product: Product, excludedSlugs: Set<string>) {
  return Boolean(
    product.slug &&
      product.images?.[0] &&
      product.published !== false &&
      product.inStock !== false &&
      !excludedSlugs.has(product.slug),
  );
}

function findProductByCategory(
  products: Product[],
  category: string,
  excludedSlugs: Set<string> = new Set(),
) {
  return products.find((product) => {
    if (!isEligibleProduct(product, excludedSlugs)) return false;
    return product.category?.trim().toLowerCase() === category.toLowerCase();
  });
}

function productHref(product: Product) {
  return `/products/${product.slug}`;
}

function createTile(
  product: Product | undefined,
  label: string,
  title = product?.title ?? '',
  cta = 'View piece',
): HeroTile | null {
  if (!product?.images?.[0] || !product.slug) return null;

  return {
    label,
    title,
    cta,
    href: productHref(product),
    image: product.images[0],
    alt: product.title,
  };
}

function addUsedSlug(product: Product | undefined, usedSlugs: Set<string>) {
  if (product?.slug) usedSlugs.add(product.slug);
}

export default function Hero({ products = [] }: HeroProps) {
  const availableProducts = products.filter(
    (product) => product.images?.[0] && product.slug && product.published !== false && product.inStock !== false,
  );

  const usedSlugs = new Set<string>();

  const flagship = findProductByCategory(availableProducts, 'Collectible Figurines', usedSlugs) ?? availableProducts[0];
  addUsedSlug(flagship, usedSlugs);

  const sculpture = findProductByCategory(availableProducts, 'Sculptures & Statues', usedSlugs);
  addUsedSlug(sculpture, usedSlugs);

  const artwork = findProductByCategory(availableProducts, 'Art & Prints', usedSlugs);
  addUsedSlug(artwork, usedSlugs);

  const anotherFigurine = findProductByCategory(availableProducts, 'Collectible Figurines', usedSlugs);

  const tiles = [
    createTile(
      flagship,
      'Collectible figurines',
      'Figurines with a story to tell',
      'View figurine',
    ),
    createTile(sculpture, 'Sculptures & statues'),
    createTile(artwork, 'Art & prints'),
    createTile(anotherFigurine, 'More from the collection'),
  ].filter((tile): tile is HeroTile => Boolean(tile));

  if (tiles.length === 0) return null;

  const [mainTile, secondaryTile, ...smallTiles] = tiles;
  const hasSideTiles = Boolean(secondaryTile || smallTiles.length > 0);

  return (
    <section className="bg-[#f6efe5] py-3 md:py-4" aria-labelledby="home-hero-title">
      <div className="container mx-auto px-4">
        <div className={`grid w-full gap-3 ${hasSideTiles ? 'lg:grid-cols-[1.08fr_1fr]' : ''}`}>
          <Link
            href={mainTile.href}
            className={`group relative min-h-[230px] overflow-hidden rounded-xl bg-[#2f1b12] shadow-sm sm:min-h-[280px] ${
              hasSideTiles ? 'lg:min-h-[392px]' : 'lg:min-h-[330px]'
            }`}
          >
            <Image
              src={mainTile.image}
              alt={mainTile.alt}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-contain object-right-bottom p-5 transition-transform duration-500 group-hover:scale-[1.03] sm:p-8"
              unoptimized={mainTile.image.startsWith('http')}
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#2f1b12] via-[#2f1b12]/86 to-[#2f1b12]/16"
              aria-hidden="true"
            />
            <div className="absolute bottom-3 left-3 right-3 max-w-none rounded-xl bg-[#2f1b12]/70 p-4 text-white sm:bottom-5 sm:left-5 sm:right-5 md:bottom-8 md:left-8 md:right-auto md:max-w-[500px] md:bg-[#2f1b12]/52 md:p-6">
              <p className="text-sm font-semibold text-[#fff8ed]/85">{mainTile.label}</p>
              <h1
                id="home-hero-title"
                className="mt-2 text-2xl font-bold leading-tight text-white sm:text-3xl md:text-[2.45rem]"
              >
                {mainTile.title}
              </h1>
              <span className="mt-3 inline-flex items-center justify-center rounded-lg bg-[#4b2e22] px-4 py-2 text-xs font-bold text-[#fff8ed] transition-colors group-hover:bg-[#5a3828] sm:px-5 sm:py-2.5 sm:text-sm">
                {mainTile.cta}
              </span>
            </div>
          </Link>

          {(secondaryTile || smallTiles.length > 0) && (
            <div className="hidden gap-3 lg:grid">
              {secondaryTile && (
                <Link
                  href={secondaryTile.href}
                  className="group grid min-h-[210px] overflow-hidden rounded-xl bg-white shadow-sm md:grid-cols-[0.72fr_1.28fr]"
                >
                  <div className="flex flex-col justify-center p-5">
                    <p className="text-sm font-semibold text-[#4b2e22]">{secondaryTile.label}</p>
                    <h2 className="mt-3 line-clamp-2 text-xl font-bold leading-tight text-[#261810] md:text-[1.65rem]">
                      {secondaryTile.title}
                    </h2>
                    <span className="mt-3 inline-flex w-fit items-center rounded-lg bg-[#4b2e22] px-5 py-2.5 text-sm font-bold text-[#fff8ed] transition-colors group-hover:bg-[#2f1b12]">
                      {secondaryTile.cta}
                    </span>
                  </div>
                  <div className="relative min-h-[190px] bg-white md:min-h-full">
                    <Image
                      src={secondaryTile.image}
                      alt={secondaryTile.alt}
                      fill
                      sizes="(max-width: 1023px) 100vw, 35vw"
                      className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.04]"
                      unoptimized={secondaryTile.image.startsWith('http')}
                    />
                  </div>
                </Link>
              )}

              {smallTiles.length > 0 && (
                <div className="grid gap-3 md:grid-cols-2">
                  {smallTiles.map((tile) => (
                    <Link
                      key={tile.href}
                      href={tile.href}
                      className="group grid min-h-[169px] grid-cols-[0.82fr_1.18fr] overflow-hidden rounded-xl bg-white shadow-sm"
                    >
                      <div className="flex flex-col justify-center p-4">
                        <p className="text-sm font-semibold text-[#4b2e22]">{tile.label}</p>
                        <h2 className="mt-2 line-clamp-2 text-xl font-bold leading-tight text-[#261810]">
                          {tile.title}
                        </h2>
                      </div>
                      <div className="relative bg-white">
                        <Image
                          src={tile.image}
                          alt={tile.alt}
                          fill
                          sizes="(max-width: 767px) 45vw, 20vw"
                          className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.05]"
                          unoptimized={tile.image.startsWith('http')}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
