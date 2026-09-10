import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  User, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronRight
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import MegaMenu from './MegaMenu';

export default function Header() {
  const { 
    activePage, 
    navigateTo, 
    cartCount, 
    wishlist, 
    setIsCartOpen, 
    setIsMobileNavOpen,
    productsList,
    openProductDetail
  } = useShop();

  const [query, setQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef(null);

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = query.trim() === '' 
    ? [] 
    : productsList.filter(p => 
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        (p.concern && p.concern.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 5);

  const handleSelectProduct = (product) => {
    setIsSearchFocused(false);
    setQuery('');
    openProductDetail(product);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setIsSearchFocused(false);
      navigateTo('shop', { search: query });
    }
  };

  return (
    <header className="header-wrapper">
      <div className="container">
        <div className="main-header">
          {/* Mobile Hamburger Menu */}
          <button 
            className="mobile-menu-trigger" 
            onClick={() => setIsMobileNavOpen(true)}
            aria-label="Open Navigation Menu"
            style={{ display: 'flex', alignItems: 'center', padding: '6px', color: 'var(--color-text-primary)' }}
          >
            <Menu size={24} />
          </button>

          {/* Store Logo */}
          <button 
            onClick={() => navigateTo('home')} 
            className="logo-link"
            style={{ textAlign: 'left' }}
          >
            <span className="logo-text">SEVENRIA</span>
            <span className="logo-subtext">BEAUTY • DUBAI</span>
          </button>

          {/* Large Center Search Bar */}
          <div className="search-container" ref={searchContainerRef}>
            <form onSubmit={handleSearchSubmit}>
              <div className="search-input-wrap">
                <Search size={18} style={{ color: 'var(--color-text-muted)' }} />
                <input 
                  type="text"
                  placeholder="Search luxury skincare, haircare, fragrances, brands..."
                  className="search-input"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setIsSearchFocused(true);
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                />
                {query && (
                  <button 
                    type="button" 
                    onClick={() => setQuery('')}
                    style={{ color: 'var(--color-text-muted)', padding: '2px 4px' }}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </form>

            {/* Live Dropdown Results */}
            {isSearchFocused && (
              <div className="search-dropdown">
                {query.trim() === '' ? (
                  <div>
                    <div style={{ fontSize: '0.74rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '10px' }}>
                      POPULAR SEARCHES IN UAE
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {['COSRX Snail Mucin', 'Fino Hair Mask', 'Anua Heartleaf', 'Arencia Cleanser', 'Medicube Pads', 'Royal Amber Oud', 'Skala Mais Cachos'].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            setQuery(tag);
                            navigateTo('shop', { search: tag });
                            setIsSearchFocused(false);
                          }}
                          style={{
                            fontSize: '0.78rem',
                            padding: '6px 12px',
                            background: 'var(--color-bg-sand)',
                            borderRadius: 'var(--radius-pill)',
                            color: 'var(--color-text-primary)'
                          }}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div>
                    <div style={{ fontSize: '0.74rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '12px' }}>
                      MATCHING PRODUCTS ({searchResults.length})
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {searchResults.map(product => (
                        <div 
                          key={product.id}
                          onClick={() => handleSelectProduct(product)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '8px',
                            borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer',
                            transition: 'background-color 0.15s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bg-main)'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <img 
                            src={product.images[0]} 
                            alt={product.title} 
                            style={{ width: '48px', height: '48px', objectFit: 'contain', background: '#FFFFFF', borderRadius: '4px', border: '1px solid var(--border-light)' }} 
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: '0.7rem', color: 'var(--color-gold)', textTransform: 'uppercase', fontWeight: 600 }}>
                              {product.brand}
                            </div>
                            <div style={{ fontSize: '0.86rem', fontWeight: 500, color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {product.title}
                            </div>
                            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-primary)', marginTop: '2px' }}>
                              AED {product.priceAED}
                            </div>
                          </div>
                          <ChevronRight size={16} style={{ color: 'var(--color-text-muted)' }} />
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      style={{
                        width: '100%',
                        marginTop: '12px',
                        padding: '10px',
                        textAlign: 'center',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        background: 'var(--color-bg-dark)',
                        color: '#FFFFFF',
                        borderRadius: 'var(--radius-xs)',
                        textTransform: 'uppercase'
                      }}
                    >
                      View All Results for "{query}"
                    </button>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '24px 12px' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                      No exact matches found for "{query}"
                    </p>
                    <button 
                      type="button"
                      onClick={() => {
                        setQuery('');
                        setIsSearchFocused(false);
                        navigateTo('shop');
                      }}
                      className="btn btn-secondary btn-sm"
                    >
                      Browse Entire UAE Catalog
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="header-actions">
            {/* Account */}
            <button 
              onClick={() => navigateTo('account')}
              className="header-icon-btn"
              title="My UAE Account & Orders"
              aria-label="Account"
            >
              <User size={21} />
            </button>

            {/* Wishlist */}
            <button 
              onClick={() => navigateTo('wishlist')}
              className="header-icon-btn"
              title="My Wishlist"
              aria-label="Wishlist"
            >
              <Heart size={21} />
              {wishlist.length > 0 && (
                <span className="header-badge-count">{wishlist.length}</span>
              )}
            </button>

            {/* Shopping Bag */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="header-icon-btn"
              title="Shopping Bag"
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={21} />
              {cartCount > 0 && (
                <span className="header-badge-count" style={{ background: 'var(--color-gold)' }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Mega Menu Navigation Bar */}
        <MegaMenu />
      </div>
    </header>
  );
}
