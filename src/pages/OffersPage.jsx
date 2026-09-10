import React, { useState, useEffect } from 'react';
import { Tag, Sparkles, Clock, ArrowRight, Check, Percent, Gift, Flame } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ProductCard from '../components/common/ProductCard';

export default function OffersPage() {
  const { productsList, navigateTo, applyPromo, appliedPromo } = useShop();
  const [activeFilter, setActiveFilter] = useState('all');

  // Real-time countdown
  const [countdown, setCountdown] = useState({
    hours: 7,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const discountedProducts = productsList.filter(p => p.discountPercent > 0);
  const bestValuePicks = productsList.filter(p => p.priceAED <= 75);
  const bundlesAndHair = productsList.filter(p => p.id.includes('fino') || p.id.includes('skala') || p.id.includes('medicube'));
  const allOfferProducts = productsList.filter(p => p.discountPercent > 0 || p.priceAED <= 75 || p.isBestSeller);

  let displayedProducts = allOfferProducts;
  if (activeFilter === 'discounts') displayedProducts = discountedProducts;
  if (activeFilter === 'bundles') displayedProducts = bundlesAndHair;
  if (activeFilter === 'under75') displayedProducts = bestValuePicks;

  return (
    <div style={{ background: 'var(--color-bg-main)', minHeight: '85vh', paddingBottom: '6rem' }}>
      <div className="container">
        <Breadcrumbs items={[{ label: 'Exclusive UAE Beauty Offers & Promotions' }]} />

        {/* Hero Offer Banner with Live Clock */}
        <div style={{
          background: 'linear-gradient(135deg, #181411 0%, #2A2016 50%, #1A1816 100%)',
          color: '#FFFFFF',
          borderRadius: 'var(--radius-sm)',
          padding: 'clamp(2.5rem, 5vw, 4rem)',
          marginBottom: '3rem',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid rgba(184, 147, 88, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(225, 29, 72, 0.15)', border: '1px solid #E11D48', padding: '4px 14px', borderRadius: 'var(--radius-pill)', color: '#FB7185', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '14px' }}>
              <Flame size={14} fill="#E11D48" />
              <span>WATSONS-STYLE BEAUTY PROMOTION HUB</span>
            </div>

            <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', marginBottom: '12px' }}>
              Exclusive UAE Beauty Offers
            </h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.84)', fontSize: '1.05rem', margin: '0 auto 24px', lineHeight: 1.6 }}>
              Enjoy automated tier savings, multi-buy bundles, and verified discounts on cult skincare & viral haircare. Free express UAE delivery over AED 150.
            </p>

            {/* Live Ticking Countdown Box */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-pill)', padding: '8px 20px', marginBottom: '28px' }}>
              <Clock size={16} style={{ color: 'var(--color-gold)' }} />
              <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.85)', fontWeight: 600, textTransform: 'uppercase' }}>
                Promotion Ends In:
              </span>
              <div className="timer-segment">
                <span className="timer-num">{String(countdown.hours).padStart(2, '0')}</span>
                <span className="timer-sep">:</span>
                <span className="timer-num">{String(countdown.minutes).padStart(2, '0')}</span>
                <span className="timer-sep">:</span>
                <span className="timer-num">{String(countdown.seconds).padStart(2, '0')}</span>
              </div>
            </div>

            {/* Click-to-Apply Vouchers */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
              <div style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px dashed var(--color-gold)',
                borderRadius: 'var(--radius-xs)',
                padding: '12px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-gold)', fontWeight: 700 }}>FIRST ORDER PERK</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Code: <strong>WELCOME10</strong> (10% Off)</div>
                </div>
                <button 
                  onClick={() => applyPromo('WELCOME10')}
                  className={`btn btn-sm ${appliedPromo === 'WELCOME10' ? 'btn-gold' : 'btn-primary'}`}
                  style={{ padding: '6px 14px', fontSize: '0.72rem' }}
                >
                  {appliedPromo === 'WELCOME10' ? 'Applied!' : 'Apply Code'}
                </button>
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px dashed var(--color-gold)',
                borderRadius: 'var(--radius-xs)',
                padding: '12px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-gold)', fontWeight: 700 }}>VIP HAUL PERK</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Code: <strong>SEVENRIA15</strong> (15% Off)</div>
                </div>
                <button 
                  onClick={() => applyPromo('SEVENRIA15')}
                  className={`btn btn-sm ${appliedPromo === 'SEVENRIA15' ? 'btn-gold' : 'btn-primary'}`}
                  style={{ padding: '6px 14px', fontSize: '0.72rem' }}
                >
                  {appliedPromo === 'SEVENRIA15' ? 'Applied!' : 'Apply Code'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: '2rem',
          justifyContent: 'center'
        }}>
          {[
            { id: 'all', label: `All Deals (${allOfferProducts.length})` },
            { id: 'discounts', label: `Direct Discounts (${discountedProducts.length})` },
            { id: 'bundles', label: `Bundles & Sets (${bundlesAndHair.length})` },
            { id: 'under75', label: `Under AED 75 (${bestValuePicks.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`promo-tab-btn ${activeFilter === tab.id ? 'active' : ''}`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '24px'
        }}>
          {displayedProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
