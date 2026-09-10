import React, { useState } from 'react';
import { 
  Check, 
  CreditCard, 
  Truck, 
  Lock, 
  ArrowRight, 
  ArrowLeft,
  Banknote,
  Smartphone
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function CheckoutWizard() {
  const { placeOrder, cartTotal } = useShop();

  const [currentStep, setCurrentStep] = useState(1);

  // Form Fields State
  const [formData, setFormData] = useState({
    // Step 1: Info
    fullName: 'Fatima Al-Mansoor',
    email: 'fatima.mansoor@example.com',
    phone: '+971 50 829 1142',
    // Step 2: Delivery
    emirate: 'Dubai',
    area: 'Dubai Marina',
    building: 'Marina Gate 2',
    address: 'Al Marsa Street, Tower 2, Apt 2804',
    instructions: 'Please call mobile upon arrival. Concierge has access.',
    // Step 3: Payment
    paymentMethod: 'Credit Card', // 'Credit Card' | 'Apple Pay' | 'Cash on Delivery' | 'Tabby'
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '08/28',
    cardCvv: '•••'
  });

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(4, prev + 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    placeOrder(formData);
  };

  const steps = [
    { num: 1, label: 'Information' },
    { num: 2, label: 'UAE Delivery' },
    { num: 3, label: 'Payment Method' },
    { num: 4, label: 'Review & Confirm' }
  ];

  const EMIRATES = [
    'Dubai',
    'Abu Dhabi',
    'Sharjah',
    'Ajman',
    'Ras Al Khaimah',
    'Fujairah',
    'Umm Al Quwain'
  ];

  return (
    <div style={{ background: '#FFFFFF', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', padding: 'clamp(1.5rem, 4vw, 2.5rem)', boxShadow: 'var(--shadow-sm)' }}>
      {/* 4-Step Progress Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2.5rem',
        borderBottom: '1px solid var(--border-light)',
        paddingBottom: '1.5rem',
        overflowX: 'auto',
        gap: '12px'
      }}>
        {steps.map((step) => {
          const isDone = currentStep > step.num;
          const isActive = currentStep === step.num;

          return (
            <div 
              key={step.num}
              onClick={() => step.num < currentStep && setCurrentStep(step.num)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: step.num < currentStep ? 'pointer' : 'default',
                opacity: (isDone || isActive) ? 1 : 0.45
              }}
            >
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: isDone ? 'var(--color-success)' : isActive ? 'var(--color-gold)' : '#E5E5E5',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.78rem',
                fontWeight: 700
              }}>
                {isDone ? <Check size={14} /> : step.num}
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: isActive ? 700 : 500, color: 'var(--color-text-primary)', whiteSpace: 'nowrap' }}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step 1: Customer Information */}
      {currentStep === 1 && (
        <div>
          <h3 style={{ fontSize: '1.35rem', marginBottom: '16px' }}>1. Contact Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input 
                type="text" 
                className="form-input" 
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address (for Order Updates) *</label>
              <input 
                type="email" 
                className="form-input" 
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
            </div>

            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">UAE Mobile Phone *</label>
              <input 
                type="tel" 
                className="form-input" 
                placeholder="+971 50 123 4567"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                required
              />
              <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                Our Dubai courier will SMS you real-time tracking updates.
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button type="button" onClick={nextStep} className="btn btn-primary">
              <span>Continue to Delivery</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: UAE Delivery Address */}
      {currentStep === 2 && (
        <div>
          <h3 style={{ fontSize: '1.35rem', marginBottom: '16px' }}>2. UAE Delivery Address</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Emirate *</label>
              <select 
                className="form-input"
                value={formData.emirate}
                onChange={(e) => handleChange('emirate', e.target.value)}
              >
                {EMIRATES.map(em => (
                  <option key={em} value={em}>{em}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">City / District / Area *</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Downtown Dubai, Dubai Marina, Saadiyat"
                value={formData.area}
                onChange={(e) => handleChange('area', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Building Name / Villa Number *</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Marina Gate 2, Villa 14B"
                value={formData.building}
                onChange={(e) => handleChange('building', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Street Address & Apartment *</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Al Marsa St, Apt 2804"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                required
              />
            </div>

            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Courier Delivery Instructions (Optional)</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Leave with building security, call upon arrival"
                value={formData.instructions}
                onChange={(e) => handleChange('instructions', e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
            <button type="button" onClick={prevStep} className="btn btn-secondary">
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
            <button type="button" onClick={nextStep} className="btn btn-primary">
              <span>Continue to Payment</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Payment Options */}
      {currentStep === 3 && (
        <div>
          <h3 style={{ fontSize: '1.35rem', marginBottom: '16px' }}>3. Select Payment Method</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {/* 1. Credit / Debit Card */}
            <div 
              onClick={() => handleChange('paymentMethod', 'Credit Card')}
              style={{
                border: formData.paymentMethod === 'Credit Card' ? '2px solid var(--color-gold)' : '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-xs)',
                padding: '16px',
                cursor: 'pointer',
                background: formData.paymentMethod === 'Credit Card' ? '#FFFDF8' : '#FFFFFF'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CreditCard size={20} style={{ color: 'var(--color-gold)' }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>Credit or Debit Card</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>Visa, Mastercard, AMEX</div>
                  </div>
                </div>
                <input 
                  type="radio" 
                  checked={formData.paymentMethod === 'Credit Card'} 
                  onChange={() => {}} 
                  style={{ accentColor: 'var(--color-gold)' }} 
                />
              </div>

              {formData.paymentMethod === 'Credit Card' && (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-light)', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px' }}>
                  <div style={{ gridColumn: 'span 3' }}>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Card Number</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={formData.cardNumber} 
                      onChange={(e) => handleChange('cardNumber', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Expiry Date</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={formData.cardExpiry} 
                      onChange={(e) => handleChange('cardExpiry', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>CVV</label>
                    <input 
                      type="password" 
                      className="form-input" 
                      value={formData.cardCvv} 
                      onChange={(e) => handleChange('cardCvv', e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 2. Apple Pay */}
            <div 
              onClick={() => handleChange('paymentMethod', 'Apple Pay')}
              style={{
                border: formData.paymentMethod === 'Apple Pay' ? '2px solid var(--color-gold)' : '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-xs)',
                padding: '16px',
                cursor: 'pointer',
                background: formData.paymentMethod === 'Apple Pay' ? '#FFFDF8' : '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Smartphone size={20} style={{ color: 'var(--color-text-primary)' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>Apple Pay</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>1-Touch instant checkout</div>
                </div>
              </div>
              <input 
                type="radio" 
                checked={formData.paymentMethod === 'Apple Pay'} 
                onChange={() => {}} 
                style={{ accentColor: 'var(--color-gold)' }} 
              />
            </div>

            {/* 3. Cash on Delivery (COD) */}
            <div 
              onClick={() => handleChange('paymentMethod', 'Cash on Delivery')}
              style={{
                border: formData.paymentMethod === 'Cash on Delivery' ? '2px solid var(--color-gold)' : '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-xs)',
                padding: '16px',
                cursor: 'pointer',
                background: formData.paymentMethod === 'Cash on Delivery' ? '#FFFDF8' : '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Banknote size={20} style={{ color: '#166534' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>Cash on Delivery (COD)</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>Pay in cash or card to courier upon receipt</div>
                </div>
              </div>
              <input 
                type="radio" 
                checked={formData.paymentMethod === 'Cash on Delivery'} 
                onChange={() => {}} 
                style={{ accentColor: 'var(--color-gold)' }} 
              />
            </div>

            {/* 4. Tabby 4 Installments */}
            <div 
              onClick={() => handleChange('paymentMethod', 'Tabby (4 Installments)')}
              style={{
                border: formData.paymentMethod === 'Tabby (4 Installments)' ? '2px solid var(--color-gold)' : '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-xs)',
                padding: '16px',
                cursor: 'pointer',
                background: formData.paymentMethod === 'Tabby (4 Installments)' ? '#FFFDF8' : '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#3EED82', color: '#000000', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>
                  tabby
                </span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>Tabby: 4 Interest-Free Payments</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>Pay AED {Math.round(cartTotal / 4)} today and split remaining across 3 months</div>
                </div>
              </div>
              <input 
                type="radio" 
                checked={formData.paymentMethod === 'Tabby (4 Installments)'} 
                onChange={() => {}} 
                style={{ accentColor: 'var(--color-gold)' }} 
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="button" onClick={prevStep} className="btn btn-secondary">
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
            <button type="button" onClick={nextStep} className="btn btn-primary">
              <span>Review Order</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Review & Place Order */}
      {currentStep === 4 && (
        <div>
          <h3 style={{ fontSize: '1.35rem', marginBottom: '16px' }}>4. Final Review & Authorization</h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '24px' }}>
            <div style={{ background: '#F8F7F4', padding: '14px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Recipient</div>
              <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '2px' }}>{formData.fullName}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{formData.phone}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{formData.email}</div>
            </div>

            <div style={{ background: '#F8F7F4', padding: '14px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Delivery Location</div>
              <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '2px' }}>{formData.emirate} • {formData.area}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{formData.building}, {formData.address}</div>
            </div>

            <div style={{ background: '#F8F7F4', padding: '14px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Payment Method</div>
              <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '2px' }}>{formData.paymentMethod}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Status: Authorized (AED {cartTotal})</div>
            </div>
          </div>

          <div style={{ padding: '16px', background: 'var(--color-gold-light)', border: '1px solid var(--color-gold-border)', borderRadius: 'var(--radius-xs)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Truck size={20} style={{ color: 'var(--color-gold)' }} />
            <div style={{ fontSize: '0.84rem', color: 'var(--color-text-primary)' }}>
              <strong>Estimated Arrival:</strong> Next business day via Sevenria Express Dubai Courier.
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button type="button" onClick={prevStep} className="btn btn-secondary">
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
            <button 
              type="button" 
              onClick={handleFinalSubmit}
              className="btn btn-gold"
              style={{ padding: '16px 36px', fontSize: '0.92rem' }}
            >
              <Lock size={16} />
              <span>PLACE ORDER (AED {cartTotal})</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
