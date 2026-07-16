import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { clearToken, getToken, setToken } from '../lib/api.ts';
import * as authApi from '../lib/auth.ts';
import type { User } from '../lib/auth.ts';

interface AuthContextValue {
  user: User | null;
  /** true enquanto a sessão salva está sendo revalidada no backend. */
  loading: boolean;
  entrar: (input: { email: string; senha: string }) => Promise<User>;
  cadastrar: (input: { nome: string; email: string; senha: string }) => Promise<User>;
  sair: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Revalida no backend o token guardado no localStorage; se não colar mais, descarta.
  useEffect(() => {
    if (!getToken()) {
      setLoading(false);
      return;
    }

    let cancelado = false;

    authApi
      .me()
      .then(({ user: encontrado }) => {
        if (!cancelado) setUser(encontrado);
      })
      .catch(() => {
        clearToken();
      })
      .finally(() => {
        if (!cancelado) setLoading(false);
      });

    return () => {
      cancelado = true;
    };
  }, []);

  const entrar = useCallback(async (input: { email: string; senha: string }) => {
    const { user: logado, token } = await authApi.login(input);
    setToken(token);
    setUser(logado);
    return logado;
  }, []);

  const cadastrar = useCallback(async (input: { nome: string; email: string; senha: string }) => {
    const { user: criado, token } = await authApi.register(input);
    setToken(token);
    setUser(criado);
    return criado;
  }, []);

  const sair = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, loading, entrar, cadastrar, sair }),
    [user, loading, entrar, cadastrar, sair],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth precisa estar dentro de um AuthProvider.');
  return ctx;
}
