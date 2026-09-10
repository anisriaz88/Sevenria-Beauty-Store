import React from 'react';
import { useShop } from '../../context/ShopContext';

const STORY_ITEMS = [
  {
    id: 'flash',
    title: 'Flash Deals',
    badge: 'HOT',
    isPromo: true,
    image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=240&q=80',
    action: { page: 'offers' }
  },
  {
    id: 'k-beauty',
    title: 'K-Beauty Viral',
    badge: 'TRENDING',
    isPromo: false,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=240&q=80',
    action: { page: 'shop', params: { category: 'skincare' } }
  },
  {
    id: 'j-haircare',
    title: 'J-Hair Staples',
    badge: 'VIRAL',
    isPromo: false,
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=240&q=80',
    action: { page: 'shop', params: { category: 'haircare' } }
  },
  {
    id: 'bogo',
    title: 'Buy 1 Get 1',
    badge: '50% OFF',
    isPromo: true,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=240&q=80',
    action: { page: 'offers' }
  },
  {
    id: 'oud',
    title: 'Arabian Oud',
    badge: 'LUXURY',
    isPromo: false,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=240&q=80',
    action: { page: 'shop', params: { category: 'fragrance' } }
  },
  {
    id: 'sun',
    title: 'Sun & SPF',
    badge: 'SPF 50+',
    isPromo: false,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=240&q=80',
    action: { page: 'shop', params: { search: 'protection' } }
  },
  {
    id: 'makeup',
    title: 'Viral Lip & Glow',
    badge: 'NEW',
    isPromo: false,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=240&q=80',
    action: { page: 'shop', params: { category: 'makeup' } }
  },
  {
    id: 'under75',
    title: 'Under AED 75',
    badge: 'VALUE',
    isPromo: false,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=240&q=80',
    action: { page: 'offers' }
  }
];

export default function CategoryStoryCircles() {
  const { navigateTo } = useShop();

  return (
    <div className="story-circles-wrap">
      <div className="container">
        <div className="story-circles-list">
          {STORY_ITEMS.map((item) => (
            <button
              key={item.id}
              className="story-circle-item"
              onClick={() => navigateTo(item.action.page, item.action.params || {})}
            >
              <div className={`story-circle-ring ${item.isPromo ? 'promo-ring' : ''}`}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="story-circle-img" 
                  loading="lazy" 
                />
                {item.badge && (
                  <span className={`story-circle-badge ${item.isPromo ? 'badge-hot' : ''}`}>
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="story-circle-title">{item.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
