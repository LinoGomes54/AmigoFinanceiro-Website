interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

/** Botão só de ícone: sol no claro, lua no escuro. */
export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  const rotulo = isDark ? 'Ativar modo claro' : 'Ativar modo escuro';

  return (
    <button type="button" onClick={onToggle} className="af-theme-toggle" aria-label={rotulo} title={rotulo}>
      {/* key força a re-montagem do svg, disparando a animação de entrada a cada troca. */}
      <svg
        key={isDark ? 'lua' : 'sol'}
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {isDark ? (
          <path d="M20.5 14.2A8.4 8.4 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4.1" />
            <path d="M12 2.6v2.2M12 19.2v2.2M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2.6 12h2.2M19.2 12h2.2M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" />
          </>
        )}
      </svg>
    </button>
  );
}
