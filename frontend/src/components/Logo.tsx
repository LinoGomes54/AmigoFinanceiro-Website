import { Link } from 'react-router-dom';

interface LogoProps {
  /** Sobre fundos escuros fixos (rodapé, aside de login). */
  onDark?: boolean;
}

export function Logo({ onDark = false }: LogoProps) {
  return (
    <Link to="/" className={`logo${onDark ? ' logo--on-dark' : ''}`} aria-label="Amigo Financeiro — página inicial">
      <span className="logo-mark" aria-hidden="true">
        A
      </span>
      Amigo Financeiro
    </Link>
  );
}
