import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { REVIEWS } from '../../data/reviews';

export default function CustomerReviews() {
  return (
    <section className="section-padding" style={{ background: '#FFFFFF', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">VERIFIED CLIENTS</span>
          <h2>Loved Across the UAE</h2>
          <p className="section-subtitle">
            Read authentic experiences from beauty enthusiasts across Dubai, Abu Dhabi, and the Emirates.
          </p>
        </div>

        {/* Reviews Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              style={{
                background: 'var(--color-bg-main)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-xs)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all var(--transition-normal)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-medium)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-light)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <div>
                {/* Rating Stars & Date */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', gap: '2px', color: '#D97706' }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>{rev.date}</span>
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '10px' }}>
                  "{rev.title}"
                </h3>

                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                  {rev.comment}
                </p>
              </div>

              <div>
                {/* Product Tag */}
                <div style={{
                  fontSize: '0.74rem',
                  color: 'var(--color-gold-hover)',
                  fontWeight: 600,
                  marginBottom: '16px',
                  padding: '4px 8px',
                  background: '#FFFFFF',
                  borderRadius: '3px',
                  display: 'inline-block',
                  border: '1px solid var(--border-light)'
                }}>
                  Purchased: {rev.productName}
                </div>

                {/* Author Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid var(--border-light)', paddingTop: '14px' }}>
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        {rev.name}
                      </span>
                      {rev.verifiedPurchase && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '0.65rem', fontWeight: 600, color: 'var(--color-success)', background: 'var(--color-success-bg)', padding: '2px 6px', borderRadius: 'var(--radius-pill)' }}>
                          <CheckCircle size={10} />
                          <span>Verified UAE Buyer</span>
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>
                      {rev.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
