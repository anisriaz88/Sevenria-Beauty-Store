import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function Breadcrumbs({ items = [] }) {
  const { navigateTo } = useShop();

  return (
    <nav 
      aria-label="Breadcrumb" 
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
        fontSize: '0.78rem',
        color: 'var(--color-text-muted)',
        padding: '16px 0 24px'
      }}
    >
      <button 
        onClick={() => navigateTo('home')}
        style={{ color: 'var(--color-text-secondary)', transition: 'color 0.15s ease' }}
        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-gold-hover)'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
      >
        Home
      </button>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight size={13} style={{ color: 'var(--color-text-muted)', opacity: 0.6 }} />
            {isLast || !item.page ? (
              <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => navigateTo(item.page, item.params || {})}
                style={{ color: 'var(--color-text-secondary)', transition: 'color 0.15s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-gold-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
