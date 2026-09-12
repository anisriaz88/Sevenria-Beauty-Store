import React, { useState } from 'react';
import { Tag, Sparkles, Plus, Check, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function ComboDealSection() {
  const { productsList, addToCart, setIsCartOpen, addToast } = useShop();

  const combos = [
    {
      id: 'glass-skin-combo',
      badge: 'VIRAL K-BEAUTY COMBO',
      title: '3-Piece Glass Skin Routine Combo',
      tagline: 'Deep pore purification, 96% snail mucin barrier hydration, and brightening niacinamide.',
      discountPercent: 20,
      productIds: [
        'arencia-fresh-green-rice-cake-cleanser',
        'cosrx-snail-96-essence',
        'the-ordinary-niacinamide-10-zinc-1'
      ],
      stepLabels: ['Step 1: Fresh Rice Cake Cleanse', 'Step 2: 96% Snail Mucin Power', 'Step 3: Pore Refining Niacinamide']
    },
    {
      id: 'pore-detox-combo',
      badge: 'DERM-BACKED CLARITY COMBO',
      title: 'Clear Pores & Anti-Blemish Trio',
      tagline: 'Melt blackheads, gently resurface stubborn texture, and maintain healthy ceramide barriers.',
      discountPercent: 20,
      productIds: [
        'anua-heartleaf-cleansing-oil',
        'medicube-zero-pore-pad-2',
        'cerave-hydrating-facial-cleanser'
      ],
      stepLabels: ['Step 1: Heartleaf Oil Meltdown', 'Step 2: Zero Pore Exfoliating Pad', 'Step 3: Ceramides Barrier Wash']
    },
    {
      id: 'hair-revival-combo',
      badge: 'SALON-GRADE HAIR REPAIR',
      title: 'Viral Hair Silk & Damage Repair Combo',
      tagline: 'Heal heat, bleach, and chlorine damage with royal Japanese jelly mask and moisture curl treatment.',
      discountPercent: 20,
      productIds: [
        'fino-premium-touch-hair-mask',
        'skala-mais-cachos-2in1-creme',
        'camille-rose-almond-jai-twisting-butter'
      ],
      stepLabels: ['Step 1: Royal Jelly Mask Treat', 'Step 2: D-Panthenol Curl Creme', 'Step 3: Almond Botanical Butter']
    },
    {
      id: 'arabian-oud-combo',
      badge: 'EMIRATI LUXURY SCENT COMBO',
      title: 'Royal Arabian Oud & Scent Layering Combo',
      tagline: 'Opulent 24-hour fragrance layering ritual featuring Royal Amber Oud and luminous rose mist.',
      discountPercent: 20,
      productIds: [
        'royal-amber-oud-extrait',
        'rose-musk-luminous-body-mist',
        'dove-deep-moisture-body-wash'
      ],
      stepLabels: ['Step 1: Luminous Cleansing Base', 'Step 2: Velvet Rose Mist Layer', 'Step 3: Royal Amber Oud Extrait']
    }
  ];

  const [activeComboId, setActiveComboId] = useState(combos[0].id);
  const [isClaimed, setIsClaimed] = useState(false);

  const activeCombo = combos.find(c => c.id === activeComboId) || combos[0];

  // Resolve products from store catalog
  const comboProducts = activeCombo.productIds.map((id, idx) => {
    const found = productsList.find(p => p.id === id);
    return found || productsList[idx % productsList.length];
  });

  const originalTotal = comboProducts.reduce((sum, p) => sum + (p.priceAED || 80), 0);
  const discountedTotal = Math.round(originalTotal * (1 - activeCombo.discountPercent / 100));
  const savingsAmount = originalTotal - discountedTotal;

  const handleClaimCombo = () => {
    comboProducts.forEach(prod => {
      addToCart(prod, 1);
    });
    setIsClaimed(true);
    addToast(`🎉 ${activeCombo.title} added to Bag with ${activeCombo.discountPercent}% Combo Savings!`);

    setTimeout(() => {
      setIsClaimed(false);
      setIsCartOpen(true);
    }, 1000);
  };

  return (
    <section className="section-padding" style={{ background: '#FFFFFF', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 2.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--color-gold)',
            fontWeight: 700,
            fontSize: '0.74rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: '8px'
          }}>
            <Sparkles size={15} />
            <span>VALUE BUNDLES & SETS</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', marginBottom: '10px' }}>
            Exclusive Combo Deals
          </h2>
          <p className="section-subtitle" style={{ margin: 0 }}>
            Curated multi-piece regimens crafted to work best together. Buy the complete combo set and enjoy instant bundled savings.
          </p>
        </div>

        {/* Combo Selector Tabs */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '2.5rem'
        }}>
          {combos.map(combo => {
            const isActive = activeComboId === combo.id;
            return (
              <button
                key={combo.id}
                onClick={() => {
                  setActiveComboId(combo.id);
                  setIsClaimed(false);
                }}
                className={`promo-tab-btn ${isActive ? 'active' : ''}`}
                style={{ fontSize: '0.84rem' }}
              >
                <span>{combo.title.replace(' Combo', '')}</span>
                <span style={{
                  fontSize: '0.68rem',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-pill)',
                  background: isActive ? 'rgba(255,255,255,0.25)' : 'var(--color-sale-bg)',
                  color: isActive ? '#FFFFFF' : 'var(--color-sale)',
                  fontWeight: 700
                }}>
                  SAVE {combo.discountPercent}%
                </span>
              </button>
            );
          })}
        </div>

        {/* Combo Deal Box */}
        <div className="routine-box" style={{
          background: 'linear-gradient(180deg, #FAF8F5 0%, #FFFFFF 100%)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-sm)',
          padding: 'clamp(1.5rem, 3vw, 2.5rem)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {/* Header Info Banner */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '28px',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '20px'
          }}>
            <div>
              <span style={{
                fontSize: '0.72rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                fontWeight: 700
              }}>
                {activeCombo.badge}
              </span>
              <h3 style={{ fontSize: '1.55rem', marginTop: '4px', marginBottom: '6px' }}>
                {activeCombo.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', margin: 0, maxWidth: '600px' }}>
                {activeCombo.tagline}
              </p>
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--color-sale-bg)',
              color: 'var(--color-sale)',
              padding: '8px 16px',
              borderRadius: 'var(--radius-pill)',
              fontWeight: 700,
              fontSize: '0.84rem',
              border: '1px solid rgba(166, 58, 41, 0.2)'
            }}>
              <Tag size={16} />
              <span>COMBO DEAL: SAVE {activeCombo.discountPercent}% INSTANTLY</span>
            </div>
          </div>

          {/* Connected 3 Products Layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            alignItems: 'stretch',
            marginBottom: '32px'
          }}>
            {comboProducts.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-light)',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                {/* Step / Routine Tag */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <div className="routine-step-num">{index + 1}</div>
                  <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--color-text-primary)', textTransform: 'uppercase' }}>
                    {activeCombo.stepLabels[index] || `Item ${index + 1}`}
                  </span>
                </div>

                {/* Product Thumbnail */}
                <div style={{
                  height: '150px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#F8F7F4',
                  borderRadius: 'var(--radius-xs)',
                  marginBottom: '14px',
                  padding: '10px'
                }}>
                  <img 
                    src={product.images?.[0]} 
                    alt={product.title} 
                    style={{ maxHeight: '130px', maxWidth: '100%', objectFit: 'contain' }}
                  />
                </div>

                {/* Details */}
                <div style={{ fontSize: '0.7rem', color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {product.brand}
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  margin: '4px 0 8px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  minHeight: '2.5em'
                }}>
                  {product.title}
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Individual Price:</span>
                  <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    AED {product.priceAED}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Combo Deal Summary & CTA Box */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            background: '#FFFFFF',
            padding: '24px 28px',
            borderRadius: 'var(--radius-sm)',
            border: '2px solid var(--color-gold)',
            boxShadow: '0 4px 16px rgba(184, 147, 88, 0.12)'
          }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                Special Combo Bundle Price:
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginTop: '4px' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-gold)' }}>
                  AED {discountedTotal}
                </span>
                <span style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                  AED {originalTotal}
                </span>
                <span style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'var(--color-sale)',
                  background: 'var(--color-sale-bg)',
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-pill)'
                }}>
                  Save AED {savingsAmount} ({activeCombo.discountPercent}% Off)
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px', fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Truck size={13} style={{ color: 'var(--color-gold)' }} /> Free UAE Delivery
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={13} style={{ color: 'var(--color-gold)' }} /> 100% Authentic Guaranteed
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClaimCombo}
              className={`btn ${isClaimed ? 'btn-gold' : 'btn-primary'}`}
              style={{
                padding: '14px 32px',
                fontSize: '0.92rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer'
              }}
            >
              {isClaimed ? (
                <>
                  <Check size={18} />
                  <span>Combo Added to Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  <span>Claim Combo Deal (Save {activeCombo.discountPercent}%)</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
