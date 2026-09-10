import React from 'react';
import { Home, Compass, Heart, ShoppingBag, User } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function MobileBottomNav() {
  const { activePage, navigateTo, cartCount, wishlist, setIsCartOpen } = useShop();

  return (
    <nav className="mobile-bottom-bar" aria-label="Mobile Navigation">
      <button 
        onClick={() => navigateTo('home')}
        className={`mobile-nav-btn ${activePage === 'home' ? 'active' : ''}`}
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      <button 
        onClick={() => navigateTo('shop')}
        className={`mobile-nav-btn ${activePage === 'shop' ? 'active' : ''}`}
      >
        <Compass size={20} />
        <span>Shop</span>
      </button>

      <button 
        onClick={() => navigateTo('wishlist')}
        className={`mobile-nav-btn ${activePage === 'wishlist' ? 'active' : ''}`}
      >
        <Heart size={20} />
        {wishlist.length > 0 && (
          <span 
            style={{
              position: 'absolute',
              top: '2px',
              right: '12px',
              background: 'var(--color-sale)',
              color: '#FFFFFF',
              fontSize: '0.6rem',
              width: '15px',
              height: '15px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700
            }}
          >
            {wishlist.length}
          </span>
        )}
        <span>Wishlist</span>
      </button>

      <button 
        onClick={() => setIsCartOpen(true)}
        className="mobile-nav-btn"
      >
        <ShoppingBag size={20} />
        {cartCount > 0 && (
          <span 
            style={{
              position: 'absolute',
              top: '2px',
              right: '12px',
              background: 'var(--color-gold)',
              color: '#FFFFFF',
              fontSize: '0.6rem',
              width: '15px',
              height: '15px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700
            }}
          >
            {cartCount}
          </span>
        )}
        <span>Bag</span>
      </button>

      <button 
        onClick={() => navigateTo('account')}
        className={`mobile-nav-btn ${activePage === 'account' ? 'active' : ''}`}
      >
        <User size={20} />
        <span>Account</span>
      </button>
    </nav>
  );
}
