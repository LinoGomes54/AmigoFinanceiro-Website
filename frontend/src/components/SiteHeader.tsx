import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { useScrolled } from '../hooks/useScrolled.ts';
import { scrollToSection } from '../lib/scroll.ts';
import { Logo } from './Logo.tsx';
import { ThemeToggle } from './ThemeToggle.tsx';
import { LinkButton } from './ui/Button.tsx';

const LINKS = [
  ['recursos', 'Funcionalidades'],
  ['planos', 'Planos'],
  ['faq', 'Perguntas'],
] as const;

export function SiteHeader() {
  const scrolled = useScrolled();
  const { user } = useAuth();

  /**
   * Se a seção existe na página atual, rola até ela na hora e atualiza o hash.
   * Se não existe (estamos em outra rota), deixa o Link navegar para /#id — a home
   * então rola pelo useScrollToHash. Assim o mesmo link funciona de qualquer página.
   */
  function handleClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    if (!scrollToSection(id)) return;
    event.preventDefault();
    window.history.replaceState(null, '', `/#${id}`);
  }

  return (
    <header className="header" data-scrolled={scrolled}>
      <nav className="container header-nav" aria-label="Principal">
        <Logo />

        <div className="header-links">
          {LINKS.map(([id, label]) => (
            <Link key={id} to={`/#${id}`} className="header-link" onClick={(e) => handleClick(e, id)}>
              {label}
            </Link>
          ))}
          <Link to="/download" className="header-link">
            Download
          </Link>
        </div>

        <div className="header-actions">
          <ThemeToggle />
          {user ? (
            <span className="header-link" style={{ color: 'var(--text)' }}>
              Olá, {user.nome.split(' ')[0]}
            </span>
          ) : (
            <>
              <LinkButton to="/login" variant="ghost">
                Entrar
              </LinkButton>
              <LinkButton to="/cadastro" variant="primary">
                Criar conta
              </LinkButton>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
