import React from 'react';
import { useShop } from '../../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => {
        const Icon = toast.type === 'error' ? AlertCircle : toast.type === 'info' ? Info : CheckCircle2;
        const iconColor = toast.type === 'error' ? 'var(--color-sale)' : toast.type === 'info' ? '#3B82F6' : 'var(--color-gold)';

        return (
          <div key={toast.id} className="toast-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Icon size={18} style={{ color: iconColor, flexShrink: 0 }} />
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{ color: '#888888', padding: '2px' }}
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
