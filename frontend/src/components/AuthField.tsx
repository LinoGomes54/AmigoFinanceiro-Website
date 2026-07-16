import type { CSSProperties, InputHTMLAttributes, ReactNode } from 'react';

export function fieldStyle(hasError: boolean, focused: boolean, extraPaddingRight = false): CSSProperties {
  return {
    width: '100%',
    padding: '13px 14px',
    paddingRight: extraPaddingRight ? 70 : 14,
    fontFamily: "'Manrope',sans-serif",
    boxSizing: 'border-box',
    fontSize: 15,
    borderRadius: 11,
    border: hasError ? '1.5px solid #e0a4a4' : focused ? '1.5px solid #1666d6' : '1.5px solid #d8e1f0',
    background: hasError ? '#fdf3f3' : '#fff',
    outline: 'none',
    color: '#0b1f3a',
    boxShadow: focused ? '0 0 0 4px rgba(22,102,214,0.14)' : 'none',
    transition: 'border-color 0.18s, box-shadow 0.18s',
  };
}

export function FieldError({ children }: { children: ReactNode }) {
  if (!children) return null;
  return (
    <span
      style={{
        color: '#c0392b',
        fontSize: 13,
        fontWeight: 600,
        marginTop: 6,
        display: 'block',
      }}
    >
      {children}
    </span>
  );
}

interface LabeledFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  /** Conteúdo à direita do label, como o link "Esqueci a senha". */
  labelAside?: ReactNode;
  /** Elemento sobreposto dentro do campo, como o botão de mostrar senha. */
  adornment?: ReactNode;
}

export function LabeledField({ label, error, labelAside, adornment, ...inputProps }: LabeledFieldProps) {
  return (
    <div>
      {labelAside ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 7 }}>
          <label style={{ fontSize: 14, fontWeight: 700 }}>{label}</label>
          {labelAside}
        </div>
      ) : (
        <label style={{ display: 'block', fontSize: 14, fontWeight: 700, marginBottom: 7 }}>{label}</label>
      )}
      <div style={{ position: 'relative' }}>
        <input {...inputProps} />
        {adornment}
      </div>
      <FieldError>{error}</FieldError>
    </div>
  );
}

export function Alert({ tone, children }: { tone: 'error' | 'success' | 'info'; children: ReactNode }) {
  const palette = {
    error: { background: '#fdf3f3', border: '1px solid #e0c0c0', color: '#b23b3b', icon: '⚠' },
    success: { background: '#e8f5ee', border: '1px solid #bfe6cf', color: '#1c7a49', icon: '✓' },
    info: { background: '#e8f1fe', border: '1px solid #cfe0fb', color: '#0d4ea6', icon: '✓' },
  }[tone];

  return (
    <div
      style={{
        background: palette.background,
        border: palette.border,
        color: palette.color,
        borderRadius: 11,
        padding: '12px 14px',
        fontSize: 14,
        fontWeight: 600,
        display: 'flex',
        gap: 9,
        alignItems: 'center',
        animation: 'floatUp 0.25s ease',
      }}
    >
      <span style={{ fontSize: 17 }}>{palette.icon}</span>
      {children}
    </div>
  );
}
