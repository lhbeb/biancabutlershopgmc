import React, { Suspense } from 'react';
import Hero from '@/components/Hero';
import SameDayShipping from '@/components/SameDayShipping';
import ProductGrid from '@/components/ProductGrid';
import HomeReviews from '@/components/HomeReviews';
import CategorySection from '@/components/CategorySection';
import PopularCategories from '@/components/PopularCategories';
import { getFeaturedProducts, getProducts } from '@/lib/data';
import { homeReviews, homeReviewsStats } from '@/lib/homeReviews';
import ScrollToTop from '@/components/ScrollToTop';
import { FEATURED_PRODUCT_LIMIT } from '@/config/products';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  try {
    const [featuredProducts, products] = await Promise.all([
      getFeaturedProducts(),
      getProducts(),
    ]);

    const featuredFinds = featuredProducts.filter(p =>
      p.published !== false && p.inStock !== false
    );

    const decorativeFinds = products.filter((product) =>
      product.published !== false && product.inStock !== false
    );

  return (
    <>
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
      <Hero products={featuredProducts.length >= 4 ? featuredProducts : products} />

      <PopularCategories products={products} />

      <CategorySection
        products={featuredProducts}
        title="Featured Antiques & Decorative Finds"
        subtitle="A considered selection of figurines, vintage accents, and objects with a story to tell."
        maxDisplay={FEATURED_PRODUCT_LIMIT}
        shuffleForVisitor
        visitorShuffleKey="home-featured"
      />

      <SameDayShipping />

      {featuredFinds.length > 0 && (
        <Suspense fallback={null}>
          <ProductGrid
            products={featuredFinds}
            sectionId="products"
            title=""
            editorialCard={{
              title: 'Objects with a Story',
              description:
                'Discover figurines, decorative pieces, vintage accents, and collectible objects selected for character, charm, and everyday display.',
            }}
            randomizeForVisitor
            visitorShuffleKey="home-espresso"
          />
        </Suspense>
      )}

      {decorativeFinds.length > 0 && (
        <Suspense fallback={null}>
          <ProductGrid
            products={decorativeFinds}
            sectionId="decorative-finds"
            title="A Collected Home"
            randomizeForVisitor
            visitorShuffleKey="home-grinders-gear"
          />
        </Suspense>
      )}

      <HomeReviews
        reviews={homeReviews}
        averageRating={homeReviewsStats.averageRating}
        totalReviews={homeReviewsStats.totalReviews}
      />
    </>
  );
  } catch (error) {
    console.error('Error loading homepage:', error);
    return (
      <>
        <Hero />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-[#261810] mb-4">Unable to load products</h2>
          <p className="text-gray-600">Please refresh the page or try again later.</p>
        </div>
      </>
    );
  }
}
