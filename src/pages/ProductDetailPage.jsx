import React, { useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import ProductTabs from '../components/product/ProductTabs';
import ProductBundles from '../components/product/ProductBundles';
import { ShoppingBag } from 'lucide-react';

export default function ProductDetailPage() {
  const { activeProduct, addToCart, navigateTo } = useShop();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeProduct]);

  if (!activeProduct) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <button onClick={() => navigateTo('shop')} className="btn btn-primary" style={{ marginTop: '16px' }}>
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--color-bg-main)', minHeight: '90vh', paddingBottom: '6rem' }}>
      <div className="container">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[
          { label: 'Shop', page: 'shop' },
          { label: activeProduct.category, page: 'shop', params: { category: activeProduct.category.toLowerCase() } },
          { label: activeProduct.title }
        ]} />

        {/* Top Split: Gallery (Left) & Info (Right) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'clamp(2rem, 5vw, 4.5rem)',
          alignItems: 'flex-start'
        }}>
          {/* Left: Gallery with Zoom */}
          <div>
            <ProductGallery images={activeProduct.images} title={activeProduct.title} />
          </div>

          {/* Right: Info & Purchase Controls */}
          <div>
            <ProductInfo product={activeProduct} />
          </div>
        </div>

        {/* Detailed Tabs / Accordions */}
        <ProductTabs product={activeProduct} />

        {/* Frequently Bought Together & You May Also Like */}
        <ProductBundles currentProduct={activeProduct} />
      </div>

      {/* Sticky Mobile Purchase Bar */}
      <div 
        className="sticky-mobile-pdp-bar"
        style={{
          display: 'none',
          position: 'fixed',
          bottom: '56px', // above bottom nav
          left: 0,
          right: 0,
          background: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid var(--border-medium)',
          padding: '10px 16px',
          zIndex: 89,
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <div style={{ fontSize: '0.72rem', color: 'var(--color-gold-hover)', fontWeight: 600 }}>{activeProduct.brand}</div>
          <div style={{ fontSize: '1rem', fontWeight: 800 }}>AED {activeProduct.priceAED}</div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => addToCart(activeProduct, 1)}
            className="btn btn-primary btn-sm"
          >
            <ShoppingBag size={14} />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
}
