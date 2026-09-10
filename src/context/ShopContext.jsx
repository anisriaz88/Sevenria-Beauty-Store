import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import { INITIAL_ORDERS } from '../data/adminMock';

const ShopContext = createContext(null);

// Helper to resolve active page from browser URL or Hash
const getInitialPageFromUrl = () => {
  if (typeof window === 'undefined') return 'home';
  const pathname = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  const hash = window.location.hash.toLowerCase().replace('#', '').replace(/\/$/, '');

  if (pathname === '/admin' || pathname.startsWith('/admin') || hash === 'admin' || hash === '/admin') {
    return 'admin';
  }
  if (pathname === '/shop' || hash === 'shop') return 'shop';
  if (pathname === '/cart' || hash === 'cart') return 'cart';
  if (pathname === '/checkout' || hash === 'checkout') return 'checkout';
  if (pathname === '/account' || hash === 'account') return 'account';
  if (pathname === '/brands' || hash === 'brands') return 'brands';
  if (pathname === '/offers' || hash === 'offers') return 'offers';
  if (pathname === '/contact' || hash === 'contact') return 'contact';
  if (pathname === '/wishlist' || hash === 'wishlist') return 'wishlist';
  if (pathname === '/order-confirmation' || hash === 'order-confirmation') return 'order-confirmation';

  return 'home';
};

