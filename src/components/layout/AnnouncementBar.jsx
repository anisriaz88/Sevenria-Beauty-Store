import React, { useState, useEffect } from 'react';
import { Truck, ShieldCheck, Sparkles, MessageCircle, Copy, Check, Clock } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

const MESSAGES = [
  { icon: Truck, text: 'FREE UAE EXPRESS DELIVERY ON ORDERS OVER AED 150' },
  { icon: Sparkles, text: 'FLASH SALE: EXTRA 15% OFF WITH CODE SEVENRIA15' },
  { icon: ShieldCheck, text: '100% AUTHENTIC GUARANTEED • DIRECT FROM OFFICIAL BRANDS' },
  { icon: Clock, text: 'ORDER BEFORE 2 PM FOR SAME-DAY DISPATCH IN DUBAI' }
];

export default function AnnouncementBar() {
  const { applyPromo } = useShop();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyPromo = () => {
    applyPromo('WELCOME10');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const ActiveIcon = MESSAGES[currentIdx].icon;

  return (
    <div className="announcement-bar" style={{ background: '#121212', color: '#FFFFFF', padding: '7px 16px', fontSize: '0.72rem' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '8px' }}>
        {/* Left: Instant Promo Voucher Chip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={handleCopyPromo}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              background: 'rgba(184, 147, 88, 0.2)',
              border: '1px dashed var(--color-gold)',
              color: '#FFFFFF',
              padding: '2px 8px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.68rem',
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: '0.04em'
            }}
            title="Click to copy & apply promo code"
          >
            {copiedCode ? <Check size={11} style={{ color: '#22C55E' }} /> : <Copy size={11} style={{ color: 'var(--color-gold)' }} />}
            <span>{copiedCode ? 'APPLIED: 10% OFF' : 'CODE: WELCOME10'}</span>
          </button>
          <span style={{ opacity: 0.35 }}>|</span>
          <span style={{ color: 'var(--color-gold)', fontWeight: 600 }}>UAE • AED</span>
        </div>

        {/* Center: Live Cycling High-Converting Announcement */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s ease' }}>
          <ActiveIcon size={14} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
          <span style={{ fontWeight: 600, letterSpacing: '0.05em' }}>
            {MESSAGES[currentIdx].text}
          </span>
        </div>

        {/* Right: WhatsApp VIP & Language */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <a 
            href="https://wa.me/971501234567" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#25D366', fontWeight: 600 }}
          >
            <MessageCircle size={13} />
            <span>Beauty Concierge</span>
          </a>
          <span style={{ opacity: 0.3 }}>|</span>
          <span style={{ color: 'var(--color-gold)', fontWeight: 600 }}>العربية</span>
        </div>
      </div>
    </div>
  );
}
