import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Clock, 
  ShoppingBag, 
  Check, 
  Flame, 
  Star, 
  Tag, 
  Gift, 
  Copy,
  Zap,
  Package
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function HeroSection() {
  const { 
    navigateTo, 
    productsList, 
    addToCart, 
    openProductDetail,
    applyPromo,
    addToast
  } = useShop();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [copiedPromo, setCopiedPromo] = useState(false);
  const [claimedMap, setClaimedMap] = useState({});

  // Touch swipe refs
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Products reference
  const cosrxProduct = productsList.find(p => p.id === 'cosrx-snail-96-essence') || productsList[0];
  const finoOilProduct = productsList.find(p => p.id === 'fino-premium-touch-hair-oil') || productsList.find(p => p.brand === 'Fino') || productsList[0];
  const anuaOilProduct = productsList.find(p => p.id === 'anua-heartleaf-cleansing-oil') || productsList.find(p => p.brand === 'Anua') || productsList[0];
  const anuaTonerProduct = productsList.find(p => p.id === 'anua-heartleaf-77-toner') || productsList[1] || productsList[0];

  // Helper for quick claim with state
  const handleQuickClaim = (e, product, label = 'Added!') => {
    e.stopPropagation();
    addToCart(product, 1);
    setClaimedMap(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setClaimedMap(prev => ({ ...prev, [product.id]: false }));
    }, 2200);
  };

  // Helper for claiming 3-piece combo
  const handleClaimCombo = (e) => {
    e.stopPropagation();
    if (anuaOilProduct) addToCart(anuaOilProduct, 1);
    if (anuaTonerProduct) addToCart(anuaTonerProduct, 1);
    if (cosrxProduct) addToCart(cosrxProduct, 1);
    setClaimedMap(prev => ({ ...prev, combo: true }));
    addToast('🎉 3-Piece Glass Skin Routine added to Bag with 25% Combo Savings!');
    setTimeout(() => {
      setClaimedMap(prev => ({ ...prev, combo: false }));
    }, 2500);
  };

  // Helper to copy and apply promo
  const handleCopyPromo = (code) => {
    applyPromo(code);
    setCopiedPromo(true);
    setTimeout(() => setCopiedPromo(false), 2500);
  };

  // 5 Distinct Slide Definitions
  const slides = [
    // Slide 1: Featured Product (COSRX Snail Mucin)
    {
      id: 'featured',
      tabLabel: 'Featured Product',
      tabIcon: Star,
      titleMain: 'Advanced Snail 96',
      titleSub: 'Mucin Power Essence',
      description: 'Formulated with 96.3% snail secretion filtrate to deeply repair post-sun barrier damage, soothe indoor AC dehydration, and deliver glass-skin vitality.',
      primaryBtnText: 'Shop Featured Essence',
      primaryBtnAction: () => openProductDetail(cosrxProduct),
      secondaryBtnText: 'Quick Claim (AED 78)',
      secondaryBtnAction: (e) => handleQuickClaim(e, cosrxProduct),
      product: cosrxProduct,
      bgImage: '/images/hero-editorial.jpg',
      badge: 'Bestselling Icon',
      accentColor: '#D4AF37',
      cardType: 'product'
    },
    // Slide 2: New Products (Fino Hair Oil / 2026 Drop)
    {
      id: 'new',
      tabLabel: 'New Arrivals',
      tabIcon: Sparkles,
      titleMain: 'Japan’s Salon Secret:',
      titleSub: 'Fino Hair Oil Elixir',
      description: 'The viral weightless essence oil that smooths split ends, provides up to 230°C thermal protection, and locks out UAE humidity with mirror-like shine.',
      primaryBtnText: 'Explore New In UAE',
      primaryBtnAction: () => navigateTo('shop', { filterType: 'new' }),
      secondaryBtnText: 'Shop Fino Oil (AED 62)',
      secondaryBtnAction: () => openProductDetail(finoOilProduct),
      product: finoOilProduct,
      bgImage: '/images/promo-favorites.jpg',
      badge: '2026 Drop',
      accentColor: '#38BDF8',
      cardType: 'product'
    },
    // Slide 3: Sale On Products (Flash Sale Up to 40% Off)
    {
      id: 'sale',
      tabLabel: 'Flash Sale',
      tabIcon: Flame,
      titleMain: 'Limited-Time Price Drops',
      titleSub: 'Save Up to 40% Today',
      description: 'Deep markdowns on viral blackhead melting cleansers, barrier repair toners, and luxury fragrances. Same-day dispatch across Dubai, next-day across UAE.',
      primaryBtnText: 'Shop Sale Collection',
      primaryBtnAction: () => navigateTo('shop', { filterType: 'sale' }),
      secondaryBtnText: 'Flash Deal (AED 85)',
      secondaryBtnAction: (e) => handleQuickClaim(e, anuaOilProduct),
      product: anuaOilProduct,
      bgImage: '/images/hero-editorial.jpg',
      badge: 'Flash 22% Off',
      accentColor: '#F43F5E',
      cardType: 'sale'
    },
    // Slide 4: Special Combo (3-Step Glass Skin Glow Combo)
    {
      id: 'combo',
      tabLabel: 'Special Combo',
      tabIcon: Gift,
      titleMain: 'The 3-Step Glass Skin',
      titleSub: 'Double Cleanse & Glow',
      description: 'Anua Pore Cleansing Oil + Heartleaf 77% Soothing Toner + COSRX Snail Mucin 96 Essence. The complete dermatologist-approved K-Beauty ritual.',
      primaryBtnText: 'Claim 3-Piece Combo',
      primaryBtnAction: handleClaimCombo,
      secondaryBtnText: 'Customize Routine',
      secondaryBtnAction: () => navigateTo('shop'),
      comboProducts: [anuaOilProduct, anuaTonerProduct, cosrxProduct],
      bgImage: '/images/promo-favorites.jpg',
      badge: 'Bundle & Save 25%',
      accentColor: '#10B981',
      cardType: 'combo'
    },
    // Slide 5: Special Offers (3 for 2 + Code SEVENRIA15)
    {
      id: 'offers',
      tabLabel: 'Special Offers',
      tabIcon: Tag,
      titleMain: 'Buy 2, Get 1 Free (3 for 2)',
      titleSub: '+ Extra 15% Off Code',
      description: 'Mix & match your favorite salon haircare, cosmetics, and essences. Use code SEVENRIA15 for an extra 15% discount plus a complimentary luxury mini on orders AED 250+.',
      primaryBtnText: 'Explore All Offers',
      primaryBtnAction: () => navigateTo('offers'),
      secondaryBtnText: 'Apply SEVENRIA15',
      secondaryBtnAction: () => handleCopyPromo('SEVENRIA15'),
      bgImage: '/images/hero-editorial.jpg',
      badge: 'Tier Multi-Buy',
      accentColor: '#F59E0B',
      cardType: 'offers'
    }
  ];

  // Auto-play timer: 4 seconds automatic rotation
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setCurrentSlide(prev => (prev + 1) % slides.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  // Touch handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    } else if (diff < -50) {
      setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
    }
  };

  const activeSlideData = slides[currentSlide];

  return (
    <section 
      style={{ 
        position: 'relative', 
        background: 'var(--color-bg-ivory)', 
        borderBottom: '1px solid var(--border-light)',
        paddingTop: 'clamp(1rem, 2.5vw, 1.8rem)',
        paddingBottom: 'clamp(2rem, 3.5vw, 3rem)'
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="container">
        <div className="hero-slider-wrap">

          {/* Slide Rendering */}
          {slides.map((slide, index) => {
            const isActive = currentSlide === index;

            return (
              <div 
                key={slide.id}
                className={`hero-slide ${isActive ? 'active' : ''}`}
                style={{
                  display: isActive ? 'flex' : 'none',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: 'clamp(1.8rem, 4vw, 3.2rem)',
                  minHeight: '520px',
                  position: 'relative'
                }}
              >
                {/* Background Editorial Image (Crisp & Clear) */}
                <img 
                  src={slide.bgImage} 
                  alt={slide.titleMain}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center right',
                    opacity: 1
                  }}
                />

                {/* Soft Light Gradient Wash for Text Readability - Zero Black Shadows */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to right, rgba(255, 255, 255, 0.94) 0%, rgba(255, 255, 255, 0.72) 48%, rgba(255, 255, 255, 0) 82%)',
                  pointerEvents: 'none'
                }} />

                {/* Ambient Color Glow based on slide accent */}
                <div style={{
                  position: 'absolute',
                  top: '-10%',
                  right: '15%',
                  width: '380px',
                  height: '380px',
                  borderRadius: '50%',
                  background: slide.accentColor,
                  filter: 'blur(140px)',
                  opacity: 0.12,
                  pointerEvents: 'none'
                }} />

                {/* Main Content Grid: Text Info (Left) + Interactive Showcase Card (Right) */}
                <div style={{
                  position: 'relative',
                  zIndex: 2,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  alignItems: 'center',
                  gap: 'clamp(2rem, 4vw, 3.5rem)'
                }}>
                  {/* Left Hero Editorial Column */}
                  <div style={{ maxWidth: '580px' }}>


                    {/* Headline */}
                    <h1 style={{ 
                      marginBottom: '14px', 
                      color: '#111111', 
                      fontSize: 'clamp(2.1rem, 4.4vw, 3.4rem)', 
                      lineHeight: 1.12 
                    }}>
                      {slide.titleMain} <br />
                      <span style={{ fontStyle: 'italic', color: 'var(--color-gold-hover)' }}>
                        {slide.titleSub}
                      </span>
                    </h1>

                    {/* Description */}
                    <p style={{ 
                      fontSize: '0.96rem', 
                      lineHeight: 1.62, 
                      color: '#333333', 
                      marginBottom: '26px' 
                    }}>
                      {slide.description}
                    </p>

                    {/* Action CTAs */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '26px' }}>
                      <button 
                        onClick={slide.primaryBtnAction}
                        className="btn btn-gold"
                        style={{ padding: '12px 24px', fontWeight: 700 }}
                      >
                        <span>{slide.primaryBtnText}</span>
                        <ArrowRight size={16} />
                      </button>

                      <button 
                        onClick={slide.secondaryBtnAction}
                        className="btn"
                        style={{
                          background: '#FFFFFF',
                          color: 'var(--color-text-primary)',
                          border: '1px solid var(--border-medium)',
                          padding: '12px 20px',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                          fontWeight: 600
                        }}
                      >
                        {slide.secondaryBtnText}
                      </button>
                    </div>

                    {/* Trust Guarantees */}
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '18px', 
                      fontSize: '0.78rem', 
                      color: '#444444' 
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Truck size={15} style={{ color: 'var(--color-gold)' }} />
                        <span>Free UAE Delivery AED 150+</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <ShieldCheck size={15} style={{ color: 'var(--color-gold)' }} />
                        <span>100% Genuine Brands</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={15} style={{ color: 'var(--color-gold)' }} />
                        <span>Same-Day Dubai Dispatch</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Showcase Card Display */}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {/* TYPE 1: Single Product Card (Featured, New, Sale) */}
                    {slide.cardType === 'product' && slide.product && (
                      <div 
                        onClick={() => openProductDetail(slide.product)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.96)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '24px',
                          width: '100%',
                          maxWidth: '360px',
                          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.35)',
                          border: '1px solid rgba(255, 255, 255, 0.6)',
                          backdropFilter: 'blur(14px)',
                          position: 'relative',
                          cursor: 'pointer',
                          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        {/* Top Badge */}
                        <div style={{
                          position: 'absolute',
                          top: '14px',
                          right: '14px',
                          background: 'var(--color-bg-dark)',
                          color: 'var(--color-gold)',
                          fontSize: '0.66rem',
                          fontWeight: 800,
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-pill)',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase'
                        }}>
                          {slide.badge}
                        </div>

                        {/* Product Image Stage */}
                        <div style={{
                          width: '100%',
                          height: '210px',
                          background: '#F9F8F6',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '16px',
                          marginBottom: '16px',
                          position: 'relative',
                          overflow: 'hidden'
                        }}>
                          <img 
                            src={slide.product.images[0]} 
                            alt={slide.product.title}
                            style={{ 
                              maxHeight: '180px', 
                              maxWidth: '100%', 
                              objectFit: 'contain',
                              transition: 'transform 0.3s ease'
                            }}
                          />
                        </div>

                        {/* Brand & Title */}
                        <div style={{ fontSize: '0.72rem', color: 'var(--color-gold-hover)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          {slide.product.brand}
                        </div>
                        <div style={{ 
                          fontSize: '1rem', 
                          fontWeight: 700, 
                          color: 'var(--color-text-primary)', 
                          marginTop: '4px',
                          lineHeight: 1.35,
                          height: '2.7em',
                          overflow: 'hidden'
                        }}>
                          {slide.product.title}
                        </div>

                        {/* Rating */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '8px 0' }}>
                          <div style={{ display: 'flex', color: 'var(--color-gold)' }}>
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={13} fill="currentColor" />
                            ))}
                          </div>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{slide.product.rating}</span>
                          <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                            ({slide.product.reviewsCount})
                          </span>
                        </div>

                        {/* Pricing & Claim Button */}
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between',
                          marginTop: '12px',
                          paddingTop: '12px',
                          borderTop: '1px solid var(--border-light)'
                        }}>
                          <div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                              AED {slide.product.priceAED}
                            </div>
                            {slide.product.originalPriceAED && (
                              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                                AED {slide.product.originalPriceAED}
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={(e) => handleQuickClaim(e, slide.product)}
                            className={`btn btn-sm ${claimedMap[slide.product.id] ? 'btn-gold' : 'btn-primary'}`}
                            style={{ padding: '8px 16px', fontSize: '0.76rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                          >
                            {claimedMap[slide.product.id] ? (
                              <>
                                <Check size={14} />
                                <span>Added!</span>
                              </>
                            ) : (
                              <>
                                <ShoppingBag size={14} />
                                <span>Quick Add</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* TYPE 2: Flash Sale Deal Card */}
                    {slide.cardType === 'sale' && slide.product && (
                      <div 
                        onClick={() => openProductDetail(slide.product)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.96)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '24px',
                          width: '100%',
                          maxWidth: '360px',
                          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.35)',
                          border: '2px solid rgba(244, 63, 94, 0.4)',
                          backdropFilter: 'blur(14px)',
                          position: 'relative',
                          cursor: 'pointer'
                        }}
                      >
                        {/* Countdown Badge */}
                        <div style={{
                          position: 'absolute',
                          top: '14px',
                          right: '14px',
                          background: '#E11D48',
                          color: '#FFFFFF',
                          fontSize: '0.64rem',
                          fontWeight: 800,
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-pill)',
                          letterSpacing: '0.04em',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <Flame size={12} fill="#FFFFFF" />
                          <span>FLASH 22% OFF</span>
                        </div>

                        {/* Image Stage */}
                        <div style={{
                          width: '100%',
                          height: '210px',
                          background: '#FFF5F5',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '16px',
                          marginBottom: '16px'
                        }}>
                          <img 
                            src={slide.product.images[0]} 
                            alt={slide.product.title}
                            style={{ maxHeight: '180px', maxWidth: '100%', objectFit: 'contain' }}
                          />
                        </div>

                        <div style={{ fontSize: '0.72rem', color: '#E11D48', fontWeight: 700, textTransform: 'uppercase' }}>
                          TODAY'S STAR FLASH PICK
                        </div>
                        <div style={{ 
                          fontSize: '1rem', 
                          fontWeight: 700, 
                          color: 'var(--color-text-primary)', 
                          marginTop: '4px',
                          height: '2.7em',
                          overflow: 'hidden'
                        }}>
                          {slide.product.title}
                        </div>

                        {/* Pricing */}
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
                          <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#E11D48' }}>
                            AED {slide.product.priceAED}
                          </span>
                          <span style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                            AED {slide.product.originalPriceAED}
                          </span>
                          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-success)', background: 'var(--color-success-bg)', padding: '2px 6px', borderRadius: '3px' }}>
                            Save AED {slide.product.originalPriceAED - slide.product.priceAED}
                          </span>
                        </div>

                        {/* Button */}
                        <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--border-light)' }}>
                          <button
                            type="button"
                            onClick={(e) => handleQuickClaim(e, slide.product)}
                            className="btn btn-primary"
                            style={{ 
                              width: '100%', 
                              background: '#E11D48', 
                              borderColor: '#E11D48',
                              padding: '10px 16px', 
                              fontSize: '0.8rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '8px'
                            }}
                          >
                            {claimedMap[slide.product.id] ? (
                              <>
                                <Check size={16} />
                                <span>Claimed & Added to Bag!</span>
                              </>
                            ) : (
                              <>
                                <ShoppingBag size={15} />
                                <span>Claim Flash Deal (AED {slide.product.priceAED})</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* TYPE 3: Special Combo Routine Card */}
                    {slide.cardType === 'combo' && slide.comboProducts && (
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.96)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '24px',
                        width: '100%',
                        maxWidth: '380px',
                        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.35)',
                        border: '2px solid rgba(16, 185, 129, 0.4)',
                        backdropFilter: 'blur(14px)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                          <span style={{
                            background: '#10B981',
                            color: '#FFFFFF',
                            fontSize: '0.65rem',
                            fontWeight: 800,
                            padding: '4px 10px',
                            borderRadius: 'var(--radius-pill)',
                            letterSpacing: '0.04em'
                          }}>
                            COMPLETE 3-STEP SET
                          </span>
                          <span style={{ fontSize: '0.76rem', color: '#10B981', fontWeight: 700 }}>
                            SAVE 25% TOGETHER
                          </span>
                        </div>

                        {/* 3 Thumbnails Grid */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gap: '8px',
                          background: '#F0FDF4',
                          padding: '12px',
                          borderRadius: '6px',
                          marginBottom: '16px'
                        }}>
                          {slide.comboProducts.map((cp, cIdx) => (
                            <div key={cp?.id || cIdx} style={{ textAlign: 'center' }}>
                              <div style={{
                                width: '100%',
                                height: '70px',
                                background: '#FFFFFF',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '4px',
                                marginBottom: '4px'
                              }}>
                                <img 
                                  src={cp?.images?.[0]} 
                                  alt={cp?.title} 
                                  style={{ maxHeight: '60px', maxWidth: '100%', objectFit: 'contain' }}
                                />
                              </div>
                              <div style={{ fontSize: '0.62rem', fontWeight: 700, color: 'var(--color-text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                Step {cIdx + 1}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div style={{ fontSize: '0.94rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                          Glass Skin Cleanse & Hydrate Trio
                        </div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                          Anua Cleansing Oil + Heartleaf Toner + COSRX Snail Mucin
                        </div>

                        {/* Bundle Price */}
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '10px 0 14px' }}>
                          <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#10B981' }}>
                            AED 219
                          </span>
                          <span style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                            AED 252
                          </span>
                          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#065F46', background: '#D1FAE5', padding: '2px 8px', borderRadius: '3px' }}>
                            Save AED 33
                          </span>
                        </div>

                        {/* Add Bundle Button */}
                        <button
                          type="button"
                          onClick={handleClaimCombo}
                          className="btn btn-primary"
                          style={{
                            width: '100%',
                            background: '#10B981',
                            borderColor: '#10B981',
                            padding: '10px 16px',
                            fontSize: '0.8rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                          }}
                        >
                          {claimedMap.combo ? (
                            <>
                              <Check size={16} />
                              <span>Routine Bundle Added to Bag!</span>
                            </>
                          ) : (
                            <>
                              <Package size={15} />
                              <span>Add 3-Piece Bundle (AED 219)</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {/* TYPE 4: Offers & Coupons Card */}
                    {slide.cardType === 'offers' && (
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.96)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '24px',
                        width: '100%',
                        maxWidth: '360px',
                        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.35)',
                        border: '1px solid var(--border-gold)',
                        backdropFilter: 'blur(14px)'
                      }}>
                        <div style={{
                          display: 'inline-block',
                          background: 'var(--color-gold)',
                          color: '#FFFFFF',
                          fontSize: '0.64rem',
                          fontWeight: 800,
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-pill)',
                          letterSpacing: '0.04em',
                          marginBottom: '14px'
                        }}>
                          PROMOTIONAL CODES
                        </div>

                        <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                          Stack Your Beauty Savings
                        </div>
                        <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', margin: '6px 0 16px' }}>
                          Apply this verified promo code to receive an extra 15% off your entire cart.
                        </p>

                        {/* Coupon Box */}
                        <div style={{
                          background: 'var(--color-bg-sand)',
                          border: '1px dashed var(--color-gold)',
                          borderRadius: '6px',
                          padding: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '16px'
                        }}>
                          <div>
                            <div style={{ fontSize: '0.64rem', color: 'var(--color-gold-hover)', fontWeight: 700, textTransform: 'uppercase' }}>
                              ACTIVE DISCOUNT CODE
                            </div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '0.08em', color: 'var(--color-text-primary)' }}>
                              SEVENRIA15
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleCopyPromo('SEVENRIA15')}
                            className="btn btn-sm btn-primary"
                            style={{ padding: '6px 12px', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                          >
                            {copiedPromo ? (
                              <>
                                <Check size={13} />
                                <span>Applied!</span>
                              </>
                            ) : (
                              <>
                                <Copy size={13} />
                                <span>Apply</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Offer perks */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Gift size={14} style={{ color: 'var(--color-gold)' }} />
                            <span>Free Luxury Travel Mini on AED 250+</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Zap size={14} style={{ color: 'var(--color-gold)' }} />
                            <span>Mix & Match 3 for 2 on Skincare</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => navigateTo('offers')}
                          className="btn btn-secondary"
                          style={{ width: '100%', padding: '9px 16px', fontSize: '0.8rem' }}
                        >
                          View All Promotions
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Bottom Progress Bar & Slide Dots */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: 'clamp(1.8rem, 4vw, 3.2rem)',
            right: 'clamp(1.8rem, 4vw, 3.2rem)',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}>
            {/* Progress Pills */}
            <div style={{ display: 'flex', gap: '8px', flex: 1, maxWidth: '320px' }}>
              {slides.map((_, pIdx) => {
                const isActive = currentSlide === pIdx;
                return (
                  <div
                    key={pIdx}
                    onClick={() => setCurrentSlide(pIdx)}
                    className={`hero-progress-pill ${isActive ? 'active' : ''}`}
                    title={`Slide ${pIdx + 1}`}
                  >
                    <div 
                      key={`${pIdx}-${currentSlide}`}
                      className="hero-progress-pill-fill"
                      style={{ animationDuration: '4s' }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Slide Index Counter */}
            <div style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#333333',
              letterSpacing: '0.1em'
            }}>
              0{currentSlide + 1} / 0{slides.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
