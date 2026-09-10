import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import ProductCard from '../common/ProductCard';

export default function BestSellers() {
  const { productsList, navigateTo } = useShop();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const bestSellerProducts = productsList.filter(p => p.isBestSeller);

  const filteredProducts = selectedFilter === 'all'
    ? bestSellerProducts
    : bestSellerProducts.filter(p => p.category.toLowerCase() === selectedFilter.toLowerCase());

  return (
    <section className="section-padding" style={{ background: '#FFFFFF', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', gap: '20px' }}>
          <div>
            <span className="section-eyebrow">MOST LOVED IN THE UAE</span>
            <h2>Best Sellers</h2>
            <p className="section-subtitle" style={{ margin: '8px 0 0' }}>
              The products UAE beauty enthusiasts reorder time and time again.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {[
              { id: 'all', label: 'All Best Sellers' },
              { id: 'skincare', label: 'Skincare' },
              { id: 'haircare', label: 'Haircare' },
              { id: 'makeup', label: 'Makeup' },
              { id: 'fragrance', label: 'Fragrance' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  transition: 'all var(--transition-fast)',
                  border: selectedFilter === tab.id ? '1px solid var(--color-gold)' : '1px solid var(--border-medium)',
                  background: selectedFilter === tab.id ? 'var(--color-gold)' : '#FFFFFF',
                  color: selectedFilter === tab.id ? '#FFFFFF' : 'var(--color-text-secondary)'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '24px'
        }}>
          {filteredProducts.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button 
            onClick={() => navigateTo('shop', { filterType: 'bestseller' })}
            className="btn btn-secondary"
          >
            <span>VIEW ALL BEST SELLERS ({bestSellerProducts.length})</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
