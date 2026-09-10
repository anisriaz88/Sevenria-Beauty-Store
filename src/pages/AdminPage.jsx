import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Tags, 
  Award, 
  Settings, 
  ArrowLeft,
  Bell,
  Search,
  ExternalLink
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminProducts from '../components/admin/AdminProducts';
import AdminOrders from '../components/admin/AdminOrders';

export default function AdminPage() {
  const { adminTab, setAdminTab, navigateTo, ordersList, productsList } = useShop();

  return (
    <div style={{ background: '#F5F4F0', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Admin Bar */}
      <header style={{
        background: '#181818',
        color: '#FFFFFF',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #2D2D2D'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => navigateTo('home')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem',
              color: '#A0A0A0',
              padding: '6px 12px',
              borderRadius: 'var(--radius-xs)',
              background: '#242424',
              transition: 'color 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#A0A0A0'}
          >
            <ArrowLeft size={14} />
            <span>Return to Storefront</span>
          </button>

          <div style={{ height: '18px', width: '1px', background: '#333333' }} />

          <div>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.04em', color: '#FFFFFF' }}>
              SEVENRIA
            </span>
            <span style={{ fontSize: '0.68rem', letterSpacing: '0.14em', color: 'var(--color-gold)', marginLeft: '8px', fontWeight: 700 }}>
              MERCHANT CONSOLE (DUBAI)
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '0.78rem', color: '#B0B0B0' }}>
            Store Status: <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>● Online (UAE Live)</span>
          </div>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-gold)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>
            AD
          </div>
        </div>
      </header>

      {/* Admin Body: Sidebar + Main Workspace */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Admin Left Sidebar */}
        <aside style={{
          width: '240px',
          background: '#FFFFFF',
          borderRight: '1px solid var(--border-medium)',
          padding: '20px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'products', label: `Products (${productsList.length})`, icon: Package },
            { id: 'orders', label: `Orders (${ordersList.length})`, icon: ShoppingBag },
            { id: 'categories', label: 'Categories (6)', icon: Tags },
            { id: 'brands', label: 'Brands (16)', icon: Award }
          ].map(item => {
            const Icon = item.icon;
            const isActive = adminTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setAdminTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.86rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--color-gold-hover)' : 'var(--color-text-secondary)',
                  background: isActive ? 'var(--color-gold-light)' : 'transparent',
                  textAlign: 'left',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Admin Main Workspace */}
        <main style={{ flex: 1, padding: 'clamp(1.5rem, 3vw, 2.5rem)', overflowY: 'auto' }}>
          {adminTab === 'dashboard' && <AdminDashboard onSelectTab={setAdminTab} />}
          {adminTab === 'products' && <AdminProducts />}
          {adminTab === 'orders' && <AdminOrders />}
          {adminTab === 'categories' && (
            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)' }}>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '14px' }}>Manage Catalog Categories</h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
                All 6 top categories are active on the UAE Storefront.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                {['Skincare', 'Makeup', 'Haircare', 'Fragrance', 'Body Care', 'Personal Care'].map(c => (
                  <div key={c} style={{ border: '1px solid var(--border-medium)', padding: '16px', borderRadius: '4px' }}>
                    <div style={{ fontWeight: 700 }}>{c}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-gold-hover)', marginTop: '4px' }}>Active on Header & MegaMenu</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {adminTab === 'brands' && (
            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)' }}>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '14px' }}>Manage Registered Brands</h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
                16 official brand partnerships loaded with localized UAE AED pricing.
              </p>
              <button onClick={() => navigateTo('brands')} className="btn btn-secondary btn-sm">
                View Public Brands Page
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
