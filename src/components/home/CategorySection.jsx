import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CATEGORIES } from '../../data/categories';

export default function CategorySection() {
  const { navigateTo } = useShop();

  return (
    <section className="section-padding" style={{ background: 'var(--color-bg-main)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">CURATED COLLECTIONS</span>
          <h2>Explore By Category</h2>
          <p className="section-subtitle">
            From dermatologist-approved barrier care to royal Arabian fragrances, explore our world of elevated beauty.
          </p>
        </div>

        {/* Editorial Responsive Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {CATEGORIES.map((cat, index) => (
            <div 
              key={cat.id} 
              className="category-card"
              onClick={() => navigateTo('shop', { category: cat.id })}
              style={{ cursor: 'pointer' }}
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="category-card-bg"
                loading="lazy" 
              />
              
              <div className="category-card-content">
                <span style={{ 
                  fontSize: '0.68rem', 
                  letterSpacing: '0.16em', 
                  textTransform: 'uppercase', 
                  color: 'var(--color-gold)', 
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '6px'
                }}>
                  {cat.itemCount} CURATED PRODUCTS
                </span>

                <h3 style={{ color: '#FFFFFF', fontSize: '1.65rem', marginBottom: '6px', fontWeight: 600 }}>
                  {cat.name}
                </h3>

                <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.86rem', lineHeight: 1.45, marginBottom: '16px' }}>
                  {cat.description}
                </p>

                <div style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  fontSize: '0.8rem', 
                  fontWeight: 600, 
                  letterSpacing: '0.1em', 
                  textTransform: 'uppercase', 
                  color: '#FFFFFF' 
                }}>
                  <span>DISCOVER {cat.name}</span>
                  <ArrowRight size={16} style={{ color: 'var(--color-gold)' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
