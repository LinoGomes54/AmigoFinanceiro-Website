import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { Icon } from '../Icon.tsx';

interface FieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string;
  error?: string;
  /** Conteúdo à direita do label, como o link "Esqueci a senha". */
  labelAside?: ReactNode;
  /** Elemento sobreposto dentro do campo, como o botão de mostrar senha. */
  action?: ReactNode;
}

/**
 * Campo com label, erro e ligação por id/aria — o protótipo tinha labels soltos,
 * sem `for`, então clicar no texto não focava o input e o leitor de tela não
 * associava a mensagem de erro.
 */
export function Field({ label, error, labelAside, action, className, ...inputProps }: FieldProps) {
  const id = useId();
  const errorId = `${id}-erro`;

  return (
    <div className="field">
      {labelAside ? (
        <div className="field-row">
          <label className="field-label" htmlFor={id}>
            {label}
          </label>
          {labelAside}
        </div>
      ) : (
        <label className="field-label" htmlFor={id}>
          {label}
        </label>
      )}

      <div style={{ position: 'relative' }}>
        <input
          id={id}
          className={['input', action && 'input--with-action', className].filter(Boolean).join(' ')}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...inputProps}
        />
        {action}
      </div>

      {error && (
        <p className="field-error" id={errorId}>
          <Icon name="alert" size={14} />
          {error}
        </p>
      )}
    </div>
  );
}

interface AlertProps {
  tone: 'error' | 'success' | 'info';
  children: ReactNode;
}

export function Alert({ tone, children }: AlertProps) {
  return (
    // role=alert faz o leitor de tela anunciar assim que a mensagem aparece.
    <p className={`alert alert--${tone}`} role={tone === 'error' ? 'alert' : 'status'}>
      <Icon name={tone === 'error' ? 'alert' : 'check'} size={16} />
      {children}
    </p>
  );
}
