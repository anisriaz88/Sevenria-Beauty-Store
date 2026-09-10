import React, { useState } from 'react';
import { ZoomIn } from 'lucide-react';

export default function ProductGallery({ images = [], title = '' }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const activeImage = images[activeIdx] || images[0] || '';

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Main Image Container with Interactive Zoom */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1.1',
          background: '#F9F8F6',
          borderRadius: 'var(--radius-xs)',
          border: '1px solid var(--border-light)',
          overflow: 'hidden',
          cursor: isZoomed ? 'zoom-out' : 'crosshair',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={activeImage}
          alt={title}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            transition: isZoomed ? 'none' : 'transform 0.3s ease',
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
            transform: isZoomed ? 'scale(2)' : 'scale(1)'
          }}
        />

        {!isZoomed && (
          <div style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(6px)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-pill)',
            padding: '6px 12px',
            fontSize: '0.72rem',
            color: 'var(--color-text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            pointerEvents: 'none'
          }}>
            <ZoomIn size={13} />
            <span>Hover to Zoom</span>
          </div>
        )}
      </div>

      {/* Thumbnails Strip */}
      {images.length > 1 && (
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '6px' }}>
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              style={{
                width: '74px',
                height: '74px',
                flexShrink: 0,
                borderRadius: 'var(--radius-xs)',
                border: activeIdx === idx ? '2px solid var(--color-gold)' : '1px solid var(--border-medium)',
                background: '#FFFFFF',
                overflow: 'hidden',
                padding: '4px',
                transition: 'border-color 0.15s ease'
              }}
              aria-label={`View photo ${idx + 1}`}
            >
              <img
                src={img}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