export function ShopProvider({ children }) {
  // Navigation & Routing State
  const [activePage, setActivePage] = useState(getInitialPageFromUrl);
  const [pageParams, setPageParams] = useState({});
  const [activeProduct, setActiveProduct] = useState(PRODUCTS[0]);
  
  // Store Catalog & Admin Products State (Local mutable copy for admin demo)
  const [productsList, setProductsList] = useState(PRODUCTS);
  
  // Cart & Wishlist State (persisted in localStorage for demo fidelity)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('sevenria_cart');
      return saved ? JSON.parse(saved) : [
        { product: PRODUCTS[0], quantity: 1, option: PRODUCTS[0].size || '100ml' },
        { product: PRODUCTS[3], quantity: 1, option: PRODUCTS[3].size || '230g' }
      ];
    } catch {
      return [
        { product: PRODUCTS[0], quantity: 1, option: PRODUCTS[0].size || '100ml' }
      ];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('sevenria_wishlist');
      return saved ? JSON.parse(saved) : [PRODUCTS[0].id, PRODUCTS[1].id, PRODUCTS[7].id];
    } catch {
      return [PRODUCTS[0].id];
    }
  });

  // Orders State (Mutable for admin and checkout demo)
  const [ordersList, setOrdersList] = useState(INITIAL_ORDERS);
  const [latestOrder, setLatestOrder] = useState(INITIAL_ORDERS[0]);
  const [trackingModalOrder, setTrackingModalOrder] = useState(null);

  // Promo Code State
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoDiscountRate, setPromoDiscountRate] = useState(0);

  // UI Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Admin Portal State
  const [adminTab, setAdminTab] = useState('dashboard'); // 'dashboard' | 'products' | 'orders'

  // Toast Notification System
  const [toasts, setToasts] = useState([]);

  // Save Cart & Wishlist
  useEffect(() => {
    try {
      localStorage.setItem('sevenria_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('sevenria_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Handle browser Back / Forward navigation
  useEffect(() => {
    const handlePopState = (e) => {
      if (e.state && e.state.page) {
        setActivePage(e.state.page);
        if (e.state.params) setPageParams(e.state.params);
      } else {
        setActivePage(getInitialPageFromUrl());
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Scroll to top on page change & synchronize browser URL
  const navigateTo = (page, params = {}) => {
    setActivePage(page);
    setPageParams(params);

    if (typeof window !== 'undefined') {
      const targetPath = page === 'home' ? '/' : `/${page}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ page, params }, '', targetPath);
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart Actions
  const addToCart = (product, quantity = 1, option = null) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id && item.option === (option || product.size));
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, option: option || product.size || 'Standard' }];
    });
    addToast(`Added "${product.title}" to your Bag`);
  };

  const updateCartQuantity = (productId, option, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId, option);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && (!option || item.option === option)) {
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (productId, option) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && (!option || item.option === option))));
    addToast('Item removed from Bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Actions
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.includes(product.id);
      if (exists) {
        addToast(`Removed "${product.title}" from Wishlist`, 'info');
        return prev.filter(id => id !== product.id);
      } else {
        addToast(`Added "${product.title}" to your Wishlist`);
        return [...prev, product.id];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Promo Codes
  const applyPromo = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'WELCOME10') {
      setAppliedPromo('WELCOME10');
      setPromoDiscountRate(0.10);
      addToast('Promo code WELCOME10 applied! (10% Off)');
      return { success: true, message: '10% discount applied!' };
    } else if (clean === 'SEVENRIA15') {
      setAppliedPromo('SEVENRIA15');
      setPromoDiscountRate(0.15);
      addToast('Promo code SEVENRIA15 applied! (15% Off)');
      return { success: true, message: '15% discount applied!' };
    } else {
      addToast('Invalid promo code. Try "WELCOME10"', 'error');
      return { success: false, message: 'Invalid promo code' };
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoDiscountRate(0);
    addToast('Promo code removed', 'info');
  };

  // Order Placement (Mock Checkout)
  const placeOrder = (orderData) => {
    const newOrderId = `SB-UAE-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: newOrderId,
      customerName: orderData.fullName || 'Guest Customer',
      customerEmail: orderData.email || 'customer@example.com',
      customerPhone: orderData.phone || '+971 50 000 0000',
      date: 'Just now',
      emirate: orderData.emirate || 'Dubai',
      area: orderData.area || 'Downtown Dubai',
      address: `${orderData.building || ''}, ${orderData.address || ''}`,
      items: cart.map(item => ({
        title: item.product.title,
        quantity: item.quantity,
        priceAED: item.product.priceAED
      })),
      itemsCount: cart.reduce((acc, i) => acc + i.quantity, 0),
      totalAED: cartTotal,
      paymentMethod: orderData.paymentMethod || 'Credit Card',
      paymentStatus: orderData.paymentMethod === 'Cash on Delivery' ? 'Pending (COD)' : 'Paid',
      status: 'Confirmed',
      trackingNumber: `SE-DXB-${Math.floor(100000 + Math.random() * 900000)}`
    };

    setOrdersList(prev => [newOrder, ...prev]);
    setLatestOrder(newOrder);
    clearCart();
    navigateTo('order-confirmation');
    addToast(`Order ${newOrderId} successfully placed!`);
    return newOrder;
  };

  // Admin Order Status Changer
  const updateOrderStatus = (orderId, newStatus) => {
    setOrdersList(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    addToast(`Order ${orderId} marked as ${newStatus}`);
  };

  // Admin Products Actions
  const addAdminProduct = (newProduct) => {
    const created = {
      ...newProduct,
      id: `custom-${Date.now()}`,
      slug: newProduct.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      rating: 5.0,
      reviewsCount: 1,
      inStock: true
    };
    setProductsList(prev => [created, ...prev]);
    addToast(`Product "${newProduct.title}" created successfully!`);
  };

  const deleteAdminProduct = (productId) => {
    setProductsList(prev => prev.filter(p => p.id !== productId));
    addToast('Product deleted from inventory', 'info');
  };

  // Calculation summaries
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.priceAED * item.quantity), 0);
  const FREE_SHIPPING_THRESHOLD = 150;
  const shippingFee = (cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartSubtotal === 0) ? 0 : 20;
  const promoDiscountAmount = Math.round(cartSubtotal * promoDiscountRate);
  const vatAmount = Math.round((cartSubtotal - promoDiscountAmount) * 0.05); // 5% UAE VAT
  const cartTotal = Math.max(0, cartSubtotal - promoDiscountAmount + shippingFee);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  // Detail viewer helper
  const openProductDetail = (product) => {
    setActiveProduct(product);
    navigateTo('product', { productId: product.id });
  };

  return (
    <ShopContext.Provider value={{
      // Navigation
      activePage,
      pageParams,
      navigateTo,
      activeProduct,
      setActiveProduct,
      openProductDetail,
      
      // Products
      productsList,
      
      // Cart
      cart,
      cartCount,
      cartSubtotal,
      shippingFee,
      vatAmount,
      cartTotal,
      freeShippingProgress,
      amountNeededForFreeShipping,
      FREE_SHIPPING_THRESHOLD,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      
      // Promo
      appliedPromo,
      promoDiscountRate,
      promoDiscountAmount,
      applyPromo,
      removePromo,
      
      // Wishlist
      wishlist,
      toggleWishlist,
      isInWishlist,
      
      // UI Modals
      isCartOpen,
      setIsCartOpen,
      isMobileNavOpen,
      setIsMobileNavOpen,
      quickViewProduct,
      setQuickViewProduct,
      searchQuery,
      setSearchQuery,
      toasts,
      addToast,
      removeToast,
      
      // Orders
      ordersList,
      latestOrder,
      placeOrder,
      updateOrderStatus,
      trackingModalOrder,
      setTrackingModalOrder,
      
      // Admin
      adminTab,
      setAdminTab,
      addAdminProduct,
      deleteAdminProduct
    }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
}
