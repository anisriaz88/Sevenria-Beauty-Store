import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { CATEGORIES } from '../../data/categories';
import { BRANDS } from '../../data/brands';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function MegaMenu() {
  const { activePage, navigateTo } = useShop();
  const [hoveredMenu, setHoveredMenu] = useState(null);

  const navItems = [
    { label: 'New Arrivals', page: 'shop', filter: { filterType: 'new' } },
    { label: 'Skincare', page: 'shop', categoryId: 'skincare', hasMega: true },
    { label: 'Makeup', page: 'shop', categoryId: 'makeup', hasMega: true },
    { label: 'Haircare', page: 'shop', categoryId: 'haircare', hasMega: true },
    { label: 'Fragrance', page: 'shop', categoryId: 'fragrance', hasMega: true },
    { label: 'Body Care', page: 'shop', categoryId: 'bodycare' },
    { label: 'Personal Care', page: 'shop', categoryId: 'personalcare' },
    { label: 'Brands', page: 'brands' },
    { label: 'Best Sellers', page: 'shop', filter: { filterType: 'bestseller' } },
    { label: 'Offers', page: 'offers', highlight: true }
  ];

  const handleNavClick = (item) => {
    setHoveredMenu(null);
    if (item.page === 'offers') {
      navigateTo('offers');
    } else if (item.page === 'brands') {
      navigateTo('brands');
    } else if (item.categoryId) {
      navigateTo('shop', { category: item.categoryId });
    } else if (item.filter) {
      navigateTo('shop', item.filter);
    } else {
      navigateTo(item.page);
    }
  };

  const getMegaData = (categoryId) => {
    const category = CATEGORIES.find(c => c.id === categoryId);
    const relatedBrands = BRANDS.slice(0, 6);
    return { category, relatedBrands };
  };

  return (
    <nav 
      className="desktop-nav"
      onMouseLeave={() => setHoveredMenu(null)}
      style={{ position: 'relative' }}
    >
      {navItems.map((item) => (
        <div 
          key={item.label}
          onMouseEnter={() => item.hasMega ? setHoveredMenu(item.categoryId) : setHoveredMenu(null)}
          style={{ position: 'relative' }}
        >
          <button
            onClick={() => handleNavClick(item)}
            className={`nav-item-link ${item.highlight ? 'text-sale' : ''}`}
            style={{
              color: item.highlight ? 'var(--color-sale)' : undefined,
              fontWeight: item.highlight ? 700 : undefined
            }}
          >
            {item.label}
            {item.highlight && (
              <span 
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-14px',
                  background: 'var(--color-sale)',
                  color: '#FFFFFF',
                  fontSize: '0.58rem',
                  padding: '1px 5px',
                  borderRadius: 'var(--radius-pill)',
                  letterSpacing: '0.04em'
                }}
              >
                SALE
              </span>
            )}
          </button>
        </div>
      ))}

      {/* Hover Mega Menu Overlay */}
      {hoveredMenu && (
        <div 
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#FFFFFF',
            border: '1px solid var(--border-medium)',
            borderRadius: '0 0 var(--radius-md) var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            padding: '2.5rem',
            zIndex: 110,
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr 1.2fr',
            gap: '2.5rem',
            animation: 'fadeIn 0.2s ease'
          }}
          onMouseEnter={() => setHoveredMenu(hoveredMenu)}
          onMouseLeave={() => setHoveredMenu(null)}
        >
          {(() => {
            const { category, relatedBrands } = getMegaData(hoveredMenu);
            if (!category) return null;

            return (
              <>
                {/* Column 1: Subcategories */}
                <div>
                  <h4 style={{ fontSize: '0.82rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '16px' }}>
                    Shop by Subcategory
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {category.subcategories.map(sub => (
                      <li key={sub}>
                        <button
                          onClick={() => {
                            setHoveredMenu(null);
                            navigateTo('shop', { category: category.id, subcategory: sub });
                          }}
                          style={{
                            fontSize: '0.92rem',
                            color: 'var(--color-text-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'color 0.15s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-gold-hover)'}
                          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
                        >
                          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-gold)' }} />
                          {sub}
                        </button>
                      </li>
                    ))}
                    <li style={{ marginTop: '8px' }}>
                      <button
                        onClick={() => {
                          setHoveredMenu(null);
                          navigateTo('shop', { category: category.id });
                        }}
                        style={{
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          color: 'var(--color-gold-hover)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>Explore All {category.name}</span>
                        <ArrowRight size={14} />
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Column 2: Top UAE Brands */}
                <div>
                  <h4 style={{ fontSize: '0.82rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '16px' }}>
                    Curated Brands
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {relatedBrands.map(b => (
                      <li key={b.id}>
                        <button
                          onClick={() => {
                            setHoveredMenu(null);
                            navigateTo('shop', { brand: b.name });
                          }}
                          style={{
                            fontSize: '0.92rem',
                            color: 'var(--color-text-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
                          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                        >
                          <span>{b.name}</span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{b.origin}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 3: Featured Visual Banner */}
                <div 
                  style={{
                    position: 'relative',
                    borderRadius: 'var(--radius-xs)',
                    overflow: 'hidden',
                    background: 'var(--color-bg-ivory)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '1.5rem',
                    minHeight: '220px'
                  }}
                >
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14,14,14,0.8) 0%, rgba(14,14,14,0.1) 60%)' }} />
                  <div style={{ position: 'relative', zIndex: 2, color: '#FFFFFF' }}>
                    <div style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-gold)' }}>
                      UAE EDITORIAL SPOTLIGHT
                    </div>
                    <h3 style={{ color: '#FFFFFF', fontSize: '1.3rem', margin: '4px 0 8px' }}>
                      {category.name} Curation
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem', marginBottom: '12px' }}>
                      {category.description}
                    </p>
                    <button
                      onClick={() => {
                        setHoveredMenu(null);
                        navigateTo('shop', { category: category.id });
                      }}
                      className="btn btn-gold btn-sm"
                      style={{ fontSize: '0.72rem' }}
                    >
                      Shop Collection
                    </button>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </nav>
  );
}
