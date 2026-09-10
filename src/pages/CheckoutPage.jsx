import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import Breadcrumbs from '../components/common/Breadcrumbs';
import CheckoutWizard from '../components/checkout/CheckoutWizard';
import OrderSummaryBox from '../components/checkout/OrderSummaryBox';

export default function CheckoutPage() {
  const { cart, navigateTo, applyPromo, removePromo } = useShop();
  const [promoInput, setPromoInput] = useState('');

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>Your Shopping Bag is Empty</h2>
        <p style={{ color: 'var(--color-text-secondary)', margin: '10px 0 24px' }}>
          Please add items to your bag before proceeding to checkout.
        </p>
        <button onClick={() => navigateTo('shop')} className="btn btn-primary">
          Explore Products
        </button>
      </div>
    );
  }

  const handleApplyPromo = () => {
    if (promoInput.trim()) {
      applyPromo(promoInput);
      setPromoInput('');
    }
  };

  return (
    <div style={{ background: 'var(--color-bg-main)', minHeight: '85vh', paddingBottom: '6rem' }}>
      <div className="container">
        <Breadcrumbs items={[
          { label: 'Shopping Bag', page: 'cart' },
          { label: 'Secure UAE Checkout' }
        ]} />

        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: 'var(--color-text-primary)' }}>
            Checkout & Express Delivery
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            Fast dispatch from Dubai logistics hub • Cash on Delivery & Apple Pay supported
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '36px',
          alignItems: 'flex-start'
        }}>
          {/* Main 4-step wizard */}
          <div style={{ flex: '1 1 540px' }}>
            <CheckoutWizard />
          </div>

          {/* Sticky Summary on right */}
          <div style={{ maxWidth: '420px', width: '100%', position: 'sticky', top: '90px' }}>
            <OrderSummaryBox
              promoCodeInput={promoInput}
              setPromoCodeInput={setPromoInput}
              onApplyPromo={handleApplyPromo}
              onRemovePromo={removePromo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
