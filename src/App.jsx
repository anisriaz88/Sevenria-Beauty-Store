import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';

// Layout Components
import AnnouncementBar from './components/layout/AnnouncementBar';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MobileNavDrawer from './components/layout/MobileNavDrawer';
import MobileBottomNav from './components/layout/MobileBottomNav';

// Modals & Drawers
import CartDrawer from './components/common/CartDrawer';
import QuickViewModal from './components/common/QuickViewModal';
import OrderTrackingModal from './components/account/OrderTrackingModal';
import Toast from './components/common/Toast';
import LiveSocialProof from './components/common/LiveSocialProof';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import WishlistPage from './pages/WishlistPage';
import AccountPage from './pages/AccountPage';
import BrandsPage from './pages/BrandsPage';
import OffersPage from './pages/OffersPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

function AppContent() {
  const { activePage } = useShop();

  // Admin view has its own dedicated portal view
  if (activePage === 'admin') {
    return (
      <div className="app-root">
        <AdminPage />
        <OrderTrackingModal />
        <Toast />
      </div>
    );
  }

  return (
    <div className="app-root" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AnnouncementBar />
      <Header />

      <main style={{ flex: 1 }}>
        {activePage === 'home' && <HomePage />}
        {activePage === 'shop' && <ShopPage />}
        {activePage === 'product' && <ProductDetailPage />}
        {activePage === 'cart' && <CartPage />}
        {activePage === 'checkout' && <CheckoutPage />}
        {activePage === 'order-confirmation' && <OrderConfirmationPage />}
        {activePage === 'wishlist' && <WishlistPage />}
        {activePage === 'account' && <AccountPage />}
        {activePage === 'brands' && <BrandsPage />}
        {activePage === 'offers' && <OffersPage />}
        {activePage === 'contact' && <ContactPage />}
      </main>

      <Footer />

      {/* Global Modals, Drawers & Overlays */}
      <CartDrawer />
      <MobileNavDrawer />
      <QuickViewModal />
      <OrderTrackingModal />
      <Toast />
      <LiveSocialProof />
      <MobileBottomNav />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
