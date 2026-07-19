import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout.tsx';
import { Icon } from '../components/Icon.tsx';
import { Button } from '../components/ui/Button.tsx';
import { Alert, Field } from '../components/ui/Field.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { ApiError } from '../lib/api.ts';

const MINI_BARS = [30, 52, 40, 68, 48, 82, 60];

/** Cartão do painel lateral com o resumo sincronizado. */
function SyncPreview() {
  return (
    <div
      style={{
        padding: 'var(--space-5)',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 'var(--radius-lg)',
      }}
      aria-hidden="true"
    >
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
        {[
          ['Saldo do mês', 'R$ 3.220', 'var(--dark-text)'],
          ['Sincronizado', 'agora', 'var(--brand-strong)'],
        ].map(([label, valor, cor]) => (
          <div
            key={label}
            style={{
              flex: 1,
              padding: 'var(--space-3)',
              background: 'rgba(255,255,255,0.06)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--dark-muted)', fontWeight: 600 }}>{label}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: cor }}>{valor}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 48 }}>
        {MINI_BARS.map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${h}%`,
              borderRadius: 3,
              background: i === MINI_BARS.length - 1 ? 'var(--brand)' : 'rgba(120,170,240,0.3)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function Login() {
  const { entrar } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [remember, setRemember] = useState(true);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();

    const errs: Record<string, string> = {};
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errs.email = 'Email inválido.';
    if (!senha) errs.senha = 'Informe sua senha.';
    if (Object.keys(errs).length) {
      setErrors(errs);
      setFormError('');
      return;
    }

    setErrors({});
    setFormError('');
    setLoading(true);

    try {
      await entrar({ email, senha });
      navigate('/');
    } catch (err) {
      if (err instanceof ApiError) {
        // 422 traz erro por campo; 401 e demais viram mensagem geral do formulário.
        if (Object.keys(err.fieldErrors).length) setErrors(err.fieldErrors);
        else setFormError(err.message);
      } else {
        setFormError('Erro inesperado. Tente novamente.');
      }
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      asideTitle="Que bom te ver de novo."
      asideText="Entre para acessar seus dados sincronizados na nuvem — de qualquer computador, sempre atualizados."
      asideExtra={
        <>
          <SyncPreview />
          <ul className="checklist" style={{ marginTop: 'var(--space-6)' }}>
            {['Acesso de qualquer dispositivo', 'Backup automático na nuvem'].map((item) => (
              <li key={item} style={{ color: 'var(--dark-muted)' }}>
                <Icon name="check" size={16} style={{ color: 'var(--brand-strong)' }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </>
      }
      asideFooter="A mesma conta funciona no app desktop."
      title="Entrar na sua conta"
      subtitle={
        <>
          Não tem conta?{' '}
          <Link to="/cadastro" style={{ fontWeight: 700 }}>
            Criar conta Premium
          </Link>
        </>
      }
    >
      {/* noValidate: a validação nativa do browser bloquearia o submit e substituiria
          as mensagens de erro do layout pelas bolhas padrão. */}
      <form onSubmit={onSubmit} noValidate className="stack" style={{ gap: 'var(--space-5)' }}>
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="voce@email.com"
          error={errors.email}
        />

        <Field
          label="Senha"
          name="senha"
          type={mostrarSenha ? 'text' : 'password'}
          autoComplete="current-password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Sua senha"
          error={errors.senha}
          labelAside={
            <a href="#" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
              Esqueci a senha
            </a>
          }
          action={
            <button
              type="button"
              onClick={() => setMostrarSenha((v) => !v)}
              className="input-action"
              aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {mostrarSenha ? 'Ocultar' : 'Mostrar'}
            </button>
          }
        />

        {formError && <Alert tone="error">{formError}</Alert>}

        <label className="checkbox">
          <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
          Manter conectado
        </label>

        <Button type="submit" size="lg" block disabled={loading}>
          {loading ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Entrando…
            </>
          ) : (
            'Entrar'
          )}
        </Button>
      </form>

      <p className="divider" style={{ margin: 'var(--space-8) 0' }}>
        ou
      </p>

      <Link to="/download" className="btn btn--secondary btn--block">
        Usar o app grátis (sem login)
      </Link>
    </AuthLayout>
  );
}
