import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { useScrolled } from '../hooks/useScrolled.ts';
import { Logo } from './Logo.tsx';
import { ThemeToggle } from './ThemeToggle.tsx';
import { LinkButton } from './ui/Button.tsx';

interface SiteHeaderProps {
  /**
   * Na landing os links são âncoras da própria página; nas outras rotas
   * precisam voltar para a home antes de rolar.
   */
  anchorPrefix?: string;
}

const LINKS = [
  ['#recursos', 'Funcionalidades'],
  ['#planos', 'Planos'],
  ['#faq', 'Perguntas'],
] as const;

export function SiteHeader({ anchorPrefix = '' }: SiteHeaderProps) {
  const scrolled = useScrolled();
  const { user } = useAuth();

  return (
    <header className="header" data-scrolled={scrolled}>
      <nav className="container header-nav" aria-label="Principal">
        <Logo />

        <div className="header-links">
          {LINKS.map(([href, label]) => (
            <Link key={href} to={`${anchorPrefix}${href}`} className="header-link">
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
