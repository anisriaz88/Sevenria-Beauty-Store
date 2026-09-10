import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function Newsletter() {
  const { addToast } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }

    setSubscribed(true);
    addToast('Welcome to Sevenria Privé! Check your email for your 10% code.');
    setEmail('');
  };

  return (
    <section style={{ background: 'var(--color-bg-sand)', padding: 'clamp(3.5rem, 6vw, 5.5rem) 0' }}>
      <div className="container">
        <div style={{
          maxWidth: '680px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: '#FFFFFF',
            color: 'var(--color-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <Mail size={22} />
          </div>

          <span className="section-eyebrow">SEVENRIA PRIVÉ</span>

          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: 'var(--color-text-primary)', marginBottom: '12px' }}>
            Beauty, Delivered To Your Inbox
          </h2>

          <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '28px' }}>
            Discover new arrivals, beauty inspiration and exclusive offers curated for your skin and hair in the UAE. Receive <strong>10% off</strong> your first order.
          </p>

          {subscribed ? (
            <div style={{
              background: '#FFFFFF',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-xs)',
              padding: '16px 24px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              color: 'var(--color-success)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <CheckCircle2 size={20} />
              <span style={{ fontSize: '0.92rem', fontWeight: 600 }}>
                Thank you! Use promo code <strong>WELCOME10</strong> at checkout.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '500px', margin: '0 auto' }}>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  style={{
                    flex: '1 1 280px',
                    borderRadius: 'var(--radius-xs)',
                    padding: '14px 18px',
                    background: '#FFFFFF'
                  }}
                  required
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: '0 0 auto', padding: '14px 28px' }}
                >
                  <span>SUBSCRIBE</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                By subscribing, you agree to receive Sevenria Beauty UAE updates. Unsubscribe anytime.
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
