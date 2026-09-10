import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { BRANDS } from '../data/brands';
import Breadcrumbs from '../components/common/Breadcrumbs';

export default function BrandsPage() {
  const { navigateTo } = useShop();
  const [search, setSearch] = useState('');
  const [activeLetter, setActiveLetter] = useState('ALL');

  const ALPHABET = ['ALL', ...Array.from(new Set(BRANDS.map(b => b.letter))).sort()];

  const filteredBrands = BRANDS.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(search.toLowerCase()) || brand.description.toLowerCase().includes(search.toLowerCase());
    const matchesLetter = activeLetter === 'ALL' || brand.letter === activeLetter;
    return matchesSearch && matchesLetter;
  });

  return (
    <div style={{ background: 'var(--color-bg-main)', minHeight: '85vh', paddingBottom: '6rem' }}>
      <div className="container">
        <Breadcrumbs items={[{ label: 'Brands Directory (A-Z)' }]} />

        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.5rem' }}>
          <span className="section-eyebrow">WORLD CLASS FORMULATIONS</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '10px' }}>
            Brand Directory
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>
            Discover our portfolio of dermatologist-trusted Korean, Japanese, French, and luxury American cosmetic houses.
          </p>

          {/* Search Box */}
          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', background: '#FFFFFF', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-pill)', padding: '10px 18px' }}>
            <Search size={18} style={{ color: 'var(--color-text-muted)' }} />
            <input
              type="text"
              placeholder="Search brands (e.g. COSRX, Fino, Anua, CeraVe)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', paddingLeft: '10px', width: '100%', fontSize: '0.9rem' }}
            />
          </div>
        </div>

        {/* Alphabet Jump Bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          justifyContent: 'center',
          marginBottom: '3rem',
          paddingBottom: '16px',
          borderBottom: '1px solid var(--border-light)'
        }}>
          {ALPHABET.map(letter => (
            <button
              key={letter}
              onClick={() => setActiveLetter(letter)}
              style={{
                width: letter === 'ALL' ? 'auto' : '36px',
                height: '36px',
                padding: letter === 'ALL' ? '0 14px' : '0',
                borderRadius: 'var(--radius-xs)',
                fontSize: '0.82rem',
                fontWeight: 700,
                border: activeLetter === letter ? '1px solid var(--color-gold)' : '1px solid var(--border-medium)',
                background: activeLetter === letter ? 'var(--color-gold)' : '#FFFFFF',
                color: activeLetter === letter ? '#FFFFFF' : 'var(--color-text-primary)',
                transition: 'all var(--transition-fast)'
              }}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Brand Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {filteredBrands.map(brand => (
            <div
              key={brand.id}
              onClick={() => navigateTo('shop', { brand: brand.name })}
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-xs)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all var(--transition-normal)',
                boxShadow: 'var(--shadow-sm)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-gold)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-light)';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  {brand.name}
                </h3>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--color-gold-hover)', background: 'var(--color-gold-light)', padding: '2px 8px', borderRadius: 'var(--radius-pill)' }}>
                  {brand.origin}
                </span>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: '20px', flex: 1 }}>
                {brand.description}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '12px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  {brand.productCount} Products
                </span>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-gold-hover)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span>Shop Brand</span>
                  <ArrowRight size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
