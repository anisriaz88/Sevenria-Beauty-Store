import React from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Package, 
  ArrowUpRight
} from 'lucide-react';
import { ADMIN_STATS, REVENUE_CHART_DATA } from '../../data/adminMock';
import { useShop } from '../../context/ShopContext';

export default function AdminDashboard({ onSelectTab }) {
  const { ordersList, productsList, setTrackingModalOrder } = useShop();

  const maxRevenue = Math.max(...REVENUE_CHART_DATA.map(d => d.revenue));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px'
      }}>
        {/* Total Revenue */}
        <div style={{ background: '#FFFFFF', padding: '22px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
              Total UAE Revenue
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-gold-light)', color: 'var(--color-gold-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            AED {ADMIN_STATS.totalRevenueAED.toLocaleString()}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: 'var(--color-success)', marginTop: '6px', fontWeight: 600 }}>
            <ArrowUpRight size={14} />
            <span>+{ADMIN_STATS.monthlyGrowthPercent}% vs last month</span>
          </div>
        </div>

        {/* Total Orders */}
        <div style={{ background: '#FFFFFF', padding: '22px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
              Completed Orders
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingBag size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            {ordersList.length + 1420}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: 'var(--color-success)', marginTop: '6px', fontWeight: 600 }}>
            <ArrowUpRight size={14} />
            <span>+{ADMIN_STATS.orderGrowthPercent}% order rate</span>
          </div>
        </div>

        {/* Active Products */}
        <div style={{ background: '#FFFFFF', padding: '22px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
              Active Catalog Items
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F0FDF4', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Package size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            {productsList.length} SKUs
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '6px' }}>
            16 Brands across 6 Categories
          </div>
        </div>

        {/* Customers */}
        <div style={{ background: '#FFFFFF', padding: '22px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
              UAE Client Base
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#FAF5FF', color: '#9333EA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            {ADMIN_STATS.activeCustomers.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '6px' }}>
            Dubai & Abu Dhabi 72%
          </div>
        </div>
      </div>

      {/* Revenue Chart Visual */}
      <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 600 }}>Monthly Revenue Growth (AED)</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Direct online store sales across United Arab Emirates</p>
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-gold-hover)', background: 'var(--color-gold-light)', padding: '4px 10px', borderRadius: 'var(--radius-pill)' }}>
            YTD 2026
          </span>
        </div>

        {/* Bar Chart Visualization */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', height: '200px', paddingTop: '20px', borderBottom: '1px solid var(--border-light)' }}>
          {REVENUE_CHART_DATA.map((item) => {
            const heightPercent = Math.round((item.revenue / maxRevenue) * 100);
            return (
              <div key={item.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                  {(item.revenue / 1000).toFixed(1)}k
                </span>
                <div 
                  style={{
                    width: '100%',
                    maxWidth: '42px',
                    height: `${heightPercent}%`,
                    background: item.month === 'Sep' ? 'var(--color-gold)' : 'var(--color-bg-dark)',
                    borderRadius: '4px 4px 0 0',
                    transition: 'height 0.4s ease'
                  }}
                  title={`AED ${item.revenue} (${item.orders} orders)`}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Orders Overview */}
      <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 600 }}>Recent UAE Orders</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Latest courier orders ready for fulfillment</p>
          </div>
          <button 
            onClick={() => onSelectTab('orders')}
            className="btn btn-secondary btn-sm"
          >
            Manage All Orders
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-medium)', color: 'var(--color-text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 12px' }}>Order ID</th>
                <th style={{ padding: '10px 12px' }}>Customer</th>
                <th style={{ padding: '10px 12px' }}>Emirate</th>
                <th style={{ padding: '10px 12px' }}>Total (AED)</th>
                <th style={{ padding: '10px 12px' }}>Payment</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
                <th style={{ padding: '10px 12px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ordersList.slice(0, 5).map(o => (
                <tr key={o.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '12px', fontWeight: 700, color: 'var(--color-gold-hover)' }}>{o.id}</td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 600 }}>{o.customerName}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{o.customerPhone}</div>
                  </td>
                  <td style={{ padding: '12px' }}>{o.emirate}</td>
                  <td style={{ padding: '12px', fontWeight: 700 }}>AED {o.totalAED}</td>
                  <td style={{ padding: '12px' }}>{o.paymentMethod}</td>
                  <td style={{ padding: '12px' }}>
                    <span className={`admin-badge-status status-${o.status.toLowerCase()}`}>
                      {o.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <button
                      onClick={() => setTrackingModalOrder(o)}
                      style={{ fontSize: '0.75rem', color: 'var(--color-gold-hover)', textDecoration: 'underline', fontWeight: 600 }}
                    >
                      Track Courier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
