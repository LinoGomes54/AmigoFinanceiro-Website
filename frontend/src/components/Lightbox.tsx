import { useEffect, useRef } from 'react';
import { Icon } from './Icon.tsx';

interface LightboxProps {
  src: string | null;
  onClose: () => void;
}

/** Amplia a captura clicada. Fecha no Esc, no clique fora e no botão. */
export function Lightbox({ src, onClose }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!src) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    // Trava o scroll do fundo enquanto o diálogo está aberto.
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Leva o foco para dentro do diálogo, senão o teclado continua no fundo.
    closeRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflowAnterior;
    };
  }, [src, onClose]);

  if (!src) return null;

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label="Captura de tela ampliada">
      <img src={src} alt="" onClick={(e) => e.stopPropagation()} />
      <button ref={closeRef} type="button" onClick={onClose} className="lightbox-close" aria-label="Fechar">
        <Icon name="close" size={20} />
      </button>
    </div>
  );
}
