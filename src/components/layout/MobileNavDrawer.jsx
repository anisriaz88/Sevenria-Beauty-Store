import React, { useState } from 'react';
import { X, ChevronDown, ChevronRight, User, Heart, ShoppingBag, Truck } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CATEGORIES } from '../../data/categories';

export default function MobileNavDrawer() {
  const { 
    isMobileNavOpen, 
    setIsMobileNavOpen, 
    navigateTo, 
    cartCount, 
    wishlist,
    setIsCartOpen
  } = useShop();

  const [expandedCategory, setExpandedCategory] = useState(null);

  if (!isMobileNavOpen) return null;

  const handleNav = (page, params = {}) => {
    setIsMobileNavOpen(false);
    navigateTo(page, params);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={() => setIsMobileNavOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(3px)',
          zIndex: 999,
          animation: 'fadeIn 0.2s ease forwards'
        }}
      />

      {/* Drawer */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: '88%',
        maxWidth: '380px',
        background: '#FFFFFF',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-lg)',
        animation: 'slideInLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}>
        {/* Header */}
        <div style={{
          padding: '18px 20px',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--color-bg-ivory)'
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 700, letterSpacing: '0.04em' }}>
              SEVENRIA
            </div>
            <div style={{ fontSize: '0.58rem', letterSpacing: '0.2em', color: 'var(--color-gold)', fontWeight: 600 }}>
              DUBAI • UAE
            </div>
          </div>
          <button 
            onClick={() => setIsMobileNavOpen(false)}
            style={{ padding: '6px', color: 'var(--color-text-primary)' }}
            aria-label="Close Navigation"
          >
            <X size={22} />
          </button>
        </div>

        {/* Quick Links Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          borderBottom: '1px solid var(--border-light)',
          background: '#FFFFFF'
        }}>
          <button
            onClick={() => handleNav('account')}
            style={{
              padding: '12px 6px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.72rem',
              color: 'var(--color-text-secondary)',
              borderRight: '1px solid var(--border-light)'
            }}
          >
            <User size={18} />
            <span>Account</span>
          </button>
          <button
            onClick={() => handleNav('wishlist')}
            style={{
              padding: '12px 6px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.72rem',
              color: 'var(--color-text-secondary)',
              borderRight: '1px solid var(--border-light)',
              position: 'relative'
            }}
          >
            <Heart size={18} />
            <span>Wishlist ({wishlist.length})</span>
          </button>
          <button
            onClick={() => {
              setIsMobileNavOpen(false);
              setIsCartOpen(true);
            }}
            style={{
              padding: '12px 6px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.72rem',
              color: 'var(--color-text-secondary)',
              position: 'relative'
            }}
          >
            <ShoppingBag size={18} />
            <span>Bag ({cartCount})</span>
          </button>
        </div>

        {/* Scrollable Categories & Navigation List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0' }}>
          {/* Main Direct Links */}
          <div style={{ padding: '0 20px 12px' }}>
            <button
              onClick={() => handleNav('shop', { filterType: 'new' })}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 0',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--color-text-primary)'
              }}
            >
              <span>New Arrivals</span>
              <span className="badge badge-new" style={{ fontSize: '0.65rem' }}>JUST IN</span>
            </button>

            <button
              onClick={() => handleNav('offers')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 0',
                fontSize: '0.9rem',
                fontWeight: 700,
                color: 'var(--color-sale)'
              }}
            >
              <span>Offers & Deals</span>
              <span className="badge badge-sale" style={{ fontSize: '0.65rem' }}>SAVE 25%</span>
            </button>

            <button
              onClick={() => handleNav('brands')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 0',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--color-text-primary)'
              }}
            >
              <span>Brands Directory (A-Z)</span>
              <ChevronRight size={16} style={{ color: 'var(--color-text-muted)' }} />
            </button>
          </div>

          <div style={{ height: '1px', background: 'var(--border-light)', margin: '4px 0 12px' }} />

          {/* Categories Accordions */}
          <div style={{ padding: '0 20px' }}>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '8px', fontWeight: 600 }}>
              Shop by Category
            </div>
            {CATEGORIES.map(cat => {
              const isExpanded = expandedCategory === cat.id;
              return (
                <div key={cat.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <button
                      onClick={() => handleNav('shop', { category: cat.id })}
                      style={{
                        padding: '12px 0',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        color: 'var(--color-text-primary)',
                        textAlign: 'left',
                        flex: 1
                      }}
                    >
                      {cat.name}
                    </button>
                    <button
                      onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                      style={{ padding: '12px 8px', color: 'var(--color-text-muted)' }}
                      aria-label="Toggle subcategories"
                    >
                      <ChevronDown 
                        size={16} 
                        style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} 
                      />
                    </button>
                  </div>

                  {isExpanded && (
                    <div style={{ padding: '0 0 12px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {cat.subcategories.map(sub => (
                        <button
                          key={sub}
                          onClick={() => handleNav('shop', { category: cat.id, subcategory: sub })}
                          style={{
                            fontSize: '0.86rem',
                            color: 'var(--color-text-secondary)',
                            textAlign: 'left',
                            padding: '4px 0'
                          }}
                        >
                          {sub}
                        </button>
                      ))}
                      <button
                        onClick={() => handleNav('shop', { category: cat.id })}
                        style={{
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          color: 'var(--color-gold-hover)',
                          textAlign: 'left',
                          padding: '4px 0'
                        }}
                      >
                        View All {cat.name} →
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ height: '1px', background: 'var(--border-light)', margin: '16px 0' }} />

          {/* Help & Information */}
          <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button 
              onClick={() => handleNav('contact')} 
              style={{ textAlign: 'left', fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}
            >
              Contact & UAE Concierge
            </button>
          </div>
        </div>

        {/* Drawer Footer with Free Delivery Note */}
        <div style={{
          padding: '16px 20px',
          background: 'var(--color-bg-ivory)',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <Truck size={20} style={{ color: 'var(--color-gold)' }} />
          <div style={{ fontSize: '0.75rem', lineHeight: 1.3 }}>
            <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>Free UAE Delivery</div>
            <div style={{ color: 'var(--color-text-secondary)' }}>On orders over AED 150</div>
          </div>
        </div>
      </div>
    </>
  );
}
