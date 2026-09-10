import React, { useState } from 'react';
import { Plus, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import ProductCard from '../common/ProductCard';

export default function ProductBundles({ currentProduct }) {
  const { productsList, addToCart } = useShop();

  // Find 2 bundle companion products in same category or complimentary
  const bundleCandidates = productsList.filter(p => p.id !== currentProduct.id && (p.category === currentProduct.category || p.concern === currentProduct.concern)).slice(0, 2);

  const [selectedBundleIds, setSelectedBundleIds] = useState([currentProduct.id, ...bundleCandidates.map(c => c.id)]);

  const toggleBundleItem = (id) => {
    if (selectedBundleIds.includes(id)) {
      if (selectedBundleIds.length > 1) {
        setSelectedBundleIds(prev => prev.filter(i => i !== id));
      }
    } else {
      setSelectedBundleIds(prev => [...prev, id]);
    }
  };

  const allBundleProducts = [currentProduct, ...bundleCandidates];
  const activeBundleProducts = allBundleProducts.filter(p => selectedBundleIds.includes(p.id));

  const bundleRawTotal = activeBundleProducts.reduce((acc, p) => acc + p.priceAED, 0);
  const bundleDiscountRate = activeBundleProducts.length >= 3 ? 0.15 : 0;
  const bundleFinalTotal = Math.round(bundleRawTotal * (1 - bundleDiscountRate));
  const bundleSavings = bundleRawTotal - bundleFinalTotal;

  const handleAddBundleToBag = () => {
    activeBundleProducts.forEach(p => {
      addToCart(p, 1);
    });
  };

  // Similar Products for "You May Also Like"
  const similarProducts = productsList.filter(p => p.id !== currentProduct.id && (p.category === currentProduct.category || p.brand === currentProduct.brand)).slice(0, 4);

  return (
    <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
      {/* 1. Frequently Bought Together */}
      {bundleCandidates.length >= 2 && (
        <div style={{
          background: 'var(--color-bg-ivory)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-xs)',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <span className="section-eyebrow">COMPLIMENTARY RITUAL</span>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 600 }}>
              Frequently Bought Together
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>
              Buy all 3 items together and receive an exclusive <strong>15% bundle discount</strong>.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '28px',
            alignItems: 'center'
          }}>
            {/* Items display */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px' }}>
              {allBundleProducts.map((p, idx) => {
                const isChecked = selectedBundleIds.includes(p.id);
                return (
                  <React.Fragment key={p.id}>
                    <div 
                      onClick={() => toggleBundleItem(p.id)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        background: '#FFFFFF',
                        border: isChecked ? '2px solid var(--color-gold)' : '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-xs)',
                        padding: '12px',
                        width: '120px',
                        cursor: 'pointer',
                        position: 'relative'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        style={{ position: 'absolute', top: '8px', left: '8px', accentColor: 'var(--color-gold)' }}
                      />
                      <img 
                        src={p.images[0]} 
                        alt={p.title} 
                        style={{ width: '70px', height: '70px', objectFit: 'contain' }}
                      />
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100px' }}>
                          {p.title}
                        </div>
                        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-gold-hover)' }}>
                          AED {p.priceAED}
                        </div>
                      </div>
                    </div>
                    {idx < allBundleProducts.length - 1 && (
                      <Plus size={18} style={{ color: 'var(--color-text-muted)' }} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Total Summary & Add Button */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-xs)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Bundle Price ({activeBundleProducts.length} items)
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                  AED {bundleFinalTotal}
                </span>
                {bundleSavings > 0 && (
                  <>
                    <span style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                      AED {bundleRawTotal}
                    </span>
                    <span className="badge badge-sale">Save AED {bundleSavings}</span>
                  </>
                )}
              </div>

              <button
                onClick={handleAddBundleToBag}
                className="btn btn-primary btn-block"
              >
                <ShoppingBag size={16} />
                <span>Add Selected ({activeBundleProducts.length}) to Bag</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. You May Also Like / Recommendations */}
      <div>
        <div className="section-header" style={{ alignItems: 'flex-start', textAlign: 'left', marginBottom: '1.8rem' }}>
          <span className="section-eyebrow">COMPLETE YOUR RITUAL</span>
          <h2>You May Also Like</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '20px'
        }}>
          {similarProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
