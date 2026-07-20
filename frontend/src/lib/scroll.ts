/**
 * Rola até uma seção parando logo abaixo do header fixo.
 *
 * Calcula o destino manualmente em vez de usar scrollIntoView + scroll-margin-top:
 * o header encolhe ao rolar, então a margem fixa erra o alvo. Aqui medimos a altura
 * real do header no momento do clique.
 */

const GAP = 16; // respiro entre o header e o topo da seção

export function scrollToSection(id: string): boolean {
  const alvo = document.getElementById(id);
  if (!alvo) return false;

  const header = document.querySelector<HTMLElement>('.header');
  // Após qualquer rolagem o header já estará no tamanho reduzido; usamos essa altura
  // para o alvo não parar coberto.
  const headerH = header?.offsetHeight ?? 0;

  const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const topo = alvo.getBoundingClientRect().top + window.scrollY - headerH - GAP;

  window.scrollTo({ top: Math.max(0, topo), behavior: semMovimento ? 'auto' : 'smooth' });
  return true;
}
