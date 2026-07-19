import { useTheme } from '../context/ThemeContext.tsx';
import { Icon } from './Icon.tsx';

/** Botão só de ícone: sol no claro, lua no escuro. */
export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  const rotulo = isDark ? 'Ativar modo claro' : 'Ativar modo escuro';

  return (
    <button type="button" onClick={toggleTheme} className="theme-toggle" aria-label={rotulo} title={rotulo}>
      {/* key remonta o svg a cada troca, disparando a animação de entrada. */}
      <Icon key={isDark ? 'moon' : 'sun'} name={isDark ? 'moon' : 'sun'} size={18} />
    </button>
  );
}
