import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import Breadcrumbs from '../components/common/Breadcrumbs';

export default function WishlistPage() {
  const { wishlist, productsList, toggleWishlist, addToCart, navigateTo, openProductDetail } = useShop();

  const savedProducts = productsList.filter(p => wishlist.includes(p.id));

  return (
    <div style={{ background: 'var(--color-bg-main)', minHeight: '80vh', paddingBottom: '6rem' }}>
      <div className="container">
        <Breadcrumbs items={[{ label: 'My Saved Wishlist' }]} />

        <div style={{ marginBottom: '2.5rem' }}>
          <span className="section-eyebrow" style={{ justifyContent: 'flex-start' }}>CURATED FAVORITES</span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: 'var(--color-text-primary)' }}>
            My Wishlist ({savedProducts.length} items)
          </h1>
        </div>

        {savedProducts.length === 0 ? (
          <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xs)', padding: '80px 24px', textAlign: 'center' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'var(--color-bg-sand)', margin: '0 auto 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
              <Heart size={30} />
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Your Wishlist is Empty</h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', marginBottom: '24px', maxWidth: '440px', margin: '0 auto 24px' }}>
              Save your beauty wishlist to track price reductions, restocks, and exclusive UAE promotional offers.
            </p>
            <button onClick={() => navigateTo('shop')} className="btn btn-primary">
              <span>Discover Best Sellers</span>
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '24px'
          }}>
            {savedProducts.map(product => (
              <div 
                key={product.id}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-xs)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative'
                }}
              >
                {/* Remove from Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-sale)',
                    border: '1px solid var(--border-light)',
                    zIndex: 5
                  }}
                  title="Remove from wishlist"
                >
                  <Trash2 size={15} />
                </button>

                <div 
                  style={{ width: '100%', height: '240px', background: '#F9F8F6', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', cursor: 'pointer' }}
                  onClick={() => openProductDetail(product)}
                >
                  <img 
                    src={product.images[0]} 
                    alt={product.title} 
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                  />
                </div>

                <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-gold)', textTransform: 'uppercase', fontWeight: 600 }}>
                    {product.brand}
                  </div>
                  <h3 
                    onClick={() => openProductDetail(product)}
                    style={{ fontSize: '0.94rem', fontWeight: 600, color: 'var(--color-text-primary)', margin: '4px 0 10px', lineHeight: 1.35, cursor: 'pointer', height: '2.7em', overflow: 'hidden' }}
                  >
                    {product.title}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      AED {product.priceAED}
                    </div>
                    <span style={{ fontSize: '0.74rem', color: 'var(--color-success)', fontWeight: 600 }}>
                      ● In Stock
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(product, 1);
                    }}
                    className="btn btn-primary btn-sm btn-block"
                    style={{ marginTop: 'auto' }}
                  >
                    <ShoppingBag size={14} />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
