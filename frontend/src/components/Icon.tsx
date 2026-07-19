import type { SVGProps } from 'react';

/**
 * Ícones de traço, desenhados na mesma grade de 24px e com o mesmo peso de linha.
 * Herdam currentColor e o tamanho vem por prop — diferente dos emoji do protótipo,
 * que não acompanhavam a cor do tema nem escalavam junto com o texto.
 */
export type IconName =
  | 'check'
  | 'close'
  | 'plus'
  | 'minus'
  | 'sun'
  | 'moon'
  | 'download'
  | 'arrow-left'
  | 'arrow-right'
  | 'windows'
  | 'chart'
  | 'receipt'
  | 'card'
  | 'repeat'
  | 'tag'
  | 'palette'
  | 'shield'
  | 'star'
  | 'cloud'
  | 'alert'
  | 'sparkle'
  | 'instagram'
  | 'x'
  | 'youtube';

const PATHS: Record<IconName, JSX.Element> = {
  check: <path d="m4.5 12.5 5 5 10-11" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4.1" />
      <path d="M12 2.6v2.2M12 19.2v2.2M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2.6 12h2.2M19.2 12h2.2M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" />
    </>
  ),
  moon: <path d="M20.5 14.2A8.4 8.4 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7z" />,
  download: <path d="M12 3.5v12m0 0 4.5-4.5M12 15.5 7.5 11M4 19.5h16" />,
  'arrow-left': <path d="M19 12H5m0 0 6-6m-6 6 6 6" />,
  'arrow-right': <path d="M5 12h14m0 0-6-6m6 6-6 6" />,
  windows: (
    <path d="M3.5 6.3 10 5.4v6.1H3.5zM11.5 5.2 20.5 4v7.5h-9zM3.5 12.5H10v6.1l-6.5-.9zM11.5 12.5h9V20l-9-1.2z" />
  ),
  chart: <path d="M4 20V10m5 10V4m5 16v-7m5 7V7" />,
  receipt: (
    <>
      <path d="M5 3.5h14v17l-2.3-1.6-2.4 1.6-2.3-1.6-2.4 1.6L7.3 19 5 20.5z" />
      <path d="M9 8.5h6M9 12.5h6" />
    </>
  ),
  card: (
    <>
      <rect x="2.8" y="5" width="18.4" height="14" rx="2.4" />
      <path d="M2.8 9.8h18.4M6.5 14.6h3" />
    </>
  ),
  repeat: <path d="M4 9.5A4.5 4.5 0 0 1 8.5 5H20m0 0-3.5-3.5M20 5l-3.5 3.5M20 14.5A4.5 4.5 0 0 1 15.5 19H4m0 0 3.5 3.5M4 19l3.5-3.5" />,
  tag: (
    <>
      <path d="M11.6 3.5H20v8.4l-8.7 8.7a1.6 1.6 0 0 1-2.3 0l-6.1-6.1a1.6 1.6 0 0 1 0-2.3z" />
      <circle cx="16.2" cy="7.8" r="1.3" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3.2a8.8 8.8 0 0 0 0 17.6c1.3 0 2-.9 2-1.9 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-1 .8-1.8 1.8-1.8h1.4a4.6 4.6 0 0 0 4.6-4.6c0-3.8-4-6.9-8.8-6.9z" />
      <circle cx="7.6" cy="11.4" r="1.15" />
      <circle cx="11.2" cy="7.6" r="1.15" />
      <circle cx="16" cy="8.8" r="1.15" />
    </>
  ),
  shield: <path d="M12 3 5 6v6c0 4.2 2.9 7.6 7 9 4.1-1.4 7-4.8 7-9V6z" />,
  star: <path d="m12 3.8 2.6 5.3 5.9.8-4.3 4.2 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.9l5.9-.8z" />,
  cloud: <path d="M7 18.5a4 4 0 0 1-.4-8 5.6 5.6 0 0 1 10.7 1.2A3.6 3.6 0 0 1 17 18.5z" />,
  alert: (
    <>
      <path d="M12 3.8 2.8 19.8h18.4z" />
      <path d="M12 9.8v4.2M12 17.1h.01" />
    </>
  ),
  sparkle: <path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9zM18.5 3.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />,
  instagram: (
    <>
      <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="4.6" />
      <circle cx="12" cy="12" r="3.7" />
      <path d="M16.9 7.1h.01" />
    </>
  ),
  x: <path d="M4 4l7.2 9.2L4.4 20h1.9l5.7-6L17 20h3l-7.6-9.7L18.8 4h-1.9l-5.3 5.6L6.9 4z" />,
  youtube: (
    <>
      <rect x="2.6" y="5.4" width="18.8" height="13.2" rx="3.6" />
      <path d="m10.3 9.4 4.8 2.6-4.8 2.6z" />
    </>
  ),
};

/** Ícones que são silhuetas cheias, não traço. */
const FILLED: ReadonlySet<IconName> = new Set<IconName>(['windows', 'x']);

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number;
  /** Rótulo para leitores de tela. Sem ele o ícone é tratado como decorativo. */
  label?: string;
}

export function Icon({ name, size = 20, label, ...rest }: IconProps) {
  const filled = FILLED.has(name);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      {...rest}
    >
      {PATHS[name]}
    </svg>
  );
}
