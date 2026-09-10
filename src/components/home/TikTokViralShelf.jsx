import React, { useState } from 'react';
import { Sparkles, Eye, ShoppingBag, Check, Star } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function TikTokViralShelf() {
  const { productsList, addToCart, navigateTo, openProductDetail } = useShop();
  const [addedId, setAddedId] = useState(null);

  // Viral products
  const viralProducts = productsList.filter(p => 
    p.id.includes('cosrx') || 
    p.id.includes('fino') || 
    p.id.includes('arencia') || 
    p.id.includes('medicube')
  );

  const viralNotes = {
    'cosrx-snail-96-essence': { tag: '#1 Glass Skin UAE', views: '14.2M views', quote: 'The hydration holy grail in Dubai AC heat.' },
    'fino-premium-touch-hair-mask': { tag: 'J-Beauty Sensation', views: '28.5M views', quote: 'Silky salon-gloss hair in just 5 minutes.' },
    'arencia-fresh-green-rice-cake-cleanser': { tag: 'Viral K-Cleanser', views: '9.8M views', quote: 'Texture like fresh mochi with instant pore detox.' },
    'medicube-zero-pore-pad-2': { tag: 'Pore Tightening Boss', views: '18.1M views', quote: 'Wipe away dead skin and shrink stubborn pores.' }
  };

  const handleQuickAdd = (product, e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section className="section-padding" style={{ background: '#FAF8F5', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container">
        {/* Section Title */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-gold)', fontWeight: 700, fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '6px' }}>
              <Sparkles size={14} />
              <span>COMMUNITY LOVED & VERIFIED</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)' }}>
              Trending on TikTok UAE
            </h2>
            <p className="section-subtitle" style={{ margin: '6px 0 0' }}>
              The cult formulas UAE beauty creators are obsessing over this season.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFFFFF', padding: '6px 14px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-medium)', fontSize: '0.78rem', fontWeight: 600 }}>
            <span style={{ color: '#E11D48' }}>● LIVE</span>
            <span>Over 3,400 UAE orders this week</span>
          </div>
        </div>

        {/* Viral Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px'
        }}>
          {viralProducts.map((product) => {
            const meta = viralNotes[product.id] || { tag: 'Trending Pick', views: '5M+ views', quote: 'Must-have beauty staple.' };
            const isAdded = addedId === product.id;

            return (
              <div 
                key={product.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-light)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all var(--transition-normal)'
                }}
                className="product-card"
              >
                {/* Visual wrap with TikTok Pill */}
                <div style={{ position: 'relative', background: '#F8F7F4', aspectRatio: '1/1', overflow: 'hidden' }}>
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}>
                    <span style={{
                      background: '#121212',
                      color: '#FFFFFF',
                      fontSize: '0.66rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-pill)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <span>TikTok Viral</span>
                    </span>
                    <span style={{
                      background: 'rgba(255,255,255,0.92)',
                      color: 'var(--color-text-secondary)',
                      fontSize: '0.64rem',
                      fontWeight: 600,
                      padding: '2px 6px',
                      borderRadius: 'var(--radius-pill)'
                    }}>
                      {meta.views}
                    </span>
                  </div>

                  <img 
                    src={product.images[0]} 
                    alt={product.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '16px', cursor: 'pointer' }}
                    onClick={() => openProductDetail(product)}
                  />
                </div>

                {/* Content */}
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
                    {product.brand}
                  </div>

                  <h3 
                    onClick={() => openProductDetail(product)}
                    style={{ fontSize: '0.94rem', fontWeight: 600, margin: '4px 0 8px', cursor: 'pointer', lineHeight: 1.35 }}
                  >
                    {product.title}
                  </h3>

                  {/* Creator Quote Bubble */}
                  <div style={{
                    background: 'var(--color-bg-sand)',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.76rem',
                    color: 'var(--color-text-secondary)',
                    fontStyle: 'italic',
                    marginBottom: '12px',
                    lineHeight: 1.4
                  }}>
                    "{meta.quote}"
                  </div>

                  {/* Price & Rating */}
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 'auto', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        AED {product.priceAED}
                      </span>
                      {product.originalPriceAED && (
                        <span style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                          AED {product.originalPriceAED}
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.78rem', fontWeight: 600, color: '#D97706' }}>
                      <Star size={13} fill="currentColor" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  {/* Action */}
                  <button
                    type="button"
                    onClick={(e) => handleQuickAdd(product, e)}
                    className={`btn btn-block ${isAdded ? 'btn-gold' : 'btn-primary'}`}
                    style={{ padding: '10px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                  >
                    {isAdded ? (
                      <>
                        <Check size={16} />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={15} />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
