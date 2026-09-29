import type { Product } from '@/types/product';

export interface CategoryNavItem {
  label: string;
  href: string;
  categoryKey: string;
  description: string;
}

export const CATALOG_NAVIGATION: readonly CategoryNavItem[] = [
  {
    label: 'All',
    href: '/#products',
    categoryKey: 'all',
    description: 'Explore the complete Bianca Butler collection of antiques and decorative finds.',
  },
  {
    label: 'Figurines',
    href: '/search?category=Figurines',
    categoryKey: 'figurines',
    description: 'Characterful figurines, sculptures, and small collected objects for display.',
  },
  {
    label: 'Decor',
    href: '/search?category=Decor',
    categoryKey: 'decor',
    description: 'Decorative pieces that bring texture, history, and personality to a room.',
  },
  {
    label: 'Vintage Finds',
    href: '/search?category=Vintage%20Finds',
    categoryKey: 'vintage-finds',
    description: 'Distinctive vintage home accents chosen for their character and patina.',
  },
  {
    label: 'Collectibles',
    href: '/search?category=Collectibles',
    categoryKey: 'collectibles',
    description: 'Memorable objects and curiosities for collectors and thoughtful gifting.',
  },
  {
    label: 'Curated Finds',
    href: '/search?category=Curated%20Finds',
    categoryKey: 'curated-finds',
    description: 'A rotating edit of unusual pieces that deserve a second look.',
  },
] as const;

export const POPULAR_CATEGORY_NAMES = [
  'Figurines',
  'Decor',
  'Vintage Finds',
  'Collectibles',
  'Curated Finds',
] as const;

export const POPULAR_CATEGORY_IMAGES: Record<string, string> = {};

/**
 * Filter antique products by category, collection, or search term.
 * The fallback keeps a newly rebranded catalog browsable while inventory is being migrated.
 */
export function filterProductsByCategory(products: Product[], categoryOrQuery: string): Product[] {
  if (!products || products.length === 0) return [];

  const query = categoryOrQuery.trim().toLowerCase();
  if (!query || query === 'all') {
    return products;
  }

  const exactMatches = products.filter(
    (p) => String(p.category || '').trim().toLowerCase() === query,
  );
  if (exactMatches.length > 0) return exactMatches;

  const keywordMatches = products.filter((p) => {
    const title = String(p.title || '').toLowerCase();
    const desc = String(p.description || '').toLowerCase();
    const cat = String(p.category || '').toLowerCase();
    const collections = (p.collections || []).join(' ').toLowerCase();
    return title.includes(query) || desc.includes(query) || cat.includes(query) || collections.includes(query);
  });

  return keywordMatches.length > 0 ? keywordMatches : products;
}
