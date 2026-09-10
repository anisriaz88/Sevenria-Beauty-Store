import React, { useState } from 'react';
import { Eye, Truck, X, Filter } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function AdminOrders() {
  const { ordersList, updateOrderStatus, setTrackingModalOrder } = useShop();

  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [activeOrderDetail, setActiveOrderDetail] = useState(null);

  const STATUSES = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const filteredOrders = selectedStatusFilter === 'all'
    ? ordersList
    : ordersList.filter(o => o.status.toLowerCase() === selectedStatusFilter.toLowerCase());

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Status Filter Chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600, marginRight: '4px' }}>
          <Filter size={14} />
          <span>Status Filter:</span>
        </div>
        <button
          onClick={() => setSelectedStatusFilter('all')}
          style={{
            padding: '6px 14px',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.78rem',
            fontWeight: 600,
            border: selectedStatusFilter === 'all' ? '1px solid var(--color-gold)' : '1px solid var(--border-medium)',
            background: selectedStatusFilter === 'all' ? 'var(--color-gold)' : '#FFFFFF',
            color: selectedStatusFilter === 'all' ? '#FFFFFF' : 'var(--color-text-secondary)'
          }}
        >
          All ({ordersList.length})
        </button>

        {STATUSES.map(st => {
          const count = ordersList.filter(o => o.status.toLowerCase() === st.toLowerCase()).length;
          return (
            <button
              key={st}
              onClick={() => setSelectedStatusFilter(st)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.78rem',
                fontWeight: 600,
                border: selectedStatusFilter === st ? '1px solid var(--color-gold)' : '1px solid var(--border-medium)',
                background: selectedStatusFilter === st ? 'var(--color-gold)' : '#FFFFFF',
                color: selectedStatusFilter === st ? '#FFFFFF' : 'var(--color-text-secondary)'
              }}
            >
              {st} ({count})
            </button>
          );
        })}
      </div>

      {/* Orders Table */}
      <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xs)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--color-bg-main)', borderBottom: '1px solid var(--border-medium)', color: 'var(--color-text-muted)', fontSize: '0.74rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px' }}>Order ID</th>
                <th style={{ padding: '12px' }}>Customer & Destination</th>
                <th style={{ padding: '12px' }}>Date</th>
                <th style={{ padding: '12px' }}>Items</th>
                <th style={{ padding: '12px' }}>Total</th>
                <th style={{ padding: '12px' }}>Payment</th>
                <th style={{ padding: '12px' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '12px', fontWeight: 700, color: 'var(--color-gold-hover)' }}>
                    {order.id}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{order.customerName}</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>{order.emirate} • {order.area}</div>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>
                    {order.date}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ fontWeight: 600 }}>{order.itemsCount} items</span>
                  </td>
                  <td style={{ padding: '12px', fontWeight: 700 }}>
                    AED {order.totalAED}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div>{order.paymentMethod}</div>
                    <div style={{ fontSize: '0.72rem', color: order.paymentStatus === 'Paid' ? 'var(--color-success)' : 'var(--color-sale)' }}>
                      {order.paymentStatus}
                    </div>
                  </td>
                  <td style={{ padding: '12px' }}>
                    {/* Status Changer Dropdown */}
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: 'var(--radius-pill)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        border: '1px solid var(--border-medium)',
                        background: '#FFFFFF',
                        cursor: 'pointer'
                      }}
                    >
                      {STATUSES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button
                        onClick={() => setActiveOrderDetail(order)}
                        style={{ padding: '4px 8px', color: 'var(--color-text-secondary)', border: '1px solid var(--border-light)', borderRadius: '4px', fontSize: '0.75rem' }}
                        title="View Full Order Summary"
                      >
                        <Eye size={13} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                        <span>Details</span>
                      </button>
                      <button
                        onClick={() => setTrackingModalOrder(order)}
                        style={{ padding: '4px 8px', color: 'var(--color-gold-hover)', border: '1px solid var(--color-gold-border)', borderRadius: '4px', fontSize: '0.75rem' }}
                        title="Track Courier Progress"
                      >
                        <Truck size={13} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                        <span>Track</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Drawer */}
      {activeOrderDetail && (
        <div className="modal-overlay" onClick={() => setActiveOrderDetail(null)}>
          <div 
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-sm)',
              maxWidth: '540px',
              width: '100%',
              padding: '2rem',
              position: 'relative',
              boxShadow: 'var(--shadow-lg)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setActiveOrderDetail(null)}
              style={{ position: 'absolute', top: '18px', right: '18px', color: 'var(--color-text-primary)' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '6px' }}>
              Order Details — {activeOrderDetail.id}
            </h3>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '20px' }}>
              Placed: {activeOrderDetail.date} • Courier ID: {activeOrderDetail.trackingNumber}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-gold)' }}>
                Ordered Products
              </div>
              {activeOrderDetail.items?.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem' }}>
                  <span>{item.quantity}x {item.title}</span>
                  <span style={{ fontWeight: 700 }}>AED {item.priceAED * item.quantity}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Customer:</span>
                <span>{activeOrderDetail.customerName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Phone:</span>
                <span>{activeOrderDetail.customerPhone}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Delivery Address:</span>
                <span style={{ textAlign: 'right' }}>{activeOrderDetail.emirate}, {activeOrderDetail.address}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem', paddingTop: '8px', borderTop: '1px solid var(--border-light)' }}>
                <span>Total Amount:</span>
                <span style={{ color: 'var(--color-gold-hover)' }}>AED {activeOrderDetail.totalAED}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => {
                  setTrackingModalOrder(activeOrderDetail);
                  setActiveOrderDetail(null);
                }}
                className="btn btn-gold btn-sm"
              >
                Open Courier Live Tracking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
