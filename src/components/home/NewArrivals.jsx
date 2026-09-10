import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import ProductCard from '../common/ProductCard';

export default function NewArrivals() {
  const { productsList, navigateTo } = useShop();

  const newProducts = productsList.filter(p => p.isNew || p.id.includes('arencia') || p.id.includes('sevenria') || p.id.includes('fino-premium-touch-hair-oil'));

  return (
    <section className="section-padding" style={{ background: '#FFFFFF', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', gap: '20px' }}>
          <div>
            <span className="section-eyebrow">JUST ARRIVED IN DUBAI</span>
            <h2>Just In</h2>
            <p className="section-subtitle" style={{ margin: '8px 0 0' }}>
              Fresh formula drops, viral Korean innovations, and newly launched luxury scents.
            </p>
          </div>

          <button 
            onClick={() => navigateTo('shop', { filterType: 'new' })}
            className="btn btn-secondary btn-sm"
          >
            <span>EXPLORE ALL NEW ARRIVALS</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Product Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '24px'
        }}>
          {newProducts.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
