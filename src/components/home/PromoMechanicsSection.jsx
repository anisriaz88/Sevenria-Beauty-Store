import React, { useState } from 'react';
import { Tag, Gift, Sparkles, ArrowRight, Percent } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import ProductCard from '../common/ProductCard';

export default function PromoMechanicsSection() {
  const { productsList, navigateTo } = useShop();
  const [activeTab, setActiveTab] = useState('bogo');

  const bogoProducts = productsList.filter(p => p.discountPercent > 0 || p.isBestSeller).slice(0, 4);
  const threeForTwoProducts = productsList.filter(p => p.priceAED <= 95).slice(0, 4);
  const under75Products = productsList.filter(p => p.priceAED <= 75).slice(0, 4);
  const luxuryPicks = productsList.filter(p => p.category === 'Fragrance' || p.priceAED > 100).slice(0, 4);

  const tabs = [
    { id: 'bogo', label: 'Buy 1 Get 1 @ 50% Off', icon: Percent, count: bogoProducts.length },
    { id: 'three2', label: 'Mix & Match: 3 for 2', icon: Gift, count: threeForTwoProducts.length },
    { id: 'under75', label: 'Staples Under AED 75', icon: Tag, count: under75Products.length },
    { id: 'luxury', label: 'Dubai Luxury Edit', icon: Sparkles, count: luxuryPicks.length }
  ];

  let displayProducts = bogoProducts;
  if (activeTab === 'three2') displayProducts = threeForTwoProducts;
  if (activeTab === 'under75') displayProducts = under75Products;
  if (activeTab === 'luxury') displayProducts = luxuryPicks;

  return (
    <section className="section-padding" style={{ background: '#FFFFFF', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.5rem' }}>
          <span className="section-eyebrow">WATSONS-STYLE VALUE PROMOTIONS</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', marginBottom: '8px' }}>
            Exclusive Multi-Buy & Bundles
          </h2>
          <p className="section-subtitle" style={{ margin: 0 }}>
            Stack your beauty savings with our verified promotions. Automated tier discounts apply directly at checkout.
          </p>
        </div>

        {/* Promo Navigation Tabs */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '2.5rem'
        }}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`promo-tab-btn ${isActive ? 'active' : ''}`}
              >
                <Icon size={16} style={{ color: isActive ? 'var(--color-gold)' : 'inherit' }} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '24px'
        }}>
          {displayProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Banner Hook */}
        <div style={{
          marginTop: '3rem',
          background: 'var(--color-bg-sand)',
          borderRadius: 'var(--radius-sm)',
          padding: '16px 24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          border: '1px solid var(--border-medium)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.4rem' }}>🎁</span>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                VIP Loyalty UAE Perk: Free Luxury Mini on Orders AED 250+
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
                Plus complimentary express dispatch in Dubai & Abu Dhabi.
              </div>
            </div>
          </div>

          <button
            onClick={() => navigateTo('offers')}
            className="btn btn-primary btn-sm"
          >
            <span>Explore All Offers</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
