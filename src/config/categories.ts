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
    label: 'Collectible Figurines',
    href: '/search?category=Collectible%20Figurines',
    categoryKey: 'collectible-figurines',
    description: 'Porcelain and decorative figurines selected for collectors and distinctive displays.',
  },
  {
    label: 'Sculptures & Statues',
    href: '/search?category=Sculptures%20%26%20Statues',
    categoryKey: 'sculptures-statues',
    description: 'Sculptural objects and statues in a range of materials, subjects, and styles.',
  },
  {
    label: 'Art & Prints',
    href: '/search?category=Art%20%26%20Prints',
    categoryKey: 'art-prints',
    description: 'Original artworks, prints, and photographs for collectors and art lovers.',
  },
] as const;

export const POPULAR_CATEGORY_NAMES = [
  'Collectible Figurines',
  'Sculptures & Statues',
  'Art & Prints',
] as const;

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
