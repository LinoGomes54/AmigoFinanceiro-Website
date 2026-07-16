import { Link } from 'react-router-dom';
import type { CSSProperties } from 'react';

interface LogoProps {
  /** Cor do texto. Nos fundos escuros o protótipo usa branco. */
  color?: string;
  size?: number;
  style?: CSSProperties;
}

export function Logo({ color = 'var(--af-text)', size = 34, style }: LogoProps) {
  return (
    <Link
      to="/"
      style={{ display: 'flex', alignItems: 'center', gap: 10, color, fontWeight: 800, ...style }}
    >
      <span
        style={{
          display: 'grid',
          placeItems: 'center',
          width: size,
          height: size,
          borderRadius: size * 0.3,
          background: 'linear-gradient(135deg, #2f86f0, #0f4fb0)',
          color: '#fff',
          fontFamily: "'Space Grotesk'",
          fontWeight: 700,
          fontSize: size * 0.53,
        }}
      >
        A
      </span>
      <span style={{ fontFamily: "'Space Grotesk'", fontSize: size * 0.53, letterSpacing: '-0.01em' }}>
        Amigo Financeiro
      </span>
    </Link>
  );
}
