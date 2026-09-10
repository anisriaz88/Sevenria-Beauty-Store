import React, { useState, useEffect } from 'react';
import { Flame, Clock, ArrowRight, ShoppingBag, Check, Zap } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function FlashDealsSection() {
  const { productsList, addToCart, navigateTo } = useShop();

  // Real-time ticking countdown to midnight
  const [timeLeft, setTimeLeft] = useState({
    hours: 7,
    minutes: 42,
    seconds: 19
  });

  const [addedIds, setAddedIds] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleQuickAdd = (product, e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedIds(prev => [...prev, product.id]);
    setTimeout(() => {
      setAddedIds(prev => prev.filter(id => id !== product.id));
    }, 1800);
  };

  // Top flash deals
  const flashProducts = productsList
    .filter(p => p.discountPercent >= 15 || p.isBestSeller)
    .slice(0, 4);

  // Dynamic stock percentages for urgency
  const stockPercents = [85, 92, 78, 88];

  return (
    <section className="section-padding" style={{ background: '#FAF7F2', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container">
        {/* Flash Header with Timer */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '2rem'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#E11D48', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
              <Flame size={16} fill="#E11D48" />
              <span>WATSONS-STYLE FLASH PROMO</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.3rem)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>UAE Deals of the Day</span>
              <span className="badge badge-sale" style={{ fontSize: '0.7rem', verticalAlign: 'middle' }}>UP TO 35% OFF</span>
            </h2>
          </div>

          {/* Live Countdown Timer Clock */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="flash-timer-box" style={{ background: '#1C1917', border: '1px solid var(--border-gold)' }}>
              <Clock size={16} style={{ color: 'var(--color-gold)' }} />
              <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', fontWeight: 600 }}>
                Ends In:
              </span>
              <div className="timer-segment">
                <span className="timer-num">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="timer-sep">:</span>
                <span className="timer-num">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="timer-sep">:</span>
                <span className="timer-num">{String(timeLeft.seconds).padStart(2, '0')}</span>
              </div>
            </div>

            <button
              onClick={() => navigateTo('offers')}
              className="btn btn-secondary btn-sm"
              style={{ background: '#FFFFFF', borderColor: 'var(--border-medium)' }}
            >
              <span>All Deals</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Product Deals Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {flashProducts.map((product, idx) => {
            const isAdded = addedIds.includes(product.id);
            const claimedPct = stockPercents[idx % stockPercents.length];

            return (
              <div 
                key={product.id}
                className="product-card"
                style={{ background: '#FFFFFF', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column' }}
              >
                {/* Visual Image & Badges */}
                <div className="product-image-wrap" style={{ position: 'relative' }}>
                  <div className="product-badges">
                    <span className="badge badge-sale" style={{ fontWeight: 800 }}>
                      ⚡ -{product.discountPercent || 20}%
                    </span>
                    <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>
                      HOT PICK
                    </span>
                  </div>

                  <img 
                    src={product.images[0]} 
                    alt={product.title} 
                    className="product-img"
                    onClick={() => navigateTo('product', { productId: product.id })}
                    style={{ cursor: 'pointer' }}
                  />
                </div>

                {/* Content & Urgency Info */}
                <div className="product-content" style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div className="product-brand">{product.brand}</div>
                  <h3 
                    className="product-title" 
                    onClick={() => navigateTo('product', { productId: product.id })}
                    style={{ cursor: 'pointer', fontSize: '0.92rem', marginBottom: '8px' }}
                  >
                    {product.title}
                  </h3>

                  {/* Pricing */}
                  <div className="product-price-row" style={{ marginBottom: '10px' }}>
                    <span className="product-price" style={{ color: '#E11D48' }}>AED {product.priceAED}</span>
                    {product.originalPriceAED && (
                      <span className="product-price-original">AED {product.originalPriceAED}</span>
                    )}
                  </div>

                  {/* Stock Scarcity Bar */}
                  <div className="scarcity-wrap" style={{ marginBottom: '14px' }}>
                    <div className="scarcity-label-row">
                      <span style={{ color: '#E11D48', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <Zap size={12} fill="#E11D48" /> {claimedPct}% Claimed
                      </span>
                      <span style={{ color: 'var(--color-text-muted)' }}>
                        Only {Math.max(3, 100 - claimedPct)} Left
                      </span>
                    </div>
                    <div className="scarcity-bar">
                      <div className="scarcity-fill" style={{ width: `${claimedPct}%` }} />
                    </div>
                  </div>

                  {/* 1-Click Fast Add Action */}
                  <button
                    type="button"
                    onClick={(e) => handleQuickAdd(product, e)}
                    className={`btn btn-block ${isAdded ? 'btn-gold' : 'btn-primary'}`}
                    style={{
                      marginTop: 'auto',
                      padding: '10px',
                      fontSize: '0.78rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    {isAdded ? (
                      <>
                        <Check size={16} />
                        <span>Claimed to Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={15} />
                        <span>Claim Deal</span>
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
