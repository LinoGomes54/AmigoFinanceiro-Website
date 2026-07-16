import type { ReactNode } from 'react';

/** Barra de título que imita a janela do app desktop nos mockups. */
export function TitleBar() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        padding: '11px 14px',
        background: '#f2f5fb',
        borderBottom: '1px solid #e2e9f2',
      }}
    >
      <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
      <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
      <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
      <span style={{ marginLeft: 8, fontSize: 12, color: '#7c8aa0', fontWeight: 600 }}>Amigo Financeiro</span>
    </div>
  );
}

export function AppWindow({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 16,
        border: '1px solid #e2e9f2',
        boxShadow:
          '0 40px 80px -40px rgba(8,49,47,0.45), 0 12px 28px -18px rgba(8,49,47,0.3)',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <TitleBar />
      {children}
    </div>
  );
}

interface ScreenshotProps {
  src: string;
  alt: string;
  onZoom?: (src: string) => void;
}

/** Screenshot do app dentro da janela; clicar abre o lightbox quando onZoom é passado. */
export function Screenshot({ src, alt, onZoom }: ScreenshotProps) {
  return (
    <AppWindow>
      <img
        src={src}
        alt={alt}
        onClick={onZoom ? () => onZoom(src) : undefined}
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          cursor: onZoom ? 'zoom-in' : 'default',
        }}
      />
    </AppWindow>
  );
}
