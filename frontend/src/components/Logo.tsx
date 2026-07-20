import { Link } from 'react-router-dom';

interface LogoProps {
  /** Sobre fundos escuros fixos (rodapé, aside de login). */
  onDark?: boolean;
  /**
   * Quando false, o logo vira apenas rótulo — sem link e sem hover. Usado nas telas
   * de autenticação, onde o caminho de volta é o botão "Voltar ao site".
   */
  asLink?: boolean;
}

export function Logo({ onDark = false, asLink = true }: LogoProps) {
  const className = ['logo', onDark && 'logo--on-dark', !asLink && 'logo--static'].filter(Boolean).join(' ');

  const conteudo = (
    <>
      <span className="logo-mark" aria-hidden="true">
        A
      </span>
      Amigo Financeiro
    </>
  );

  if (!asLink) {
    return (
      <span className={className} role="img" aria-label="Amigo Financeiro">
        {conteudo}
      </span>
    );
  }

  return (
    <Link to="/" className={className} aria-label="Amigo Financeiro — página inicial">
      {conteudo}
    </Link>
  );
}
