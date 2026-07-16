import { useCallback, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'af-theme';

function temaInicial(): Theme {
  const salvo = localStorage.getItem(STORAGE_KEY);
  if (salvo === 'light' || salvo === 'dark') return salvo;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** Tema claro/escuro persistido, aplicado via data-theme no <html>. */
export function useTheme() {
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

  return { theme, toggleTheme, isDark: theme === 'dark' };
}
