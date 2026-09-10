import React from 'react';
import { X, Check } from 'lucide-react';
import FilterSidebar from './FilterSidebar';

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  totalResults,
  ...filterProps
}) {
  if (!isOpen) return null;

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div 
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '85%',
          maxWidth: '380px',
          background: '#FFFFFF',
          zIndex: 1001,
          boxShadow: 'var(--shadow-drawer)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 0.28s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div style={{
          padding: '18px 20px',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--color-bg-main)'
        }}>
          <span style={{ fontSize: '0.92rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Filter Catalog
          </span>
          <button onClick={onClose} style={{ padding: '4px', color: 'var(--color-text-primary)' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          <FilterSidebar {...filterProps} />
        </div>

        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid var(--border-light)',
          background: '#FFFFFF'
        }}>
          <button
            onClick={onClose}
            className="btn btn-primary btn-block"
          >
            <span>View {totalResults} Products</span>
          </button>
        </div>
      </div>
    </>
  );
}
