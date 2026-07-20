import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToSection } from '../lib/scroll.ts';

/**
 * Rola até a seção indicada pelo hash quando a página carrega ou o hash muda.
 * Cobre o caso de chegar de outra rota (ex.: Download → /#planos), em que o React
 * Router só atualiza o hash e não faz o salto nativo da âncora.
 *
 * As capturas de tela não têm dimensão fixa, então o layout ainda cresce por alguns
 * instantes após a montagem; repetimos a rolagem em alguns quadros até a posição
 * estabilizar, senão o alvo cai no lugar errado.
 */
export function useScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    const id = hash.slice(1);
    if (!id) return;

    const tentativas = [0, 120, 320, 600];
    const timers = tentativas.map((ms) => window.setTimeout(() => scrollToSection(id), ms));

    return () => timers.forEach(clearTimeout);
  }, [hash]);
}
