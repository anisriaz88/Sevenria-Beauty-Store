import React from 'react';
import CategoryStoryCircles from '../components/home/CategoryStoryCircles';
import HeroSection from '../components/home/HeroSection';
import BestSellers from '../components/home/BestSellers';
import NewArrivals from '../components/home/NewArrivals';
import ComboDealSection from '../components/home/ComboDealSection';
import CategorySection from '../components/home/CategorySection';
import PromoBanner from '../components/home/PromoBanner';

export default function HomePage() {
  return (
    <div className="homepage-view">
      {/* Visual Category Story Circles Banner */}
      <CategoryStoryCircles />

      {/* Hero Section Banner Slider */}
      <HeroSection />

      {/* 1. Best Sellers */}
      <BestSellers />

      {/* 2. New Arrivals */}
      <NewArrivals />

      {/* 3. Combo Deal */}
      <ComboDealSection />

      {/* 4. Browse by Categories */}
      <CategorySection />

      {/* Editorial Promotional Banner */}
      <PromoBanner />
    </div>
  );
}
