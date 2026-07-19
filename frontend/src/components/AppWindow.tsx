import type { ReactNode } from 'react';

/**
 * Barra de título no padrão Windows: título à esquerda, minimizar/maximizar/fechar
 * à direita. É um mockup decorativo — os controles não são botões de verdade, por
 * isso ficam fora da árvore de acessibilidade.
 */
export function TitleBar({ titulo = 'Amigo Financeiro' }: { titulo?: string }) {
  return (
    <div className="win-titlebar">
      <div className="win-title">
        <span className="win-logo" aria-hidden="true" />
        {titulo}
      </div>
      <div className="win-controls" aria-hidden="true">
        <span className="win-ctrl">
          <span className="win-min" />
        </span>
        <span className="win-ctrl">
          <span className="win-max" />
        </span>
        <span className="win-ctrl">
          <span className="win-close" />
        </span>
      </div>
    </div>
  );
}

export function AppWindow({ children }: { children: ReactNode }) {
  return (
    <div className="win">
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

/** Screenshot do app dentro da janela; clicar amplia no lightbox. */
export function Screenshot({ src, alt, onZoom }: ScreenshotProps) {
  return (
    <AppWindow>
      {onZoom ? (
        // Botão de verdade: precisa ser alcançável por teclado, já que abre um diálogo.
        <button type="button" onClick={() => onZoom(src)} aria-label={`Ampliar: ${alt}`} style={{ display: 'block', width: '100%' }}>
          <img src={src} alt={alt} className="shot" loading="lazy" />
        </button>
      ) : (
        <img src={src} alt={alt} className="shot" style={{ cursor: 'default' }} loading="lazy" />
      )}
    </AppWindow>
  );
}
