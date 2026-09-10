import React, { useState } from 'react';
import { Check, Truck, ShieldCheck, ChevronDown } from 'lucide-react';

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'benefits', label: 'Key Benefits' },
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'howToUse', label: 'How to Use' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'shipping', label: 'Shipping & UAE Returns' }
  ];

  return (
    <div style={{ marginTop: '3.5rem', borderTop: '1px solid var(--border-medium)', paddingTop: '2.5rem' }}>
      {/* Desktop Tabs Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '24px',
        borderBottom: '1px solid var(--border-light)',
        marginBottom: '2rem'
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 0',
              fontSize: '0.9rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: activeTab === tab.id ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
              borderBottom: activeTab === tab.id ? '2px solid var(--color-gold)' : '2px solid transparent',
              transition: 'all var(--transition-fast)'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content Panels */}
      <div style={{ maxWidth: '880px', lineHeight: 1.7, fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>
        {activeTab === 'description' && (
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--color-text-primary)' }}>
              About {product.title}
            </h3>
            <p style={{ marginBottom: '14px' }}>
              {product.description}
            </p>
            <p>
              Specially selected by Sevenria Beauty for the UAE climate. Tested to ensure stability against high temperatures and dry air-conditioned environments, restoring natural barrier radiance without heaviness.
            </p>
          </div>
        )}

        {activeTab === 'benefits' && (
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--color-text-primary)' }}>
              Proven Performance & Results
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {product.benefits?.map((benefit, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--color-gold-light)', color: 'var(--color-gold-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <Check size={12} />
                  </div>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'ingredients' && (
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--color-text-primary)' }}>
              Full Ingredients List
            </h3>
            <p style={{ background: '#F8F7F5', padding: '16px 20px', borderRadius: 'var(--radius-xs)', fontSize: '0.88rem', border: '1px solid var(--border-light)', fontFamily: 'monospace' }}>
              {product.ingredients || 'Water, Glycerin, Butylene Glycol, Caprylic/Capric Triglyceride, Sodium Hyaluronate, Tocopherol, Natural Botanical Extracts, Phenoxyethanol.'}
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '10px' }}>
              Ingredients are subject to change at the manufacturer's discretion. For the most complete and up-to-date list of ingredients, refer to the product packaging.
            </p>
          </div>
        )}

        {activeTab === 'howToUse' && (
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--color-text-primary)' }}>
              Application Ritual
            </h3>
            <p style={{ marginBottom: '14px' }}>
              {product.howToUse || 'Apply appropriate amount gently onto clean skin or hair. Pat thoroughly until fully absorbed. Use morning and night as part of your beauty ritual.'}
            </p>
            <div style={{ background: 'var(--color-gold-light)', borderLeft: '3px solid var(--color-gold)', padding: '12px 16px', borderRadius: '0 var(--radius-xs) var(--radius-xs) 0', fontSize: '0.88rem', color: 'var(--color-text-primary)' }}>
              <strong>Sevenria Pro Tip:</strong> For maximum absorption in humid climates, apply onto slightly damp skin or hair immediately after showering.
            </div>
          </div>
        )}

        {activeTab === 'specifications' && (
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--color-text-primary)' }}>
              Product Specifications
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              <div style={{ border: '1px solid var(--border-light)', padding: '12px 16px', borderRadius: 'var(--radius-xs)', background: '#FFFFFF' }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Brand</div>
                <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{product.brand}</div>
              </div>
              <div style={{ border: '1px solid var(--border-light)', padding: '12px 16px', borderRadius: 'var(--radius-xs)', background: '#FFFFFF' }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Volume / Size</div>
                <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{product.size || 'Standard'}</div>
              </div>
              <div style={{ border: '1px solid var(--border-light)', padding: '12px 16px', borderRadius: 'var(--radius-xs)', background: '#FFFFFF' }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Category</div>
                <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{product.category} ({product.subcategory})</div>
              </div>
              <div style={{ border: '1px solid var(--border-light)', padding: '12px 16px', borderRadius: 'var(--radius-xs)', background: '#FFFFFF' }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Skin / Hair Focus</div>
                <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{product.concern || 'All Concerns'}</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--color-text-primary)' }}>
              UAE Delivery & Return Guidelines
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Truck size={20} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: 'var(--color-text-primary)' }}>Dubai & Abu Dhabi:</strong>
                  <p>Next-day courier delivery available for all orders placed before 3:00 PM. Same-day express delivery available in Dubai.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <ShieldCheck size={20} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: 'var(--color-text-primary)' }}>Northern Emirates (Sharjah, Ajman, RAK, Fujairah, UAQ):</strong>
                  <p>1-2 business days with temperature-controlled shipping.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--color-gold)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.7rem', fontWeight: 700 }}>
                  14
                </div>
                <div>
                  <strong style={{ color: 'var(--color-text-primary)' }}>14-Day Free Returns:</strong>
                  <p>If you change your mind, return unopened and seal-intact items within 14 days for a full refund or exchange. Our courier will collect the package from your doorstep.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
