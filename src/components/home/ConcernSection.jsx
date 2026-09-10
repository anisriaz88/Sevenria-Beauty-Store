import React from 'react';
import { 
  Droplet, 
  Sun, 
  Sparkles, 
  Shield, 
  Heart, 
  Wind, 
  Flame, 
  Zap,
  ArrowRight 
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CONCERNS } from '../../data/concerns';

const CONCERN_ICONS = {
  'hydration': Droplet,
  'brightening': Sparkles,
  'acne-blemishes': Zap,
  'anti-aging': Flame,
  'sensitive-skin': Heart,
  'hair-fall': Shield,
  'frizz-control': Wind,
  'sun-protection': Sun
};

export default function ConcernSection() {
  const { navigateTo } = useShop();

  return (
    <section className="section-padding" style={{ background: 'var(--color-bg-ivory)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">TARGETED BEAUTY SOLUTIONS</span>
          <h2>Shop By Concern</h2>
          <p className="section-subtitle">
            Curated active formulas addressing the specific needs of skin and hair in the Arabian climate.
          </p>
        </div>

        {/* 8 Distinct Concern Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '20px'
        }}>
          {CONCERNS.map((concern) => {
            const Icon = CONCERN_ICONS[concern.id] || Sparkles;

            return (
              <div
                key={concern.id}
                className="concern-card"
                onClick={() => navigateTo('shop', { concern: concern.title })}
                style={{ cursor: 'pointer' }}
              >
                <div className="concern-icon-wrap">
                  <Icon size={24} />
                </div>

                <h3 style={{ fontSize: '1.18rem', fontWeight: 600, marginBottom: '6px', color: 'var(--color-text-primary)' }}>
                  {concern.title}
                </h3>

                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginBottom: '14px', lineHeight: 1.4 }}>
                  {concern.subtitle}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gold-hover)',
                  marginTop: 'auto'
                }}>
                  <span>{concern.productCount} Formulations</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
