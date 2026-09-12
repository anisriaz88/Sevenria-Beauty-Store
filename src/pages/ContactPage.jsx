import React, { useState } from 'react';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ChevronDown, 
  CheckCircle2, 
  Send 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import Breadcrumbs from '../components/common/Breadcrumbs';

export default function ContactPage() {
  const { addToast } = useShop();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Order Status & Tracking',
    message: ''
  });

  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'How fast is delivery across Dubai and other Emirates?',
      a: 'We offer Next-Day delivery across Dubai and Abu Dhabi for orders placed before 3:00 PM. Northern Emirates (Sharjah, Ajman, RAK, Fujairah, UAQ) take 1-2 business days with temperature-controlled courier vans.'
    },
    {
      q: 'How does Free UAE Delivery work?',
      a: 'All orders with a subtotal of AED 150 or more automatically receive complimentary delivery. Orders under AED 150 incur a flat courier delivery fee of AED 20.'
    },
    {
      q: 'Are all products authentic and genuine?',
      a: '100% Guaranteed. Sevenria Beauty sources directly from certified brand headquarters, authorized Middle Eastern distributors, and verified laboratories in South Korea, Japan, France, and the USA.'
    },
    {
      q: 'Can I pay with Cash on Delivery (COD)?',
      a: 'Yes! We support Cash on Delivery, Apple Pay, Visa, and Mastercard.'
    },
    {
      q: 'What is your return policy?',
      a: 'We provide a 14-day hassle-free return window for any unopened, factory-sealed products. Contact our WhatsApp concierge and we will arrange a courier pickup.'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    addToast('Your inquiry has been submitted! Our Dubai team will respond shortly.');
  };

  return (
    <div style={{ background: 'var(--color-bg-main)', minHeight: '85vh', paddingBottom: '6rem' }}>
      <div className="container">
        <Breadcrumbs items={[{ label: 'Contact UAE Concierge' }]} />

        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem' }}>
          <span className="section-eyebrow">DUBAI CUSTOMER CARE</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '10px' }}>
            We’re Here To Assist You
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            Have a question regarding your order, product recommendations, or corporate gifting? Contact our dedicated UAE concierge team.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '3.5rem'
        }}>
          {/* WhatsApp */}
          <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xs)', padding: '24px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#EAF9EE', color: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
              <MessageCircle size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '6px' }}>WhatsApp Direct</h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--color-text-secondary)', marginBottom: '14px' }}>
              Instant beauty advice and order tracking 7 days a week.
            </p>
            <a 
              href="https://wa.me/971501234567" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ color: '#25D366', borderColor: '#25D366' }}
            >
              Chat on WhatsApp
            </a>
          </div>

          {/* Email */}
          <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xs)', padding: '24px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--color-gold-light)', color: 'var(--color-gold-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
              <Mail size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '6px' }}>Email Support</h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--color-text-secondary)', marginBottom: '14px' }}>
              care@sevenriabeauty.ae
            </p>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              Response within 2 hours
            </span>
          </div>

          {/* Office */}
          <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xs)', padding: '24px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--color-bg-sand)', color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
              <MapPin size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '6px' }}>Dubai Showroom</h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>
              Boulevard Plaza, Tower 1, Downtown Dubai, UAE
            </p>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              Mon - Sat: 9:00 AM - 8:00 PM
            </span>
          </div>
        </div>

        {/* 2-Column Split: Form (Left) & FAQs (Right) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'flex-start'
        }}>
          {/* Contact Form */}
          <div style={{ background: '#FFFFFF', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', padding: 'clamp(1.5rem, 4vw, 2.5rem)', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Send A Message</h2>

            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--color-success-bg)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <CheckCircle2 size={30} />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Message Received</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
                  Thank you for reaching out! A Sevenria Beauty specialist will reply within 2 hours.
                </p>
                <button onClick={() => setFormSubmitted(false)} className="btn btn-secondary btn-sm">
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      className="form-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">UAE Mobile</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="+971 50 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <select
                    className="form-input"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="Order Status & Tracking">Order Status & Courier Tracking</option>
                    <option value="Product Authenticity & Ingredients">Product Authenticity & Ingredients</option>
                    <option value="Returns & Exchanges">Returns & Exchanges</option>
                    <option value="Wholesale & Corporate Orders">Wholesale & Corporate Gifting</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea
                    rows={4}
                    className="form-input"
                    placeholder="How can our UAE team help you today?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '8px' }}>
                  <Send size={16} />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* FAQ Accordion */}
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-xs)',
                      overflow: 'hidden'
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px 20px',
                        textAlign: 'left',
                        fontSize: '0.94rem',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)'
                      }}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={16}
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'none',
                          transition: 'transform 0.2s ease',
                          color: 'var(--color-gold)'
                        }}
                      />
                    </button>

                    {isOpen && (
                      <div style={{ padding: '0 20px 16px', fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
