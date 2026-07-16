import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'af-theme';

interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function temaInicial(): Theme {
  const salvo = localStorage.getItem(STORAGE_KEY);
  if (salvo === 'light' || salvo === 'dark') return salvo;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Mantém o tema no topo da árvore para que todas as páginas o apliquem — não só a
 * landing, que é a única com o botão de alternar.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const inicial = temaInicial();
    setTheme(inicial);
    document.documentElement.setAttribute('data-theme', inicial);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((atual) => {
      const proximo: Theme = atual === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', proximo);
      localStorage.setItem(STORAGE_KEY, proximo);
      return proximo;
    });
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, isDark: theme === 'dark', toggleTheme }),
    [theme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme precisa estar dentro de um ThemeProvider.');
  return ctx;
}
