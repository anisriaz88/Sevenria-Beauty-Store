import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, ShoppingBag, Plus } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function BeautyRoutineAdvisor() {
  const { productsList, addToCart, setIsCartOpen } = useShop();

  const routines = [
    {
      id: 'glass-skin',
      title: 'Dewy Glass Skin Routine',
      eyebrow: 'K-BEAUTY GLOW',
      description: 'Drench dehydrated skin with deep hydration and barrier repair tailored for Dubai weather.',
      productIds: [
        'arencia-fresh-green-rice-cake-cleanser',
        'cosrx-snail-96-essence',
        'the-ordinary-niacinamide-10-zinc-1'
      ],
      steps: ['Step 1: Fresh Rice Cake Cleanse', 'Step 2: 96% Snail Mucin Power', 'Step 3: Pore Refining Niacinamide'],
      bundleDiscountPct: 15
    },
    {
      id: 'pore-clarity',
      title: 'Clear Pores & Anti-Blemish',
      eyebrow: 'DERMATOLOGIST FAVORITES',
      description: 'Dissolve stubborn sebum, blackheads, and texturized pores without irritation.',
      productIds: [
        'anua-heartleaf-cleansing-oil',
        'medicube-zero-pore-pad-2',
        'cerave-hydrating-facial-cleanser'
      ],
      steps: ['Step 1: Heartleaf Oil Meltdown', 'Step 2: Zero Pore Exfoliating Pad', 'Step 3: Ceramides Barrier Wash'],
      bundleDiscountPct: 15
    },
    {
      id: 'hair-revival',
      title: 'Intense Hair Silk & Frizz Repair',
      eyebrow: 'SALON REPAIR AT HOME',
      description: 'Heal heat, bleach, and chlorine damage with royal Japanese & Brazilian hair therapies.',
      productIds: [
        'fino-premium-touch-hair-mask',
        'skala-mais-cachos-2in1-creme',
        'camille-rose-almond-jai-twisting-butter'
      ],
      steps: ['Step 1: Royal Jelly Mask Treat', 'Step 2: D-Panthenol Curl Creme', 'Step 3: Almond Botanical Butter'],
      bundleDiscountPct: 15
    },
    {
      id: 'arabian-oud',
      title: 'Imperial Arabian Oud & Musk Layering',
      eyebrow: 'EMIRATI SCENT RITUAL',
      description: 'Long-lasting 24-hour opulent scent layering of Damascus roses and aged Royal Cambodian Oud.',
      productIds: [
        'royal-amber-oud-extrait',
        'rose-musk-luminous-body-mist',
        'dove-deep-moisture-body-wash'
      ],
      steps: ['Step 1: Luminous Cleansing Base', 'Step 2: Velvet Rose Mist Layer', 'Step 3: Royal Amber Oud Extrait'],
      bundleDiscountPct: 15
    }
  ];

  const [selectedRoutineId, setSelectedRoutineId] = useState('glass-skin');
  const [isBundleAdded, setIsBundleAdded] = useState(false);

  const activeRoutine = routines.find(r => r.id === selectedRoutineId) || routines[0];

  // Map product IDs to product objects (with safe fallbacks)
  const routineProducts = activeRoutine.productIds.map((id, idx) => {
    const found = productsList.find(p => p.id === id);
    return found || productsList[idx % productsList.length];
  });

  const originalTotal = routineProducts.reduce((sum, p) => sum + p.priceAED, 0);
  const discountedTotal = Math.round(originalTotal * (1 - activeRoutine.bundleDiscountPct / 100));
  const savingsAmount = originalTotal - discountedTotal;

  const handleAddEntireRoutine = () => {
    routineProducts.forEach(prod => {
      addToCart(prod, 1);
    });
    setIsBundleAdded(true);
    setTimeout(() => {
      setIsBundleAdded(false);
      setIsCartOpen(true);
    }, 1200);
  };

  return (
    <section className="section-padding" style={{ background: '#FFFFFF', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-gold)', fontWeight: 700, fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>
            <Sparkles size={15} />
            <span>PERSONALIZED VIRTUAL BEAUTY ADVISOR</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', marginBottom: '10px' }}>
            Build Your 3-Step Power Routine
          </h2>
          <p className="section-subtitle" style={{ margin: 0 }}>
            Curated by our Dubai estheticians. Choose your target goal and get the matching regimen bundle with 15% instant savings.
          </p>
        </div>

        {/* Routine Selector Tabs */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '2.5rem'
        }}>
          {routines.map(routine => (
            <button
              key={routine.id}
              onClick={() => {
                setSelectedRoutineId(routine.id);
                setIsBundleAdded(false);
              }}
              className={`promo-tab-btn ${selectedRoutineId === routine.id ? 'active' : ''}`}
              style={{ fontSize: '0.84rem' }}
            >
              <span>{routine.title}</span>
            </button>
          ))}
        </div>

        {/* Routine Showcase Box */}
        <div className="routine-box" style={{ background: 'var(--color-bg-main)', border: '1px solid var(--border-medium)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '24px', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
            <div>
              <span style={{ fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 700 }}>
                {activeRoutine.eyebrow}
              </span>
              <h3 style={{ fontSize: '1.45rem', marginTop: '2px' }}>{activeRoutine.title}</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-text-secondary)', margin: '4px 0 0' }}>
                {activeRoutine.description}
              </p>
            </div>

            <div style={{ background: 'var(--color-sale-bg)', color: 'var(--color-sale)', padding: '6px 14px', borderRadius: 'var(--radius-pill)', fontWeight: 700, fontSize: '0.8rem', border: '1px solid rgba(166, 58, 41, 0.2)' }}>
              SAVE 15% ON THIS 3-STEP SET
            </div>
          </div>

          {/* 3 Step Products Layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            alignItems: 'stretch',
            marginBottom: '28px'
          }}>
            {routineProducts.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-light)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}
              >
                {/* Step Pill */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <div className="routine-step-num">{index + 1}</div>
                  <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--color-text-primary)', textTransform: 'uppercase' }}>
                    {activeRoutine.steps[index]}
                  </span>
                </div>

                <div style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8F7F4', borderRadius: 'var(--radius-xs)', marginBottom: '12px' }}>
                  <img 
                    src={product.images[0]} 
                    alt={product.title} 
                    style={{ maxHeight: '120px', maxWidth: '100%', objectFit: 'contain' }}
                  />
                </div>

                <div style={{ fontSize: '0.68rem', color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
                  {product.brand}
                </div>
                <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--color-text-primary)', margin: '4px 0', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {product.title}
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '8px', fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  AED {product.priceAED}
                </div>
              </div>
            ))}
          </div>

          {/* Bundle Summary & One-Click Add CTA */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            background: '#FFFFFF',
            padding: '20px 24px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-medium)'
          }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
                Full 3-Step Routine Total:
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '2px' }}>
                <span style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                  AED {discountedTotal}
                </span>
                <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                  AED {originalTotal}
                </span>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-sale)', background: 'var(--color-sale-bg)', padding: '2px 8px', borderRadius: 'var(--radius-pill)' }}>
                  Save AED {savingsAmount} (15% Off)
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddEntireRoutine}
              className={`btn ${isBundleAdded ? 'btn-gold' : 'btn-primary'}`}
              style={{
                padding: '12px 28px',
                fontSize: '0.88rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              {isBundleAdded ? (
                <>
                  <Check size={18} />
                  <span>Entire Routine Added to Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  <span>Add All 3 Items to Bag (Save 15%)</span>
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
