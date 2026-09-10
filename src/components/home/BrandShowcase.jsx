import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { BRANDS } from '../../data/brands';

export default function BrandShowcase() {
  const { navigateTo } = useShop();

  const featuredBrands = BRANDS.filter(b => b.featured);

  return (
    <section className="section-padding" style={{ background: '#FFFFFF', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', gap: '20px' }}>
          <div>
            <span className="section-eyebrow">PREMIUM HOUSES</span>
            <h2>Featured Brands</h2>
            <p className="section-subtitle" style={{ margin: '8px 0 0' }}>
              Direct partnerships with iconic dermatological and cosmetic brands.
            </p>
          </div>

          <button 
            onClick={() => navigateTo('brands')}
            className="btn btn-secondary btn-sm"
          >
            <span>ALL BRANDS DIRECTORY (A-Z)</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Clean Luxury Brand Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          {featuredBrands.map((brand) => (
            <div
              key={brand.id}
              onClick={() => navigateTo('shop', { brand: brand.name })}
              style={{
                padding: '24px 20px',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-xs)',
                background: 'var(--color-bg-main)',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all var(--transition-normal)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '130px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-gold)';
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-light)';
                e.currentTarget.style.backgroundColor = 'var(--color-bg-main)';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-sans)',
                marginBottom: '4px'
              }}>
                {brand.name}
              </span>

              <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                {brand.origin}
              </span>

              <span style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                padding: '3px 8px',
                background: 'var(--color-gold-light)',
                color: 'var(--color-gold-hover)',
                borderRadius: 'var(--radius-pill)',
                letterSpacing: '0.04em'
              }}>
                {brand.badge || `${brand.productCount} Products`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
