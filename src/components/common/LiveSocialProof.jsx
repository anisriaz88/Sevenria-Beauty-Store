import React, { useState, useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

const PURCHASES = [
  {
    buyer: 'Fatima K.',
    location: 'Downtown Dubai',
    productId: 'cosrx-snail-96-essence',
    timeAgo: '2 minutes ago'
  },
  {
    buyer: 'Sarah M.',
    location: 'Abu Dhabi (Al Reem)',
    productId: 'fino-premium-touch-hair-mask',
    timeAgo: '6 minutes ago'
  },
  {
    buyer: 'Noura A.',
    location: 'Jumeirah 1, Dubai',
    productId: 'anua-heartleaf-cleansing-oil',
    timeAgo: '9 minutes ago'
  },
  {
    buyer: 'Reem H.',
    location: 'Sharjah Al Majaz',
    productId: 'arencia-fresh-green-rice-cake-cleanser',
    timeAgo: '14 minutes ago'
  },
  {
    buyer: 'Maryam S.',
    location: 'Dubai Hills Estate',
    productId: 'royal-amber-oud-extrait',
    timeAgo: '18 minutes ago'
  }
];

export default function LiveSocialProof() {
  const { productsList, openProductDetail } = useShop();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Show after 3 seconds initially
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Rotate every 12 seconds
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIdx(prev => (prev + 1) % PURCHASES.length);
        setIsVisible(true);
      }, 600);
    }, 12000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isDismissed]);

  if (isDismissed || !isVisible) return null;

  const currentPurchase = PURCHASES[currentIdx];
  const product = productsList.find(p => p.id === currentPurchase.productId) || productsList[0];

  return (
    <div className="live-social-proof" style={{ zIndex: 1100 }}>
      <img 
        src={product.images[0]} 
        alt={product.title} 
        className="social-proof-img"
        onClick={() => openProductDetail(product)}
        style={{ cursor: 'pointer' }}
      />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: 'var(--color-success)', fontWeight: 700 }}>
          <CheckCircle size={12} fill="currentColor" color="#FFFFFF" />
          <span>Verified UAE Order</span>
        </div>

        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          <strong>{currentPurchase.buyer}</strong> from {currentPurchase.location}
        </div>

        <div 
          onClick={() => openProductDetail(product)}
          style={{ fontSize: '0.76rem', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer' }}
        >
          Purchased {product.title}
        </div>

        <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
          {currentPurchase.timeAgo}
        </div>
      </div>

      <button 
        onClick={() => setIsDismissed(true)} 
        className="social-proof-close"
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </div>
  );
}
