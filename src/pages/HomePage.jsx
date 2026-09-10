import React from 'react';
import CategoryStoryCircles from '../components/home/CategoryStoryCircles';
import HeroSection from '../components/home/HeroSection';
import FlashDealsSection from '../components/home/FlashDealsSection';
import PromoMechanicsSection from '../components/home/PromoMechanicsSection';
import CategorySection from '../components/home/CategorySection';
import TikTokViralShelf from '../components/home/TikTokViralShelf';
import BeautyRoutineAdvisor from '../components/home/BeautyRoutineAdvisor';
import BestSellers from '../components/home/BestSellers';
import BrandShowcase from '../components/home/BrandShowcase';
import PromoBanner from '../components/home/PromoBanner';
import TrustSection from '../components/home/TrustSection';
import CustomerReviews from '../components/home/CustomerReviews';
import Newsletter from '../components/home/Newsletter';

export default function HomePage() {
  return (
    <div className="homepage-view">
      {/* 1. Watsons-style Visual Story Categories */}
      <CategoryStoryCircles />

      {/* 2. High-Converting Split Hero with Promo Cards */}
      <HeroSection />

      {/* 3. Live Countdown Flash Deals of the Day */}
      <FlashDealsSection />

      {/* 4. Tiered Merchandising Promotions (BOGO, 3 for 2, Under AED 75) */}
      <PromoMechanicsSection />

      {/* 5. Trending on TikTok UAE / Community Viral Favorites */}
      <TikTokViralShelf />

      {/* 6. Curated Category Explorations */}
      <CategorySection />

      {/* 7. Interactive 3-Step Routine Advisor (1-Click Bundle Save 15%) */}
      <BeautyRoutineAdvisor />

      {/* 8. UAE Most Loved Best Sellers */}
      <BestSellers />

      {/* 9. Official Brand Showcase */}
      <BrandShowcase />

      {/* 10. Featured Promotion Banner */}
      <PromoBanner />

      {/* 11. Trust & Authenticity Guarantees */}
      <TrustSection />

      {/* 12. Verified Customer Reviews */}
      <CustomerReviews />

      {/* 13. VIP Club & Newsletter */}
      <Newsletter />
    </div>
  );
}
