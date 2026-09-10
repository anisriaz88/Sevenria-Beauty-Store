import React from 'react';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  CreditCard,
  ArrowRight
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function Footer() {
  const { navigateTo } = useShop();

  return (
    <footer style={{ background: 'var(--color-bg-dark)', color: '#FFFFFF', borderTop: '1px solid #282828', marginTop: 'auto' }}>
      {/* Top Value Badges Bar */}
      <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '28px 0' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
            gap: '20px',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(184, 147, 88, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)' }}>
                <Truck size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.86rem', fontWeight: 600, color: '#FFFFFF' }}>Fast UAE Delivery</div>
                <div style={{ fontSize: '0.75rem', color: '#999999' }}>Free on orders over AED 150</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(184, 147, 88, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)' }}>
                <ShieldCheck size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.86rem', fontWeight: 600, color: '#FFFFFF' }}>100% Authentic Guaranteed</div>
                <div style={{ fontSize: '0.75rem', color: '#999999' }}>Sourced direct from official brands</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(184, 147, 88, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)' }}>
                <RefreshCw size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.86rem', fontWeight: 600, color: '#FFFFFF' }}>14-Day Easy Returns</div>
                <div style={{ fontSize: '0.75rem', color: '#999999' }}>Hassle-free UAE return policy</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(184, 147, 88, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)' }}>
                <MessageCircle size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.86rem', fontWeight: 600, color: '#FFFFFF' }}>UAE Concierge Support</div>
                <div style={{ fontSize: '0.75rem', color: '#999999' }}>Direct WhatsApp care 7 days a week</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container" style={{ padding: '60px 0 40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '40px'
        }}>
          {/* Brand Info */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', fontWeight: 700, letterSpacing: '0.04em', color: '#FFFFFF' }}>
              SEVENRIA
            </div>
            <div style={{ fontSize: '0.62rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--color-gold)', margin: '4px 0 16px', fontWeight: 600 }}>
              BEAUTY • DUBAI
            </div>
            <p style={{ fontSize: '0.86rem', color: '#A0A0A0', lineHeight: 1.6, marginBottom: '20px' }}>
              The UAE’s premier destination for curated skincare, luxury fragrances, and high-performance beauty essentials.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="#instagram" aria-label="Instagram" style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#252525', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#facebook" aria-label="Facebook" style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#252525', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#twitter" aria-label="X / Twitter" style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#252525', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l16 16m0-16L4 20"/></svg>
              </a>
            </div>
          </div>

          {/* SHOP Column */}
          <div>
            <h4 style={{ fontSize: '0.82rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '18px' }}>
              SHOP
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <button onClick={() => navigateTo('shop', { filterType: 'new' })} style={{ color: '#C0C0C0', fontSize: '0.88rem' }}>
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { filterType: 'bestseller' })} style={{ color: '#C0C0C0', fontSize: '0.88rem' }}>
                  Best Sellers
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { category: 'skincare' })} style={{ color: '#C0C0C0', fontSize: '0.88rem' }}>
                  Skincare
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { category: 'haircare' })} style={{ color: '#C0C0C0', fontSize: '0.88rem' }}>
                  Haircare
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { category: 'makeup' })} style={{ color: '#C0C0C0', fontSize: '0.88rem' }}>
                  Makeup
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { category: 'fragrance' })} style={{ color: '#C0C0C0', fontSize: '0.88rem' }}>
                  Fragrance
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('offers')} style={{ color: 'var(--color-sale)', fontSize: '0.88rem', fontWeight: 600 }}>
                  Special Offers
                </button>
              </li>
            </ul>
          </div>

          {/* HELP Column */}
          <div>
            <h4 style={{ fontSize: '0.82rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '18px' }}>
              HELP & ORDERS
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <button onClick={() => navigateTo('contact')} style={{ color: '#C0C0C0', fontSize: '0.88rem' }}>
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} style={{ color: '#C0C0C0', fontSize: '0.88rem' }}>
                  Track Order
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} style={{ color: '#C0C0C0', fontSize: '0.88rem' }}>
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} style={{ color: '#C0C0C0', fontSize: '0.88rem' }}>
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} style={{ color: '#C0C0C0', fontSize: '0.88rem' }}>
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* ABOUT Column */}
          <div>
            <h4 style={{ fontSize: '0.82rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '18px' }}>
              ABOUT SEVENRIA
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <button onClick={() => navigateTo('contact')} style={{ color: '#C0C0C0', fontSize: '0.88rem' }}>
                  Our Dubai Story
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('brands')} style={{ color: '#C0C0C0', fontSize: '0.88rem' }}>
                  Brand Directory
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} style={{ color: '#C0C0C0', fontSize: '0.88rem' }}>
                  100% Authentic Guarantee
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} style={{ color: '#C0C0C0', fontSize: '0.88rem' }}>
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} style={{ color: '#C0C0C0', fontSize: '0.88rem' }}>
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* SUPPORT Column */}
          <div>
            <h4 style={{ fontSize: '0.82rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '18px' }}>
              UAE CONCIERGE
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.86rem', color: '#C0C0C0' }}>
              <a 
                href="https://wa.me/971501234567" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#25D366', fontWeight: 600 }}
              >
                <MessageCircle size={18} />
                <span>WhatsApp: +971 50 123 4567</span>
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={18} style={{ color: 'var(--color-gold)' }} />
                <span>care@sevenriabeauty.ae</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={18} style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: '2px' }} />
                <span>Downtown Dubai, Boulevard Plaza Tower 1, UAE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Currency, Payment Badges & Copyright */}
      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', padding: '24px 0', background: '#0D0D0D' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.8rem', color: '#888888', flexWrap: 'wrap' }}>
            <span>© {new Date().getFullYear()} SEVENRIA BEAUTY LLC. All Rights Reserved.</span>
            <span>•</span>
            <span style={{ color: 'var(--color-gold)' }}>United Arab Emirates (AED)</span>
            <span>•</span>
            <button
              onClick={() => navigateTo('admin')}
              style={{
                color: '#666666',
                fontSize: '0.75rem',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-gold)'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}
              title="Sevenria Merchant Portal (/admin)"
            >
              Merchant Portal
            </button>
          </div>

          {/* Payment Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {['Apple Pay', 'Visa', 'Mastercard', 'Tabby (4x)', 'Tamara', 'Cash on Delivery'].map((m) => (
              <span
                key={m}
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  padding: '4px 8px',
                  background: '#1F1F1F',
                  border: '1px solid #333333',
                  borderRadius: '3px',
                  color: '#D0D0D0'
                }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
