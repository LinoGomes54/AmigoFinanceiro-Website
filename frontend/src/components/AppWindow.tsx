import type { ReactNode } from 'react';

/**
 * Barra de título no padrão Windows: título à esquerda, minimizar/maximizar/fechar
 * à direita. É um mockup decorativo — os controles não são botões de verdade, por
 * isso ficam fora da árvore de acessibilidade.
 */
export function TitleBar({ titulo = 'Amigo Financeiro' }: { titulo?: string }) {
  return (
    <div className="af-win-titlebar">
      <div className="af-win-title">
        <span className="af-win-logo" aria-hidden="true" />
        {titulo}
      </div>
      <div className="af-win-controls" aria-hidden="true">
        <span className="af-win-ctrl">
          <span className="af-win-min" />
        </span>
        <span className="af-win-ctrl">
          <span className="af-win-max" />
        </span>
        <span className="af-win-ctrl">
          <span className="af-win-close" />
        </span>
      </div>
    </div>
  );
}

export function AppWindow({ children }: { children: ReactNode }) {
  return (
    <div className="af-win">
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
