import React from 'react';
import { CheckCircle2, Truck, Calendar, MapPin, Package, ArrowRight, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function OrderConfirmationPage() {
  const { latestOrder, navigateTo, setTrackingModalOrder } = useShop();

  const order = latestOrder || {
    id: 'SB-UAE-7489',
    customerName: 'Fatima Al-Mansoor',
    date: 'Just now',
    emirate: 'Dubai',
    area: 'Dubai Marina',
    address: 'Marina Gate 2, Apt 2804',
    totalAED: 242,
    items: [
      { title: 'COSRX Advanced Snail 96 Mucin Power Essence', quantity: 1, priceAED: 78 },
      { title: 'Anua Heartleaf 77% Soothing Toner', quantity: 1, priceAED: 89 }
    ],
    paymentMethod: 'Credit Card',
    trackingNumber: 'SE-DXB-748912'
  };

  return (
    <div style={{ background: 'var(--color-bg-main)', minHeight: '85vh', padding: '4rem 0 6rem' }}>
      <div className="container" style={{ maxWidth: '780px' }}>
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-xs)',
          padding: 'clamp(2rem, 5vw, 3.5rem)',
          boxShadow: 'var(--shadow-md)',
          textAlign: 'center'
        }}>
          {/* Celebratory Checkmark */}
          <div style={{
            width: '74px',
            height: '74px',
            borderRadius: '50%',
            background: 'var(--color-success-bg)',
            color: 'var(--color-success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 8px 24px rgba(46, 106, 79, 0.15)'
          }}>
            <CheckCircle2 size={38} />
          </div>

          <span className="section-eyebrow" style={{ color: 'var(--color-success)' }}>
            PAYMENT AUTHORIZED • ORDER CONFIRMED
          </span>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '12px' }}>
            Thank You For Your Order
          </h1>

          <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', maxWidth: '520px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            We’ve received your order and our Dubai temperature-controlled fulfillment team is preparing your luxury items.
          </p>

          {/* Key Details Pill Box */}
          <div style={{
            background: 'var(--color-bg-main)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-xs)',
            padding: '20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '16px',
            textAlign: 'left',
            marginBottom: '32px'
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Order Number</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-gold-hover)' }}>{order.id}</div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Estimated Delivery</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Tomorrow by 6:00 PM</div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Delivery Emirate</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{order.emirate}</div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Total Paid</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>AED {order.totalAED}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
            <button
              onClick={() => setTrackingModalOrder(order)}
              className="btn btn-primary"
            >
              <Truck size={16} />
              <span>TRACK ORDER MILESTONES</span>
            </button>

            <button
              onClick={() => navigateTo('shop')}
              className="btn btn-secondary"
            >
              <span>CONTINUE SHOPPING</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Concierge Note */}
          <div style={{
            marginTop: '32px',
            paddingTop: '20px',
            borderTop: '1px solid var(--border-light)',
            fontSize: '0.82rem',
            color: 'var(--color-text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <ShieldCheck size={16} style={{ color: 'var(--color-gold)' }} />
            <span>A confirmation SMS with live courier tracking has been sent to your mobile.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
