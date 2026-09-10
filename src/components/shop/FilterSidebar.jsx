import React, { useState } from 'react';
import { ChevronDown, Check, X, RotateCcw } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { BRANDS } from '../../data/brands';
import { CONCERNS } from '../../data/concerns';

export default function FilterSidebar({
  selectedCategories,
  setSelectedCategories,
  selectedBrands,
  setSelectedBrands,
  selectedConcerns,
  setSelectedConcerns,
  selectedPriceRange,
  setSelectedPriceRange,
  selectedRating,
  setSelectedRating,
  onlyInStock,
  setOnlyInStock,
  onlySale,
  setOnlySale,
  onResetFilters
}) {
  const [openSections, setOpenSections] = useState({
    category: true,
    brand: true,
    price: true,
    concern: true,
    rating: false,
    availability: true
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleArrayItem = (item, list, setter) => {
    if (list.includes(item)) {
      setter(list.filter(i => i !== item));
    } else {
      setter([...list, item]);
    }
  };

  const PRICE_RANGES = [
    { id: 'all', label: 'All Prices' },
    { id: 'under-50', label: 'Under AED 50' },
    { id: '50-100', label: 'AED 50 to AED 100' },
    { id: '100-200', label: 'AED 100 to AED 200' },
    { id: 'over-200', label: 'Over AED 200' }
  ];

  return (
    <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header & Reset */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border-medium)' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Filters
        </span>
        <button
          onClick={onResetFilters}
          style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.74rem', color: 'var(--color-text-muted)' }}
        >
          <RotateCcw size={12} />
          <span>Reset All</span>
        </button>
      </div>

      {/* 1. Category Filter */}
      <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
        <button
          onClick={() => toggleSection('category')}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.86rem', fontWeight: 600, padding: '4px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}
        >
          <span>Category</span>
          <ChevronDown size={16} style={{ transform: openSections.category ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
        </button>

        {openSections.category && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
            {CATEGORIES.map(cat => {
              const isChecked = selectedCategories.includes(cat.id);
              return (
                <label key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleArrayItem(cat.id, selectedCategories, setSelectedCategories)}
                    style={{ accentColor: 'var(--color-gold)', width: '16px', height: '16px' }}
                  />
                  <span>{cat.name}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Brand Filter */}
      <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
        <button
          onClick={() => toggleSection('brand')}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.86rem', fontWeight: 600, padding: '4px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}
        >
          <span>Brand</span>
          <ChevronDown size={16} style={{ transform: openSections.brand ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
        </button>

        {openSections.brand && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px', maxHeight: '220px', overflowY: 'auto' }}>
            {BRANDS.map(brand => {
              const isChecked = selectedBrands.includes(brand.name);
              return (
                <label key={brand.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleArrayItem(brand.name, selectedBrands, setSelectedBrands)}
                    style={{ accentColor: 'var(--color-gold)', width: '16px', height: '16px' }}
                  />
                  <span>{brand.name}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Concern Filter */}
      <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
        <button
          onClick={() => toggleSection('concern')}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.86rem', fontWeight: 600, padding: '4px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}
        >
          <span>Target Concern</span>
          <ChevronDown size={16} style={{ transform: openSections.concern ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
        </button>

        {openSections.concern && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
            {CONCERNS.map(concern => {
              const isChecked = selectedConcerns.includes(concern.title);
              return (
                <label key={concern.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleArrayItem(concern.title, selectedConcerns, setSelectedConcerns)}
                    style={{ accentColor: 'var(--color-gold)', width: '16px', height: '16px' }}
                  />
                  <span>{concern.title}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Price Filter */}
      <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
        <button
          onClick={() => toggleSection('price')}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.86rem', fontWeight: 600, padding: '4px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}
        >
          <span>Price (AED)</span>
          <ChevronDown size={16} style={{ transform: openSections.price ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
        </button>

        {openSections.price && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
            {PRICE_RANGES.map(range => (
              <label key={range.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="priceRange"
                  checked={selectedPriceRange === range.id}
                  onChange={() => setSelectedPriceRange(range.id)}
                  style={{ accentColor: 'var(--color-gold)' }}
                />
                <span>{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 5. Availability & Offers */}
      <div>
        <div style={{ fontSize: '0.86rem', fontWeight: 600, padding: '4px 0', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '10px' }}>
          Availability & Deals
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={(e) => setOnlyInStock(e.target.checked)}
              style={{ accentColor: 'var(--color-gold)' }}
            />
            <span>In Stock Only</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={onlySale}
              onChange={(e) => setOnlySale(e.target.checked)}
              style={{ accentColor: 'var(--color-gold)' }}
            />
            <span style={{ color: 'var(--color-sale)', fontWeight: 600 }}>Discounted / On Sale Only</span>
          </label>
        </div>
      </div>
    </aside>
  );
}
