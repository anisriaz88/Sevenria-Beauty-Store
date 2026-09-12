import React from 'react';
import { Truck, ShieldCheck, RefreshCw, MessageCircle } from 'lucide-react';

const TRUST_ITEMS = [
  {
    icon: Truck,
    title: 'Fast UAE Delivery',
    description: 'Free courier delivery on all orders over AED 150. Same-day delivery across Dubai and next-day in Abu Dhabi & Northern Emirates.'
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    description: '100% secure checkout supporting Apple Pay, Visa, Mastercard, and Cash on Delivery.'
  },
  {
    icon: RefreshCw,
    title: '14-Day Easy Returns',
    description: 'Simple, hassle-free returns on all unopened items with complimentary return courier pick-up from your home or office.'
  },
  {
    icon: MessageCircle,
    title: 'UAE Concierge Support',
    description: 'Our dedicated Dubai beauty beauty concierges are available 7 days a week via WhatsApp and email for product advice and order support.'
  }
];

export default function TrustSection() {
  return (
    <section className="section-padding" style={{ background: 'var(--color-bg-ivory)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '28px'
        }}>
          {TRUST_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                style={{
                  background: '#FFFFFF',
                  padding: '2rem 1.8rem',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  transition: 'transform var(--transition-normal)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'var(--color-gold-light)',
                  color: 'var(--color-gold-hover)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <Icon size={22} />
                </div>

                <h3 style={{ fontSize: '1.18rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '0.86rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
