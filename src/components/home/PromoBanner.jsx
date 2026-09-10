import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function PromoBanner() {
  const { navigateTo } = useShop();

  return (
    <section style={{ padding: 'clamp(3rem, 5vw, 5rem) 0', background: 'var(--color-bg-main)' }}>
      <div className="container">
        <div style={{
          position: 'relative',
          borderRadius: 'var(--radius-sm)',
          overflow: 'hidden',
          minHeight: '440px',
          display: 'flex',
          alignItems: 'center',
          border: '1px solid var(--border-medium)',
          boxShadow: 'var(--shadow-md)',
          background: 'var(--color-bg-dark)'
        }}>
          {/* Background Image */}
          <img 
            src="/images/promo-favorites.jpg" 
            alt="Beauty Favorites Editorial Curation"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />

          {/* Premium Gradient Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(16, 16, 16, 0.92) 0%, rgba(16, 16, 16, 0.72) 45%, rgba(16, 16, 16, 0.15) 100%)'
          }} />

          {/* Content Box */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            padding: 'clamp(2rem, 5vw, 4rem)',
            maxWidth: '560px',
            color: '#FFFFFF'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.74rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
              marginBottom: '12px'
            }}>
              <span>LIMITED UAE PROMOTION</span>
            </div>

            <h2 style={{ color: '#FFFFFF', fontSize: 'clamp(2rem, 3.8vw, 2.8rem)', lineHeight: 1.15, marginBottom: '14px' }}>
              Beauty Favorites
            </h2>

            <p style={{ color: 'rgba(255, 255, 255, 0.88)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '28px' }}>
              Discover selected essentials at exceptional prices. Curated routines, multi-buy bundles, and complimentary deluxe samples with every order.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
              <button
                onClick={() => navigateTo('offers')}
                className="btn btn-gold"
              >
                <span>SHOP OFFERS</span>
                <ArrowRight size={16} />
              </button>

              <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.75)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: 'var(--color-gold)' }}>★</span>
                <span>Use code <strong>WELCOME10</strong> for 10% off</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
