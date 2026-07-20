/**
 * Rola até o conteúdo de uma seção, parando logo abaixo do header fixo.
 *
 * Calcula o destino manualmente em vez de usar scrollIntoView + scroll-margin-top:
 * o header encolhe ao rolar, então a margem fixa erra o alvo. Aqui medimos a altura
 * real do header no momento do clique.
 *
 * As seções têm um padding grande no topo; parar na borda deixaria um vão vazio
 * (ou a faixa de fundo da seção) acima do título, parecendo sobra da seção anterior.
 * Por isso avançamos por quase todo esse padding e mantemos só um respiro.
 */

const RESPIRO = 28; // espaço visível entre o header e o topo do conteúdo da seção

export function scrollToSection(id: string): boolean {
  const alvo = document.getElementById(id);
  if (!alvo) return false;

  const header = document.querySelector<HTMLElement>('.header');
  // Após qualquer rolagem o header já estará no tamanho reduzido; usamos essa altura
  // para o conteúdo não parar coberto.
  const headerH = header?.offsetHeight ?? 0;

  const padTop = parseFloat(getComputedStyle(alvo).paddingTop) || 0;
  const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Alvo = topo da seção + o padding interno, descontando o header e deixando o respiro.
  const topo = alvo.getBoundingClientRect().top + window.scrollY + padTop - headerH - RESPIRO;

  window.scrollTo({ top: Math.max(0, topo), behavior: semMovimento ? 'auto' : 'smooth' });
  return true;
}
