import { useEffect, useState } from 'react';

/** true quando a página passou de `limite` px de rolagem — usado para condensar o header. */
export function useScrolled(limite = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > limite);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [limite]);

  return scrolled;
}
