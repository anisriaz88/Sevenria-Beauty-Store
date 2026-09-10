import React from 'react';
import { ShieldCheck, Truck, Tag } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function OrderSummaryBox({ promoCodeInput, setPromoCodeInput, onApplyPromo, onRemovePromo }) {
  const { 
    cart, 
    cartSubtotal, 
    vatAmount, 
    shippingFee, 
    cartTotal, 
    appliedPromo, 
    promoDiscountAmount 
  } = useShop();

  return (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid var(--border-medium)',
      borderRadius: 'var(--radius-xs)',
      padding: '24px',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <h3 style={{ fontSize: '1.15rem', fontWeight: 600, borderBottom: '1px solid var(--border-light)', paddingBottom: '14px', marginBottom: '16px' }}>
        Order Summary ({cart.reduce((a, i) => a + i.quantity, 0)} items)
      </h3>

      {/* Mini Items Preview */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '220px', overflowY: 'auto', marginBottom: '16px', paddingRight: '4px' }}>
        {cart.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={item.product.images[0]}
                alt={item.product.title}
                style={{ width: '48px', height: '48px', objectFit: 'contain', background: '#F8F7F4', border: '1px solid var(--border-light)', borderRadius: '4px', padding: '2px' }}
              />
              <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: 'var(--color-text-primary)', color: '#FFFFFF', fontSize: '0.65rem', fontWeight: 700, width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.quantity}
              </span>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.product.title}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                {item.option || item.product.size}
              </div>
            </div>

            <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              AED {item.product.priceAED * item.quantity}
            </div>
          </div>
        ))}
      </div>

      {/* Promo Code Input */}
      <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px', marginBottom: '16px' }}>
        {appliedPromo ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--color-gold-light)', padding: '10px 14px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--color-gold-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-gold-hover)' }}>
              <Tag size={15} />
              <span>Promo applied: {appliedPromo}</span>
            </div>
            <button
              type="button"
              onClick={onRemovePromo}
              style={{ fontSize: '0.75rem', color: 'var(--color-sale)', textDecoration: 'underline' }}
            >
              Remove
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Promo code (try WELCOME10)"
              value={promoCodeInput}
              onChange={(e) => setPromoCodeInput(e.target.value)}
              className="form-input"
              style={{ padding: '8px 12px', fontSize: '0.84rem' }}
            />
            <button
              type="button"
              onClick={onApplyPromo}
              className="btn btn-secondary btn-sm"
              style={{ padding: '8px 16px' }}
            >
              Apply
            </button>
          </div>
        )}
      </div>

      {/* Price Calculations */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
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
          <span>UAE Courier Delivery</span>
          <span>{shippingFee === 0 ? <strong style={{ color: 'var(--color-success)' }}>FREE</strong> : `AED ${shippingFee}`}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
          <span>Estimated UAE VAT (5% included)</span>
          <span>AED {vatAmount}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text-primary)', borderTop: '1px solid var(--border-medium)', paddingTop: '12px', marginTop: '6px' }}>
          <span>Total (AED)</span>
          <span style={{ color: 'var(--color-gold-hover)' }}>AED {cartTotal}</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '18px', padding: '10px', background: 'var(--color-bg-main)', borderRadius: 'var(--radius-xs)', fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>
        <ShieldCheck size={16} style={{ color: 'var(--color-gold)' }} />
        <span>Bank-grade 256-bit SSL encrypted checkout</span>
      </div>
    </div>
  );
}
