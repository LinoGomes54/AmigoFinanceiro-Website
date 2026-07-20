import { Link } from 'react-router-dom';
import { AnimatedBackground } from './AnimatedBackground.tsx';
import { Icon } from './Icon.tsx';
import { Logo } from './Logo.tsx';
import { ThemeToggle } from './ThemeToggle.tsx';

interface AuthLayoutProps {
  /** Painel lateral: título, texto e conteúdo livre da página. */
  asideTitle: string;
  asideText: string;
  asideExtra?: React.ReactNode;
  asideFooter: string;
  asideBadge?: string;
  /** Coluna do formulário. */
  title: string;
  subtitle: React.ReactNode;
  children: React.ReactNode;
}

/** Estrutura de duas colunas compartilhada por Login e Cadastro. */
export function AuthLayout({
  asideTitle,
  asideText,
  asideExtra,
  asideFooter,
  asideBadge,
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="auth">
      <a href="#formulario" className="skip-link">
        Pular para o formulário
      </a>
      <aside className="auth-aside">
        <div className="auth-aside-glow" aria-hidden="true" />
        <AnimatedBackground />
        <div style={{ position: 'relative' }}>
          <Logo onDark asLink={false} />
        </div>

        <div
          style={{
            position: 'relative',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth: '26rem',
          }}
        >
          {asideBadge && (
            <span className="badge badge--accent" style={{ alignSelf: 'flex-start', marginBottom: 'var(--space-5)' }}>
              <Icon name="star" size={14} />
              {asideBadge}
            </span>
          )}
          <h2 style={{ fontSize: 'var(--text-2xl)', color: 'var(--dark-text)' }}>{asideTitle}</h2>
          <p style={{ margin: 'var(--space-4) 0 var(--space-8)', color: 'var(--dark-muted)' }}>{asideText}</p>
          {asideExtra}
        </div>

        <p style={{ position: 'relative', fontSize: 'var(--text-sm)', color: 'var(--dark-subtle)' }}>{asideFooter}</p>
      </aside>

      <main className="auth-main" id="formulario">
        <div className="auth-theme-toggle">
          <ThemeToggle />
        </div>
        <div className="auth-form-wrap">
          <Link to="/" className="auth-back">
            <Icon name="arrow-left" size={16} />
            Voltar ao site
          </Link>
          <h1 className="auth-title">{title}</h1>
          <p className="auth-sub">{subtitle}</p>
          {children}
        </div>
      </main>
    </div>
  );
}
