import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Atraso em ms — usado para escalonar itens de uma mesma lista. */
  delay?: number;
  /** Tag renderizada. Por padrão div, mas listas precisam de li, seções de section etc. */
  as?: ElementType;
  className?: string;
}

/**
 * Revela o conteúdo quando ele entra na viewport.
 * O observer desconecta no primeiro disparo: a animação é de entrada, não deve
 * repetir a cada scroll. A transição em si mora no CSS ([data-reveal]).
 */
export function Reveal({ children, delay = 0, as: Tag = 'div', className }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Sem suporte a IntersectionObserver, mostra direto em vez de esconder para sempre.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // Antecipa um pouco para o elemento já chegar visível na tela.
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      data-reveal=""
      data-visible={visible || undefined}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
