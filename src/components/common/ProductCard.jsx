import React, { useState } from 'react';
import { Star, Heart, ShoppingBag, Eye, Check, Zap } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function ProductCard({ product }) {
  const { 
    openProductDetail, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewProduct 
  } = useShop();

  const [isAdded, setIsAdded] = useState(false);
  const isLiked = isInWishlist(product.id);

  const handleFastAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  // Stock urgency mock
  const isLowStock = product.stockCount && product.stockCount < 10;

  return (
    <div className="product-card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="product-image-wrap">
        {/* Dynamic Badges */}
        <div className="product-badges">
          {product.discountPercent > 0 && (
            <span className="badge badge-sale" style={{ fontWeight: 800 }}>
              -{product.discountPercent}%
            </span>
          )}
          {product.isBestSeller && (
            <span className="badge badge-gold" style={{ fontSize: '0.62rem', fontWeight: 700 }}>
              UAE TOP PICK
            </span>
          )}
          {product.isNew && !product.discountPercent && (
            <span className="badge badge-new">
              NEW
            </span>
          )}
          {product.badge && !product.isBestSeller && product.discountPercent === 0 && (
            <span className="badge badge-neutral">
              {product.badge}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`product-wishlist-btn ${isLiked ? 'active' : ''}`}
          aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
        </button>

        {/* Product Image */}
        <img 
          src={product.images[0]} 
          alt={product.title} 
          className="product-img"
          loading="lazy"
          onClick={() => openProductDetail(product)}
          style={{ cursor: 'pointer' }}
        />

        {/* Quick Actions overlay on hover */}
        <div className="product-quick-actions">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="btn btn-secondary btn-sm"
            style={{ flex: 1, padding: '8px 10px', fontSize: '0.72rem', background: '#FFFFFF' }}
          >
            <Eye size={14} />
            <span>Quick View</span>
          </button>
          <button
            type="button"
            onClick={handleFastAdd}
            className={`btn btn-sm ${isAdded ? 'btn-gold' : 'btn-primary'}`}
            style={{ flex: 1.3, padding: '8px 10px', fontSize: '0.72rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}
          >
            {isAdded ? (
              <>
                <Check size={14} />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Content */}
      <div className="product-content" style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <span className="product-brand">{product.brand}</span>
          {isLowStock && (
            <span style={{ fontSize: '0.65rem', color: '#E11D48', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>
              <Zap size={11} fill="#E11D48" /> Only {product.stockCount} left
            </span>
          )}
        </div>

        <h3 
          className="product-title" 
          onClick={() => openProductDetail(product)}
          style={{ cursor: 'pointer' }}
          title={product.title}
        >
          {product.title}
        </h3>

        {/* Rating */}
        <div className="product-rating">
          <div style={{ display: 'flex', alignItems: 'center', color: '#D97706' }}>
            <Star size={13} fill="currentColor" />
          </div>
          <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{product.rating}</span>
          <span style={{ color: 'var(--color-text-muted)' }}>({product.reviewsCount})</span>
        </div>

        {/* Price Row */}
        <div className="product-price-row" style={{ marginTop: 'auto', paddingTop: '8px' }}>
          <span className="product-price">AED {product.priceAED}</span>
          {product.originalPriceAED && product.originalPriceAED > product.priceAED && (
            <span className="product-price-original">AED {product.originalPriceAED}</span>
          )}
          {product.discountPercent > 0 && (
            <span className="product-discount-tag">Save {product.discountPercent}%</span>
          )}
        </div>

        {/* Mobile-visible quick add button */}
        <button
          type="button"
          onClick={handleFastAdd}
          className={`btn btn-sm btn-block ${isAdded ? 'btn-gold' : 'btn-primary'}`}
          style={{ marginTop: '12px' }}
        >
          {isAdded ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Check size={14} /> Added to Bag
            </span>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <ShoppingBag size={14} /> Add to Bag
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
