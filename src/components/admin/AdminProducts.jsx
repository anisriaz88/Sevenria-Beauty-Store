import React, { useState } from 'react';
import { Plus, Search, Trash2, Eye, X } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CATEGORIES } from '../../data/categories';
import { BRANDS } from '../../data/brands';

export default function AdminProducts() {
  const { productsList, addAdminProduct, deleteAdminProduct, openProductDetail } = useShop();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product form state
  const [newProd, setNewProd] = useState({
    title: '',
    brand: 'COSRX',
    category: 'Skincare',
    subcategory: 'Serums & Essences',
    priceAED: 95,
    originalPriceAED: 120,
    discountPercent: 20,
    size: '100ml',
    description: '',
    stockCount: 30,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
  });

  const filteredProducts = productsList.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProd.title.trim()) return;

    addAdminProduct({
      ...newProd,
      priceAED: Number(newProd.priceAED),
      originalPriceAED: Number(newProd.originalPriceAED),
      discountPercent: Number(newProd.discountPercent),
      stockCount: Number(newProd.stockCount),
      images: [newProd.image]
    });

    setIsAddModalOpen(false);
    setNewProd({
      title: '',
      brand: 'COSRX',
      category: 'Skincare',
      subcategory: 'Serums & Essences',
      priceAED: 95,
      originalPriceAED: 120,
      discountPercent: 20,
      size: '100ml',
      description: '',
      stockCount: 30,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', flex: 1, maxWidth: '600px' }}>
          {/* Search Box */}
          <div style={{ display: 'flex', alignItems: 'center', background: '#FFFFFF', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', padding: '8px 14px', flex: 1, minWidth: '220px' }}>
            <Search size={16} style={{ color: 'var(--color-text-muted)' }} />
            <input 
              type="text" 
              placeholder="Filter products or brands..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              style={{ border: 'none', background: 'transparent', outline: 'none', paddingLeft: '8px', width: '100%', fontSize: '0.86rem' }} 
            />
          </div>

          {/* Category Selector */}
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ padding: '8px 14px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-medium)', background: '#FFFFFF', fontSize: '0.86rem' }}
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Add Product Button */}
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="btn btn-primary btn-sm"
        >
          <Plus size={16} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Products Table */}
      <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xs)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--color-bg-main)', borderBottom: '1px solid var(--border-medium)', color: 'var(--color-text-muted)', fontSize: '0.74rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px' }}>Product</th>
                <th style={{ padding: '12px' }}>Brand</th>
                <th style={{ padding: '12px' }}>Category</th>
                <th style={{ padding: '12px' }}>Price (AED)</th>
                <th style={{ padding: '12px' }}>Stock</th>
                <th style={{ padding: '12px' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img 
                        src={p.images[0]} 
                        alt={p.title} 
                        style={{ width: '42px', height: '42px', objectFit: 'contain', background: '#F8F7F4', border: '1px solid var(--border-light)', borderRadius: '4px' }} 
                      />
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{p.title}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{p.size || 'Standard'}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px', fontWeight: 600, color: 'var(--color-gold-hover)' }}>{p.brand}</td>
                  <td style={{ padding: '12px' }}>{p.category}</td>
                  <td style={{ padding: '12px', fontWeight: 700 }}>AED {p.priceAED}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ fontWeight: 600, color: p.stockCount < 20 ? 'var(--color-sale)' : 'inherit' }}>
                      {p.stockCount || 35} units
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span className="admin-badge-status status-delivered">
                      Active
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button 
                        onClick={() => openProductDetail(p)}
                        style={{ padding: '4px 8px', color: 'var(--color-text-secondary)', border: '1px solid var(--border-light)', borderRadius: '4px' }}
                        title="View Storefront PDP"
                      >
                        <Eye size={14} />
                      </button>
                      <button 
                        onClick={() => deleteAdminProduct(p.id)}
                        style={{ padding: '4px 8px', color: 'var(--color-sale)', border: '1px solid rgba(166, 58, 41, 0.2)', borderRadius: '4px' }}
                        title="Delete Product"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div 
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-sm)',
              maxWidth: '640px',
              width: '100%',
              padding: '2rem',
              position: 'relative',
              boxShadow: 'var(--shadow-lg)',
              animation: 'fadeIn 0.2s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsAddModalOpen(false)}
              style={{ position: 'absolute', top: '18px', right: '18px', color: 'var(--color-text-primary)' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '20px' }}>
              Add New Beauty Product
            </h3>

            <form onSubmit={handleCreateProduct} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Product Name *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Snail Peptide Radiant Eye Cream"
                  value={newProd.title} 
                  onChange={(e) => setNewProd({ ...newProd, title: e.target.value })} 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Brand *</label>
                <select 
                  className="form-input" 
                  value={newProd.brand} 
                  onChange={(e) => setNewProd({ ...newProd, brand: e.target.value })}
                >
                  {BRANDS.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Category *</label>
                <select 
                  className="form-input" 
                  value={newProd.category} 
                  onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                >
                  {CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Price (AED) *</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={newProd.priceAED} 
                  onChange={(e) => setNewProd({ ...newProd, priceAED: e.target.value })} 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Initial Stock Count *</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={newProd.stockCount} 
                  onChange={(e) => setNewProd({ ...newProd, stockCount: e.target.value })} 
                  required 
                />
              </div>

              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Short Description</label>
                <textarea 
                  className="form-input" 
                  rows={3} 
                  placeholder="Describe key ingredients, texture, and UAE climate benefits..." 
                  value={newProd.description} 
                  onChange={(e) => setNewProd({ ...newProd, description: e.target.value })} 
                />
              </div>

              <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save Product to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
