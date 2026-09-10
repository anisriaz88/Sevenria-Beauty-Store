import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Truck, ShieldCheck, Gift, Tag, Check, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function CartDrawer() {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    cartCount, 
    cartSubtotal, 
    vatAmount, 
    cartTotal, 
    shippingFee, 
    updateCartQuantity, 
    removeFromCart, 
    navigateTo,
    applyPromo,
    appliedPromo,
    promoDiscountAmount,
    productsList,
    addToCart
  } = useShop();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  const handleViewCart = () => {
    setIsCartOpen(false);
    navigateTo('cart');
  };

  // Multi-tier Gamified Rewards
  // Tier 1: AED 150 = Free Delivery
  // Tier 2: AED 250 = Free Deluxe Mini
  // Tier 3: AED 350 = VIP 10% Off
  const TIER_1 = 150;
  const TIER_2 = 250;
  const TIER_3 = 350;

  let nextRewardText = '';
  let progressPct = 0;

  if (cartSubtotal < TIER_1) {
    const diff = TIER_1 - cartSubtotal;
    nextRewardText = `Add AED ${diff} more for FREE UAE Express Delivery!`;
    progressPct = (cartSubtotal / TIER_1) * 33.3;
  } else if (cartSubtotal < TIER_2) {
    const diff = TIER_2 - cartSubtotal;
    nextRewardText = `Add AED ${diff} more for a FREE Deluxe Beauty Mini! 🎁`;
    progressPct = 33.3 + ((cartSubtotal - TIER_1) / (TIER_2 - TIER_1)) * 33.3;
  } else if (cartSubtotal < TIER_3) {
    const diff = TIER_3 - cartSubtotal;
    nextRewardText = `Add AED ${diff} more for VIP Extra 10% OFF Perk! 👑`;
    progressPct = 66.6 + ((cartSubtotal - TIER_2) / (TIER_3 - TIER_2)) * 33.4;
  } else {
    nextRewardText = '🎉 All VIP Tier Rewards Unlocked! (Free Delivery + Deluxe Mini + VIP Perk)';
    progressPct = 100;
  }

  // Cross-sell recommendation (Impulse add-on)
  const upsellProduct = productsList.find(p => p.id === 'arencia-fresh-green-rice-cake-cleanser' || p.priceAED <= 75) || productsList[2];

  return (
    <>
      {/* Backdrop */}
      <div className="drawer-overlay" onClick={() => setIsCartOpen(false)} />

      {/* Drawer Panel */}
      <div className="drawer-content">
        {/* Drawer Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#FFFFFF'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} style={{ color: 'var(--color-gold)' }} />
            <span style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Shopping Bag ({cartCount})
            </span>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)} 
            style={{ padding: '6px', color: 'var(--color-text-primary)' }}
            aria-label="Close Shopping Bag"
          >
            <X size={20} />
          </button>
        </div>

        {/* Multi-Tier Gamified Progress Tracker */}
        <div className="cart-tiers-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            <Truck size={15} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
            <span>{nextRewardText}</span>
          </div>

          <div className="tracker-bar-bg" style={{ marginTop: '8px', height: '6px' }}>
            <div className="tracker-bar-fill" style={{ width: `${Math.min(100, Math.max(0, progressPct))}%` }} />
          </div>

          {/* Tier Milestones Row */}
          <div className="tier-milestones">
            <div className={`tier-milestone-point ${cartSubtotal >= TIER_1 ? 'achieved' : ''}`}>
              <div className="tier-dot" />
              <span>AED 150 (Free Ship)</span>
            </div>
            <div className={`tier-milestone-point ${cartSubtotal >= TIER_2 ? 'achieved' : ''}`}>
              <div className="tier-dot" />
              <span>AED 250 (Free Gift)</span>
            </div>
            <div className={`tier-milestone-point ${cartSubtotal >= TIER_3 ? 'achieved' : ''}`}>
              <div className="tier-dot" />
              <span>AED 350 (VIP 10%)</span>
            </div>
          </div>
        </div>

        {/* 1-Click Instant Coupon Vouchers */}
        <div style={{ padding: '10px 24px', background: '#FFFFFF', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
            Available Codes:
          </span>
          <button 
            type="button"
            onClick={() => applyPromo('WELCOME10')}
            className={`coupon-chip ${appliedPromo === 'WELCOME10' ? 'active' : ''}`}
          >
            <Tag size={11} />
            <span>WELCOME10 (10% Off)</span>
            {appliedPromo === 'WELCOME10' && <Check size={11} />}
          </button>
          <button 
            type="button"
            onClick={() => applyPromo('SEVENRIA15')}
            className={`coupon-chip ${appliedPromo === 'SEVENRIA15' ? 'active' : ''}`}
          >
            <Sparkles size={11} />
            <span>SEVENRIA15 (15% Off)</span>
            {appliedPromo === 'SEVENRIA15' && <Check size={11} />}
          </button>
        </div>

        {/* Cart Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--color-bg-sand)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
                <ShoppingBag size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Your bag is empty</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
                Explore our curated UAE selection of luxury skincare, haircare, and perfumes.
              </p>
              <button 
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('shop');
                }}
                className="btn btn-primary btn-sm"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cart.map((item, index) => (
                <div 
                  key={`${item.product.id}-${item.option}-${index}`}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid var(--border-light)'
                  }}
                >
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.title} 
                    style={{
                      width: '72px',
                      height: '72px',
                      objectFit: 'contain',
                      background: '#F9F8F6',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid var(--border-light)',
                      padding: '4px'
                    }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-gold)', textTransform: 'uppercase', fontWeight: 600 }}>
                      {item.product.brand}
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '2px' }}>
                      {item.product.title}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                      Size: {item.option || item.product.size}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                      {/* Quantity Stepper */}
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)' }}>
                        <button 
                          onClick={() => updateCartQuantity(item.product.id, item.option, item.quantity - 1)}
                          style={{ padding: '3px 8px', fontSize: '0.9rem', color: 'var(--color-text-primary)' }}
                        >
                          -
                        </button>
                        <span style={{ padding: '3px 8px', fontSize: '0.82rem', fontWeight: 600 }}>{item.quantity}</span>
                        <button 
                          onClick={() => updateCartQuantity(item.product.id, item.option, item.quantity + 1)}
                          style={{ padding: '3px 8px', fontSize: '0.9rem', color: 'var(--color-text-primary)' }}
                        >
                          +
                        </button>
                      </div>

                      {/* Item Total */}
                      <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        AED {item.product.priceAED * item.quantity}
                      </div>

                      {/* Remove Button */}
                      <button 
                        onClick={() => removeFromCart(item.product.id, item.option)}
                        style={{ color: 'var(--color-text-muted)', padding: '4px' }}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Impulse Mini Upsell Cross-Sell */}
              {upsellProduct && (
                <div style={{
                  background: 'var(--color-bg-sand)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '12px 14px',
                  border: '1px dashed var(--color-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginTop: '8px'
                }}>
                  <img 
                    src={upsellProduct.images[0]} 
                    alt={upsellProduct.title}
                    style={{ width: '48px', height: '48px', objectFit: 'contain', background: '#FFFFFF', borderRadius: '4px', padding: '2px' }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.66rem', color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
                      FREQUENTLY BOUGHT TOGETHER
                    </div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {upsellProduct.title}
                    </div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      AED {upsellProduct.priceAED}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => addToCart(upsellProduct, 1)}
                    className="btn btn-gold btn-sm"
                    style={{ padding: '6px 10px', fontSize: '0.7rem', flexShrink: 0 }}
                  >
                    + Add
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Drawer Footer Summary */}
        {cart.length > 0 && (
          <div style={{
            padding: '18px 24px',
            borderTop: '1px solid var(--border-light)',
            background: 'var(--color-bg-main)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px', fontSize: '0.86rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
                <span>Subtotal</span>
                <span>AED {cartSubtotal}</span>
              </div>
              {promoDiscountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-sale)', fontWeight: 600 }}>
                  <span>Promo Discount ({appliedPromo})</span>
                  <span>-AED {promoDiscountAmount}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
                <span>Estimated UAE Delivery</span>
                <span>{shippingFee === 0 ? <strong style={{ color: 'var(--color-success)' }}>FREE</strong> : `AED ${shippingFee}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
                <span>VAT (5% Included)</span>
                <span>AED {vatAmount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-primary)', paddingTop: '8px', borderTop: '1px solid var(--border-light)' }}>
                <span>Total (AED)</span>
                <span>AED {cartTotal}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                onClick={handleCheckout}
                className="btn btn-primary btn-block"
                style={{ padding: '12px' }}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>

              <button 
                onClick={handleViewCart}
                className="btn btn-secondary btn-block"
                style={{ padding: '10px' }}
              >
                View Bag & Full Summary
              </button>
            </div>

            <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.72rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <ShieldCheck size={14} style={{ color: 'var(--color-gold)' }} />
              <span>100% Authentic Products • Instant UAE Dispatch</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
