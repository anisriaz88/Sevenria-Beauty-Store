import React, { useState } from 'react';
import { Star, Heart, ShoppingBag, Zap, Truck, ShieldCheck, RefreshCw, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function ProductInfo({ product }) {
  const { addToCart, toggleWishlist, isInWishlist, navigateTo } = useShop();
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.size || 'Standard');

  const isLiked = isInWishlist(product.id);
  const tabbyInstallment = Math.round((product.priceAED / 4) * 10) / 10;

  const handleAddToCart = () => {
    addToCart(product, qty, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(product, qty, selectedSize);
    navigateTo('checkout');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Brand & Category */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <button
            onClick={() => navigateTo('shop', { brand: product.brand })}
            style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
              cursor: 'pointer'
            }}
          >
            {product.brand}
          </button>

          {/* Stock Status Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: 'var(--color-success)', fontWeight: 600 }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-success)' }} />
            <span>In Stock (Dubai Warehouse)</span>
          </div>
        </div>

        <h1 style={{ fontSize: 'clamp(1.7rem, 2.5vw, 2.3rem)', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1.25 }}>
          {product.title}
        </h1>

        {/* Rating and Reviews */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
          <div style={{ display: 'flex', color: '#D97706' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={15} fill="currentColor" />
            ))}
          </div>
          <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>{product.rating}</span>
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem' }}>
            ({product.reviewsCount} Verified UAE Reviews)
          </span>
        </div>
      </div>

      {/* Price & Installments */}
      <div style={{ padding: '16px', background: '#F9F8F6', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
          <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
            AED {product.priceAED}
          </span>
          {product.originalPriceAED && product.originalPriceAED > product.priceAED && (
            <span style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
              AED {product.originalPriceAED}
            </span>
          )}
          {product.discountPercent > 0 && (
            <span className="badge badge-sale">
              SAVE {product.discountPercent}%
            </span>
          )}
        </div>
        <div style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
          VAT included (5%). Free UAE delivery applies on orders over AED 150.
        </div>

        {/* Tabby / Tamara Installment Callout */}
        <div style={{
          marginTop: '12px',
          paddingTop: '12px',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.82rem',
          color: 'var(--color-text-secondary)'
        }}>
          <span style={{ background: '#3EED82', color: '#000000', fontWeight: 800, padding: '2px 6px', borderRadius: '3px', fontSize: '0.65rem' }}>
            tabby
          </span>
          <span>
            or 4 interest-free payments of <strong>AED {tabbyInstallment}</strong>
          </span>
        </div>
      </div>

      {/* Short Description */}
      <p style={{ fontSize: '0.94rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
        {product.description}
      </p>

      {/* Size / Variant Selector */}
      {product.size && (
        <div>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
            Selected Size: <span style={{ color: 'var(--color-gold-hover)' }}>{selectedSize}</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[product.size, 'Full Luxury Size'].map((sz) => (
              <button
                key={sz}
                onClick={() => setSelectedSize(sz)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  border: selectedSize === sz ? '2px solid var(--color-gold)' : '1px solid var(--border-medium)',
                  background: selectedSize === sz ? 'var(--color-gold-light)' : '#FFFFFF',
                  color: 'var(--color-text-primary)'
                }}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity & CTA Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          {/* Quantity Stepper */}
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', background: '#FFFFFF' }}>
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              style={{ padding: '12px 18px', fontSize: '1.2rem', color: 'var(--color-text-primary)' }}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span style={{ padding: '12px 14px', fontSize: '0.95rem', fontWeight: 700 }}>
              {qty}
            </span>
            <button
              onClick={() => setQty(qty + 1)}
              style={{ padding: '12px 18px', fontSize: '1.2rem', color: 'var(--color-text-primary)' }}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Add to Bag Button */}
          <button
            onClick={handleAddToCart}
            className="btn btn-primary"
            style={{ flex: 1 }}
          >
            <ShoppingBag size={18} />
            <span>ADD TO BAG</span>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(product)}
            style={{
              width: '52px',
              height: '52px',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-xs)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#FFFFFF',
              color: isLiked ? 'var(--color-sale)' : 'var(--color-text-primary)'
            }}
            aria-label="Wishlist"
          >
            <Heart size={22} fill={isLiked ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Buy Now Button */}
        <button
          onClick={handleBuyNow}
          className="btn btn-gold btn-block"
        >
          <Zap size={16} />
          <span>BUY NOW (EXPRESS CHECKOUT)</span>
        </button>
      </div>

      {/* UAE Delivery & Authenticity Perks */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '18px',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-xs)',
        background: '#FFFFFF'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.84rem' }}>
          <Truck size={18} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
          <span><strong>Fast UAE Delivery:</strong> Next day in Dubai & Abu Dhabi (Order within 3 hrs)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.84rem' }}>
          <ShieldCheck size={18} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
          <span><strong>100% Authentic Guaranteed:</strong> Directly sourced from certified distributors</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.84rem' }}>
          <RefreshCw size={18} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
          <span><strong>Cash on Delivery & Tabby:</strong> Flexible UAE payment options</span>
        </div>
      </div>
    </div>
  );
}
