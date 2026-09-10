import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function QuickViewModal() {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    openProductDetail 
  } = useShop();

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [qty, setQty] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isLiked = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setQuickViewProduct(null);
  };

  const handleViewFull = () => {
    setQuickViewProduct(null);
    openProductDetail(product);
  };

  return (
    <div className="modal-overlay" onClick={() => setQuickViewProduct(null)}>
      <div 
        style={{
          background: '#FFFFFF',
          borderRadius: 'var(--radius-sm)',
          maxWidth: '840px',
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: 'var(--shadow-lg)',
          animation: 'fadeIn 0.25s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            color: 'var(--color-text-primary)'
          }}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {/* Product Gallery */}
          <div style={{ background: '#F9F8F6', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src={product.images[activeImgIdx] || product.images[0]} 
                alt={product.title} 
                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
              />
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px', overflowX: 'auto', maxWidth: '100%', padding: '4px' }}>
                {product.images.slice(0, 5).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIdx(idx)}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '4px',
                      border: activeImgIdx === idx ? '2px solid var(--color-gold)' : '1px solid var(--border-light)',
                      background: '#FFFFFF',
                      overflow: 'hidden',
                      padding: '2px'
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '6px' }}>
              {product.brand}
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1.25, marginBottom: '10px' }}>
              {product.title}
            </h2>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', marginBottom: '14px' }}>
              <div style={{ display: 'flex', color: '#D97706' }}>
                <Star size={14} fill="currentColor" />
              </div>
              <span style={{ fontWeight: 600 }}>{product.rating}</span>
              <span style={{ color: 'var(--color-text-muted)' }}>({product.reviewsCount} UAE reviews)</span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '18px' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                AED {product.priceAED}
              </span>
              {product.originalPriceAED && product.originalPriceAED > product.priceAED && (
                <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                  AED {product.originalPriceAED}
                </span>
              )}
              {product.discountPercent > 0 && (
                <span className="badge badge-sale">Save {product.discountPercent}%</span>
              )}
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
              {product.description}
            </p>

            {/* Quantity and Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)' }}>
                <button 
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  style={{ padding: '8px 14px', fontSize: '1.1rem', color: 'var(--color-text-primary)' }}
                >
                  -
                </button>
                <span style={{ padding: '8px 12px', fontSize: '0.9rem', fontWeight: 600 }}>{qty}</span>
                <button 
                  onClick={() => setQty(qty + 1)}
                  style={{ padding: '8px 14px', fontSize: '1.1rem', color: 'var(--color-text-primary)' }}
                >
                  +
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                <ShoppingBag size={16} />
                <span>Add to Bag</span>
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                style={{
                  width: '46px',
                  height: '46px',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-xs)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isLiked ? 'var(--color-sale)' : 'var(--color-text-primary)'
                }}
                aria-label="Wishlist"
              >
                <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* UAE Delivery Tag */}
            <div style={{ background: 'var(--color-gold-light)', border: '1px solid var(--color-gold-border)', borderRadius: 'var(--radius-xs)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--color-text-primary)', marginBottom: '16px' }}>
              <Truck size={16} style={{ color: 'var(--color-gold)' }} />
              <span>Next-Day Delivery available in Dubai & Abu Dhabi</span>
            </div>

            {/* View Full Product Link */}
            <button
              onClick={handleViewFull}
              style={{
                marginTop: 'auto',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: 'var(--color-gold-hover)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>View Complete Product Details & Ingredients</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
