import React from 'react';
import { X, Check, Truck } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function OrderTrackingModal() {
  const { trackingModalOrder, setTrackingModalOrder } = useShop();

  if (!trackingModalOrder) return null;

  const order = trackingModalOrder;

  const milestones = [
    { label: 'Order Confirmed', time: 'Today, 10:15 AM', location: 'Sevenria Dubai Hub', completed: true },
    { label: 'Quality Inspected & Packed', time: 'Today, 12:30 PM', location: 'Dubai Al Quoz Facility', completed: true },
    { label: 'Dispatched with Courier', time: 'Today, 2:45 PM', location: 'Sevenria Express Fleet', completed: order.status !== 'Pending' && order.status !== 'Confirmed' },
    { label: 'Out for Delivery', time: 'Estimated 4:00 PM', location: `${order.emirate || 'Dubai'} Area Delivery Van`, completed: order.status === 'Shipped' || order.status === 'Delivered' },
    { label: 'Delivered to Doorstep', time: 'Estimated 6:30 PM', location: `${order.address || 'Address'}`, completed: order.status === 'Delivered' }
  ];

  return (
    <div className="modal-overlay" onClick={() => setTrackingModalOrder(null)}>
      <div 
        style={{
          background: '#FFFFFF',
          borderRadius: 'var(--radius-sm)',
          maxWidth: '600px',
          width: '100%',
          padding: '2rem',
          position: 'relative',
          boxShadow: 'var(--shadow-lg)',
          animation: 'fadeIn 0.2s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setTrackingModalOrder(null)}
          style={{ position: 'absolute', top: '18px', right: '18px', color: 'var(--color-text-primary)' }}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <Truck size={22} style={{ color: 'var(--color-gold)' }} />
          <h3 style={{ fontSize: '1.35rem', fontWeight: 600 }}>
            Track Order #{order.id}
          </h3>
        </div>

        <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '20px' }}>
          Courier Tracking Number: <strong style={{ color: 'var(--color-text-primary)' }}>{order.trackingNumber || 'SE-DXB-928104'}</strong>
        </div>

        {/* Milestone Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', paddingLeft: '24px', borderLeft: '2px solid var(--border-medium)', margin: '16px 0 24px 8px' }}>
          {milestones.map((m, idx) => (
            <div key={idx} style={{ position: 'relative' }}>
              {/* Dot */}
              <div style={{
                position: 'absolute',
                left: '-32px',
                top: '0',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: m.completed ? 'var(--color-success)' : '#E5E5E5',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid #FFFFFF'
              }}>
                {m.completed && <Check size={10} />}
              </div>

              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: m.completed ? 700 : 500, color: m.completed ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>
                  {m.label}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', gap: '8px', marginTop: '2px' }}>
                  <span>{m.time}</span>
                  <span>•</span>
                  <span>{m.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Destination & Concierge support */}
        <div style={{ padding: '14px', background: 'var(--color-bg-main)', borderRadius: 'var(--radius-xs)', fontSize: '0.82rem', color: 'var(--color-text-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div>Delivering to: <strong>{order.customerName}</strong></div>
            <div style={{ color: 'var(--color-text-muted)' }}>{order.emirate} • {order.address}</div>
          </div>
          <a
            href="https://wa.me/971501234567"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '0.78rem', color: '#25D366', fontWeight: 600, border: '1px solid #25D366', padding: '6px 12px', borderRadius: 'var(--radius-pill)', whiteSpace: 'nowrap' }}
          >
            WhatsApp Courier
          </a>
        </div>
      </div>
    </div>
  );
}
