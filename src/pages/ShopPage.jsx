import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, X, RotateCcw } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ProductCard from '../components/common/ProductCard';
import FilterSidebar from '../components/shop/FilterSidebar';
import MobileFilterDrawer from '../components/shop/MobileFilterDrawer';

export default function ShopPage() {
  const { productsList, pageParams } = useShop();

  // Filter states initialized from pageParams if provided
  const [selectedCategories, setSelectedCategories] = useState(() => {
    return pageParams.category ? [pageParams.category] : [];
  });
  const [selectedBrands, setSelectedBrands] = useState(() => {
    return pageParams.brand ? [pageParams.brand] : [];
  });
  const [selectedConcerns, setSelectedConcerns] = useState(() => {
    return pageParams.concern ? [pageParams.concern] : [];
  });
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlySale, setOnlySale] = useState(() => {
    return pageParams.filterType === 'sale';
  });

  const [searchFilter, setSearchFilter] = useState(() => pageParams.search || '');
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedConcerns([]);
    setSelectedPriceRange('all');
    setSelectedRating('all');
    setOnlyInStock(false);
    setOnlySale(false);
    setSearchFilter('');
  };

  // Filter calculation
  const filteredProducts = useMemo(() => {
    return productsList.filter(p => {
      // Search
      if (searchFilter) {
        const q = searchFilter.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesBrand && !matchesCat) return false;
      }

      // New arrivals filter parameter
      if (pageParams.filterType === 'new' && !p.isNew) {
        return false;
      }
      // Best seller filter parameter
      if (pageParams.filterType === 'bestseller' && !p.isBestSeller) {
        return false;
      }

      // Category
      if (selectedCategories.length > 0) {
        const catMatch = selectedCategories.some(c => p.category.toLowerCase().includes(c.toLowerCase()));
        if (!catMatch) return false;
      }

      // Brand
      if (selectedBrands.length > 0) {
        if (!selectedBrands.includes(p.brand)) return false;
      }

      // Concern
      if (selectedConcerns.length > 0) {
        if (!p.concern || !selectedConcerns.includes(p.concern)) return false;
      }

      // Price Range
      if (selectedPriceRange === 'under-50' && p.priceAED >= 50) return false;
      if (selectedPriceRange === '50-100' && (p.priceAED < 50 || p.priceAED > 100)) return false;
      if (selectedPriceRange === '100-200' && (p.priceAED < 100 || p.priceAED > 200)) return false;
      if (selectedPriceRange === 'over-200' && p.priceAED <= 200) return false;

      // In Stock
      if (onlyInStock && !p.inStock) return false;

      // Sale
      if (onlySale && (!p.discountPercent || p.discountPercent <= 0)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.priceAED - b.priceAED;
      if (sortBy === 'price-high') return b.priceAED - a.priceAED;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // featured default
    });
  }, [productsList, selectedCategories, selectedBrands, selectedConcerns, selectedPriceRange, onlyInStock, onlySale, searchFilter, sortBy, pageParams]);

  const hasActiveFilters = selectedCategories.length > 0 || selectedBrands.length > 0 || selectedConcerns.length > 0 || selectedPriceRange !== 'all' || onlyInStock || onlySale || searchFilter !== '';

  const filterProps = {
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
    onResetFilters: handleResetFilters
  };

  return (
    <div style={{ background: 'var(--color-bg-main)', minHeight: '80vh', paddingBottom: '5rem' }}>
      <div className="container">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[
          { label: 'Shop All', page: 'shop' },
          ...(pageParams.category ? [{ label: pageParams.category.toUpperCase() }] : []),
          ...(pageParams.brand ? [{ label: pageParams.brand }] : [])
        ]} />

        {/* Catalog Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '16px',
          paddingBottom: '24px',
          borderBottom: '1px solid var(--border-medium)',
          marginBottom: '24px'
        }}>
          <div>
            <span className="section-eyebrow" style={{ justifyContent: 'flex-start' }}>
              UAE BEAUTY CATALOG
            </span>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: 'var(--color-text-primary)' }}>
              {searchFilter ? `Search: "${searchFilter}"` : pageParams.category ? pageParams.category.toUpperCase() : pageParams.brand || 'Shop All Products'}
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              Showing {filteredProducts.length} curated luxury & drugstore essentials in AED
            </p>
          </div>

          {/* Sort & Mobile Filter Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="btn btn-secondary btn-sm mobile-filter-btn"
              style={{ display: 'none' }}
            >
              <SlidersHorizontal size={14} />
              <span>Filters ({filteredProducts.length})</span>
            </button>

            {/* Sort Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFFFFF', padding: '8px 14px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-medium)' }}>
              <ArrowUpDown size={14} style={{ color: 'var(--color-text-muted)' }} />
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-primary)', cursor: 'pointer' }}
              >
                <option value="featured">Featured UAE Selection</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              Active Filters:
            </span>
            {selectedCategories.map(c => (
              <span key={c} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', background: '#FFFFFF', border: '1px solid var(--border-medium)', padding: '4px 10px', borderRadius: 'var(--radius-pill)' }}>
                <span>Category: {c}</span>
                <X size={12} style={{ cursor: 'pointer' }} onClick={() => setSelectedCategories(selectedCategories.filter(i => i !== c))} />
              </span>
            ))}
            {selectedBrands.map(b => (
              <span key={b} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', background: '#FFFFFF', border: '1px solid var(--border-medium)', padding: '4px 10px', borderRadius: 'var(--radius-pill)' }}>
                <span>Brand: {b}</span>
                <X size={12} style={{ cursor: 'pointer' }} onClick={() => setSelectedBrands(selectedBrands.filter(i => i !== b))} />
              </span>
            ))}
            {selectedConcerns.map(cn => (
              <span key={cn} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', background: '#FFFFFF', border: '1px solid var(--border-medium)', padding: '4px 10px', borderRadius: 'var(--radius-pill)' }}>
                <span>Concern: {cn}</span>
                <X size={12} style={{ cursor: 'pointer' }} onClick={() => setSelectedConcerns(selectedConcerns.filter(i => i !== cn))} />
              </span>
            ))}
            {selectedPriceRange !== 'all' && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', background: '#FFFFFF', border: '1px solid var(--border-medium)', padding: '4px 10px', borderRadius: 'var(--radius-pill)' }}>
                <span>Price Filter</span>
                <X size={12} style={{ cursor: 'pointer' }} onClick={() => setSelectedPriceRange('all')} />
              </span>
            )}
            {onlySale && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', background: 'var(--color-sale-bg)', color: 'var(--color-sale)', border: '1px solid rgba(166,58,41,0.2)', padding: '4px 10px', borderRadius: 'var(--radius-pill)' }}>
                <span>On Sale</span>
                <X size={12} style={{ cursor: 'pointer' }} onClick={() => setOnlySale(false)} />
              </span>
            )}
            <button
              onClick={handleResetFilters}
              style={{ fontSize: '0.75rem', color: 'var(--color-gold-hover)', textDecoration: 'underline', fontWeight: 600, marginLeft: '8px' }}
            >
              Clear All
            </button>
          </div>
        )}

        {/* Layout Grid: Left Sidebar + Products Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '36px', alignItems: 'flex-start' }} className="catalog-layout">
          {/* Desktop Left Sidebar */}
          <div className="catalog-desktop-sidebar">
            <FilterSidebar {...filterProps} />
          </div>

          {/* Products Grid Area */}
          <div>
            {filteredProducts.length === 0 ? (
              <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xs)', padding: '60px 24px', textAlign: 'center' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--color-bg-sand)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
                  <RotateCcw size={24} />
                </div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>No matching products</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', marginBottom: '20px', maxWidth: '400px', margin: '0 auto 20px' }}>
                  We couldn't find any products matching your current filters. Try loosening your price or concern filters.
                </p>
                <button onClick={handleResetFilters} className="btn btn-primary btn-sm">
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '24px'
              }}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        totalResults={filteredProducts.length}
        {...filterProps}
      />
    </div>
  );
}
