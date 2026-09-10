import React, { useState } from 'react';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Settings, 
  LogOut, 
  Truck, 
  Check, 
  ExternalLink,
  Plus
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import Breadcrumbs from '../components/common/Breadcrumbs';

export default function AccountPage() {
  const { ordersList, wishlist, setTrackingModalOrder, navigateTo, addToast } = useShop();

  const [activeTab, setActiveTab] = useState('overview');

  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      tag: 'Default • Apartment',
      name: 'Fatima Al-Mansoor',
      phone: '+971 50 829 1142',
      emirate: 'Dubai',
      area: 'Dubai Marina',
      address: 'Marina Gate 2, Apt 2804',
      isDefault: true
    },
    {
      id: 'addr-2',
      tag: 'Work • Office',
      name: 'Fatima Al-Mansoor',
      phone: '+971 50 829 1142',
      emirate: 'Dubai',
      area: 'Downtown Dubai',
      address: 'Boulevard Plaza Tower 1, Suite 1204',
      isDefault: false
    }
  ]);

  const handleLogout = () => {
    addToast('Logged out of demo session.', 'info');
  };

  return (
    <div style={{ background: 'var(--color-bg-main)', minHeight: '85vh', paddingBottom: '6rem' }}>
      <div className="container">
        <Breadcrumbs items={[{ label: 'My UAE Account' }]} />

        {/* User Welcome Banner */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-xs)',
          padding: '24px 28px',
          marginBottom: '28px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--color-gold-light)', color: 'var(--color-gold-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 700 }}>
              FA
            </div>
            <div>
              <div style={{ fontSize: '0.74rem', color: 'var(--color-gold)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                SEVENRIA PRIVÉ MEMBER
              </div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                Fatima Al-Mansoor
              </h1>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                fatima.mansoor@example.com • Dubai, United Arab Emirates
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={() => navigateTo('wishlist')} 
              className="btn btn-secondary btn-sm"
            >
              <Heart size={14} />
              <span>Wishlist ({wishlist.length})</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Sidebar Tabs & Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '32px',
          alignItems: 'flex-start'
        }} className="catalog-layout">
          {/* Sidebar Menu */}
          <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xs)', padding: '12px', boxShadow: 'var(--shadow-sm)' }}>
            {[
              { id: 'overview', label: 'Account Overview', icon: User },
              { id: 'orders', label: `My Orders (${ordersList.length})`, icon: Package },
              { id: 'addresses', label: 'Delivery Addresses', icon: MapPin },
              { id: 'details', label: 'Profile Details', icon: Settings }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.88rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--color-gold-hover)' : 'var(--color-text-secondary)',
                    background: isActive ? 'var(--color-gold-light)' : 'transparent',
                    textAlign: 'left',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div style={{ height: '1px', background: 'var(--border-light)', margin: '8px 0' }} />

            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                fontSize: '0.86rem',
                color: 'var(--color-sale)',
                textAlign: 'left'
              }}
            >
              <LogOut size={16} />
              <span>Log Out (Demo)</span>
            </button>
          </div>

          {/* Tab Content Panel */}
          <div style={{ background: '#FFFFFF', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', padding: 'clamp(1.5rem, 4vw, 2.5rem)', boxShadow: 'var(--shadow-sm)' }}>
            {/* 1. Overview */}
            {activeTab === 'overview' && (
              <div>
                <h2 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>Account Overview</h2>
                
                {/* Metric Summary Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '28px' }}>
                  <div style={{ background: 'var(--color-bg-main)', padding: '16px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Recent Orders</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-text-primary)', marginTop: '4px' }}>{ordersList.length}</div>
                  </div>
                  <div style={{ background: 'var(--color-bg-main)', padding: '16px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Saved in Wishlist</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-gold-hover)', marginTop: '4px' }}>{wishlist.length}</div>
                  </div>
                  <div style={{ background: 'var(--color-bg-main)', padding: '16px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Sevenria Tier</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)', marginTop: '6px' }}>Gold Privé</div>
                  </div>
                </div>

                {/* Latest Order Highlight */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '12px' }}>Most Recent Order</h3>
                {ordersList[0] && (
                  <div style={{ border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xs)', padding: '18px', background: 'var(--color-bg-main)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontWeight: 700, color: 'var(--color-gold-hover)' }}>{ordersList[0].id}</span>
                      <span className={`admin-badge-status status-${ordersList[0].status.toLowerCase()}`}>
                        {ordersList[0].status}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.84rem', color: 'var(--color-text-secondary)', marginBottom: '14px' }}>
                      {ordersList[0].itemsCount} items • Total: <strong>AED {ordersList[0].totalAED}</strong> • {ordersList[0].date}
                    </div>
                    <button 
                      onClick={() => setTrackingModalOrder(ordersList[0])}
                      className="btn btn-secondary btn-sm"
                    >
                      <Truck size={14} />
                      <span>Track Live Courier Progress</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 2. Orders */}
            {activeTab === 'orders' && (
              <div>
                <h2 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>Order History</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {ordersList.map(order => (
                    <div key={order.id} style={{ border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xs)', padding: '18px', background: '#FFFFFF' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginBottom: '12px' }}>
                        <div>
                          <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-gold-hover)' }}>{order.id}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Placed {order.date}</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span className={`admin-badge-status status-${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                          <button
                            onClick={() => setTrackingModalOrder(order)}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '6px 12px', fontSize: '0.74rem' }}
                          >
                            <Truck size={13} />
                            <span>Track</span>
                          </button>
                        </div>
                      </div>

                      <div style={{ fontSize: '0.86rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {order.items?.map((it, i) => (
                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
                            <span>{it.quantity}x {it.title}</span>
                            <span style={{ fontWeight: 600 }}>AED {it.priceAED * it.quantity}</span>
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '10px', marginTop: '10px' }}>
                        <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Delivering to: {order.emirate} • {order.address}</span>
                        <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>Total: AED {order.totalAED}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Addresses */}
            {activeTab === 'addresses' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '1.4rem' }}>Saved UAE Addresses</h2>
                  <button className="btn btn-secondary btn-sm" onClick={() => addToast('Add new address modal (Demo)')}>
                    <Plus size={14} />
                    <span>Add New</span>
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  {addresses.map(addr => (
                    <div key={addr.id} style={{ border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', padding: '18px', background: '#FFFFFF' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-gold-hover)', textTransform: 'uppercase' }}>{addr.tag}</span>
                        {addr.isDefault && (
                          <span style={{ fontSize: '0.65rem', background: 'var(--color-success-bg)', color: 'var(--color-success)', padding: '2px 6px', borderRadius: 'var(--radius-pill)', fontWeight: 600 }}>DEFAULT</span>
                        )}
                      </div>
                      <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{addr.name}</div>
                      <div style={{ fontSize: '0.84rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>{addr.emirate} • {addr.area}</div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>{addr.address}</div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>{addr.phone}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Details */}
            {activeTab === 'details' && (
              <div>
                <h2 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>Personal Profile Details</h2>
                <form onSubmit={(e) => { e.preventDefault(); addToast('Profile details updated!'); }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-input" defaultValue="Fatima" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-input" defaultValue="Al-Mansoor" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-input" defaultValue="fatima.mansoor@example.com" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Mobile Number</label>
                    <input type="tel" className="form-input" defaultValue="+971 50 829 1142" />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <button type="submit" className="btn btn-primary btn-sm">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
