import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import ProductCard from '../common/ProductCard';

export default function NewArrivals() {
  const { productsList, navigateTo } = useShop();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter new arrivals: products marked isNew or newly curated drops
  const newProducts = productsList.filter(p => 
    p.isNew || 
    p.id.includes('arencia') || 
    p.id.includes('sevenria') || 
    p.id.includes('fino-premium-touch-hair-oil') ||
    p.id.includes('medicube') ||
    p.id.includes('anua')
  );

  const filteredProducts = selectedCategory === 'all'
    ? newProducts
    : newProducts.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section className="section-padding" style={{ background: '#FAF8F5', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', gap: '20px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-gold)', fontWeight: 700, fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '6px' }}>
              <Sparkles size={14} />
              <span>JUST ARRIVED IN DUBAI</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', margin: 0 }}>New Arrivals</h2>
            <p className="section-subtitle" style={{ margin: '8px 0 0' }}>
              Fresh formula drops, viral Korean innovations, and newly launched luxury scents.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {[
              { id: 'all', label: 'All New' },
              { id: 'skincare', label: 'Skincare' },
              { id: 'haircare', label: 'Haircare' },
              { id: 'fragrance', label: 'Fragrance' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  transition: 'all var(--transition-fast)',
                  border: selectedCategory === tab.id ? '1px solid var(--color-gold)' : '1px solid var(--border-medium)',
                  background: selectedCategory === tab.id ? 'var(--color-gold)' : '#FFFFFF',
                  color: selectedCategory === tab.id ? '#FFFFFF' : 'var(--color-text-secondary)',
                  cursor: 'pointer'
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
            onClick={() => navigateTo('shop', { filterType: 'new' })}
            className="btn btn-secondary"
          >
            <span>EXPLORE ALL NEW ARRIVALS ({newProducts.length})</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
