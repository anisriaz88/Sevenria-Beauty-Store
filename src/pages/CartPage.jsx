import React, { useState } from 'react';
import { Trash2, Heart, ArrowRight, ShieldCheck, Truck, ShoppingBag, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import Breadcrumbs from '../components/common/Breadcrumbs';

export default function CartPage() {
  const { 
    cart, 
    cartCount, 
    cartSubtotal, 
    vatAmount, 
    shippingFee, 
    cartTotal, 
    updateCartQuantity, 
    removeFromCart, 
    toggleWishlist,
    navigateTo,
    appliedPromo,
    promoDiscountAmount,
    applyPromo,
    removePromo,
    freeShippingProgress,
    amountNeededForFreeShipping
  } = useShop();

  const [promoInput, setPromoInput] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyPromo(promoInput);
      setPromoInput('');
    }
  };

  return (
    <div style={{ background: 'var(--color-bg-main)', minHeight: '80vh', paddingBottom: '5rem' }}>
      <div className="container">
        <Breadcrumbs items={[{ label: 'Shopping Bag' }]} />

        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: 'var(--color-text-primary)' }}>
            Your Shopping Bag ({cartCount} {cartCount === 1 ? 'item' : 'items'})
          </h1>
        </div>

        {cart.length === 0 ? (
          <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xs)', padding: '80px 24px', textAlign: 'center' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'var(--color-bg-sand)', margin: '0 auto 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
              <ShoppingBag size={30} />
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Your Shopping Bag is Empty</h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', marginBottom: '24px', maxWidth: '420px', margin: '0 auto 24px' }}>
              Explore our best-selling Korean skincare, Japanese hair remedies, and Arabian fragrances.
            </p>
            <button onClick={() => navigateTo('shop')} className="btn btn-primary">
              <span>Explore Products</span>
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'flex-start'
          }}>
            {/* Left Column: Cart Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Free Delivery Tracker */}
              <div className="free-shipping-tracker">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem' }}>
                  <Truck size={18} style={{ color: 'var(--color-gold)' }} />
                  {amountNeededForFreeShipping > 0 ? (
                    <span>
                      Add <strong style={{ color: 'var(--color-gold-hover)' }}>AED {amountNeededForFreeShipping}</strong> more to qualify for <strong>FREE UAE Delivery</strong>!
                    </span>
                  ) : (
                    <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>
                      🎉 Congratulations! You have unlocked FREE UAE Courier Delivery!
                    </span>
                  )}
                </div>
                <div className="tracker-bar-bg">
                  <div className="tracker-bar-fill" style={{ width: `${freeShippingProgress}%` }} />
                </div>
              </div>

              {/* Items Card List */}
              <div style={{ background: '#FFFFFF', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                {cart.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.option}-${idx}`}
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '20px',
                      padding: '24px',
                      borderBottom: idx < cart.length - 1 ? '1px solid var(--border-light)' : 'none',
                      alignItems: 'center'
                    }}
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      style={{
                        width: '90px',
                        height: '90px',
                        objectFit: 'contain',
                        background: '#F9F8F6',
                        borderRadius: 'var(--radius-xs)',
                        border: '1px solid var(--border-light)',
                        padding: '6px'
                      }}
                    />

                    <div style={{ flex: '1 1 240px' }}>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-gold)', textTransform: 'uppercase', fontWeight: 600 }}>
                        {item.product.brand}
                      </div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-text-primary)', margin: '2px 0 4px' }}>
                        {item.product.title}
                      </h3>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                        Selected: {item.option || item.product.size}
                      </div>

                      <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                        <button
                          onClick={() => {
                            toggleWishlist(item.product);
                            removeFromCart(item.product.id, item.option);
                          }}
                          style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}
                        >
                          <Heart size={14} />
                          <span>Save for Later</span>
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.option)}
                          style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--color-sale)' }}
                        >
                          <Trash2 size={14} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                    {/* Quantity Stepper & Price */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginLeft: 'auto' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)' }}>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.option, item.quantity - 1)}
                          style={{ padding: '6px 12px', fontSize: '1rem', color: 'var(--color-text-primary)' }}
                        >
                          -
                        </button>
                        <span style={{ padding: '6px 12px', fontSize: '0.9rem', fontWeight: 700 }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.option, item.quantity + 1)}
                          style={{ padding: '6px 12px', fontSize: '1rem', color: 'var(--color-text-primary)' }}
                        >
                          +
                        </button>
                      </div>

                      <div style={{ textAlign: 'right', minWidth: '90px' }}>
                        <div style={{ fontSize: '1.18rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                          AED {item.product.priceAED * item.quantity}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                          AED {item.product.priceAED} each
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Order Summary Box */}
            <div style={{ maxWidth: '440px', width: '100%' }}>
              <div style={{
                background: '#FFFFFF',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-xs)',
                padding: '24px',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
                  Order Summary
                </h3>

                {/* Promo Box */}
                <div>
                  {appliedPromo ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--color-gold-light)', border: '1px solid var(--color-gold-border)', padding: '10px 14px', borderRadius: 'var(--radius-xs)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--color-gold-hover)', fontWeight: 600 }}>
                        <Tag size={15} />
                        <span>Code Applied: {appliedPromo}</span>
                      </div>
                      <button onClick={removePromo} style={{ fontSize: '0.75rem', color: 'var(--color-sale)', textDecoration: 'underline' }}>
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        placeholder="Promo code (e.g. WELCOME10)"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="form-input"
                        style={{ padding: '10px 14px', fontSize: '0.85rem' }}
                      />
                      <button type="submit" className="btn btn-secondary btn-sm">
                        Apply
                      </button>
                    </form>
                  )}
                </div>

                {/* Price Breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
                    <span>Subtotal</span>
                    <span>AED {cartSubtotal}</span>
                  </div>

                  {promoDiscountAmount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-sale)', fontWeight: 600 }}>
                      <span>Promo Discount</span>
                      <span>- AED {promoDiscountAmount}</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
                    <span>UAE Delivery</span>
                    <span>{shippingFee === 0 ? <strong style={{ color: 'var(--color-success)' }}>FREE</strong> : `AED ${shippingFee}`}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
                    <span>VAT (5% Included)</span>
                    <span>AED {vatAmount}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-text-primary)', borderTop: '1px solid var(--border-medium)', paddingTop: '14px', marginTop: '4px' }}>
                    <span>Total (AED)</span>
                    <span style={{ color: 'var(--color-gold-hover)' }}>AED {cartTotal}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigateTo('checkout')}
                  className="btn btn-primary btn-block"
                  style={{ padding: '16px 24px', fontSize: '0.9rem' }}
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight size={16} />
                </button>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>
                  <ShieldCheck size={14} style={{ color: 'var(--color-gold)' }} />
                  <span>Complimentary luxury samples included with every order</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
