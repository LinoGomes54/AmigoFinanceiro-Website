import { useEffect } from 'react';

interface LightboxProps {
  src: string | null;
  onClose: () => void;
}

/** Amplia a captura de tela clicada. Fecha no Esc, no clique fora e no botão. */
export function Lightbox({ src, onClose }: LightboxProps) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [src, onClose]);

  if (!src) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(6,18,36,0.85)',
        backdropFilter: 'blur(6px)',
        display: 'grid',
        placeItems: 'center',
        padding: 40,
        cursor: 'zoom-out',
        animation: 'afFade .2s ease',
      }}
    >
      <img
        src={src}
        alt=""
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 'min(1100px, 94vw)',
          maxHeight: '90vh',
          width: 'auto',
          height: 'auto',
          borderRadius: 12,
          boxShadow: '0 40px 90px -30px rgba(0,0,0,0.7)',
          animation: 'afZoom .28s cubic-bezier(.34,1.56,.64,1)',
          cursor: 'default',
        }}
      />
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        style={{
          position: 'fixed',
          top: 20,
          right: 24,
          width: 44,
          height: 44,
          borderRadius: 999,
          border: 'none',
          background: 'rgba(255,255,255,0.14)',
          color: '#fff',
          fontSize: 20,
          cursor: 'pointer',
          fontFamily: "'Manrope',sans-serif",
        }}
      >
        ✕
      </button>
    </div>
  );
}
