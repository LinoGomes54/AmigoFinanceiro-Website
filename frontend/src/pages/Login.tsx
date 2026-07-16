import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, fieldStyle, LabeledField } from '../components/AuthField.tsx';
import { Logo } from '../components/Logo.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { ApiError } from '../lib/api.ts';

const MINI_BARS = [30, 52, 40, 68, 48, 82, 60];

export function Login() {
  const { entrar } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [remember, setRemember] = useState(true);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [focus, setFocus] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();

    const errs: Record<string, string> = {};
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errs.email = 'Email inválido.';
    if (!senha) errs.senha = 'Informe sua senha.';
    if (Object.keys(errs).length) {
      setErrors(errs);
      setFormError('');
      setSuccess(false);
      return;
    }

    setErrors({});
    setFormError('');
    setSuccess(false);
    setLoading(true);

    try {
      await entrar({ email, senha });
      setSuccess(true);
      navigate('/');
    } catch (err) {
      if (err instanceof ApiError) {
        // 422 traz erro por campo; 401 e demais viram mensagem geral do formulário.
        if (Object.keys(err.fieldErrors).length) setErrors(err.fieldErrors);
        else setFormError(err.message);
      } else {
        setFormError('Erro inesperado. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        fontFamily: "'Manrope', system-ui, sans-serif",
        color: '#0b1f3a',
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1.05fr 1fr',
        background: '#f5f8fd',
      }}
      data-split
    >
      <div
        style={{
          position: 'relative',
          background: '#0a2a52',
          color: '#d4e4fb',
          padding: 48,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        data-aside
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(600px 380px at 15% 10%, rgba(47,134,240,0.35) 0%, rgba(47,134,240,0) 60%), radial-gradient(500px 340px at 90% 90%, rgba(22,102,214,0.28) 0%, rgba(22,102,214,0) 60%)',
          }}
        />
        <Logo color="#fff" style={{ position: 'relative' }} />

        <div
          style={{
            position: 'relative',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth: 420,
          }}
        >
          <h2
            style={{
              fontFamily: "'Space Grotesk'",
              fontWeight: 700,
              fontSize: 32,
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
              margin: 0,
              color: '#fff',
            }}
          >
            Que bom te ver de novo.
          </h2>
          <p style={{ fontSize: 16, color: '#9fbce6', margin: '14px 0 28px' }}>
            Entre para acessar seus dados sincronizados na nuvem — de qualquer computador, sempre atualizados.
          </p>

          <div
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 16,
              padding: 18,
              backdropFilter: 'blur(4px)',
            }}
          >
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.07)', borderRadius: 10, padding: '10px 12px' }}>
                <div style={{ fontSize: 11, color: '#9fbce6', fontWeight: 600 }}>Saldo do mês</div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk'",
                    fontWeight: 700,
                    fontSize: 19,
                    color: '#fff',
                    marginTop: 2,
                  }}
                >
                  R$ 3.220
                </div>
              </div>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.07)', borderRadius: 10, padding: '10px 12px' }}>
                <div style={{ fontSize: 11, color: '#9fbce6', fontWeight: 600 }}>Sincronizado</div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk'",
                    fontWeight: 700,
                    fontSize: 19,
                    color: '#8fbcff',
                    marginTop: 2,
                  }}
                >
                  ✓ agora
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 54 }}>
              {MINI_BARS.map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${h}%`,
                    borderRadius: 4,
                    background: i === MINI_BARS.length - 1 ? '#8fbcff' : 'rgba(143,188,255,0.35)',
                  }}
                />
              ))}
            </div>
          </div>

          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '24px 0 0',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <li style={{ display: 'flex', gap: 12, fontSize: 14.5, color: '#dbe8fb' }}>
              <span style={{ color: '#8fbcff', fontWeight: 800 }}>✓</span> Acesso de qualquer dispositivo
            </li>
            <li style={{ display: 'flex', gap: 12, fontSize: 14.5, color: '#dbe8fb' }}>
              <span style={{ color: '#8fbcff', fontWeight: 800 }}>✓</span> Backup automático na nuvem
            </li>
          </ul>
        </div>
        <p style={{ position: 'relative', fontSize: 13, color: '#6b8bb8', margin: 0 }}>
          A mesma conta funciona no app desktop.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '40px 24px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ width: '100%', maxWidth: 400 }}>
          <Link
            to="/"
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#5a6a82',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            ← Voltar ao site
          </Link>
          <h1
            style={{
              fontFamily: "'Space Grotesk'",
              fontWeight: 700,
              fontSize: 30,
              letterSpacing: '-0.02em',
              margin: '22px 0 6px',
            }}
          >
            Entrar na sua conta
          </h1>
          <p style={{ fontSize: 15, color: '#5a6a82', margin: '0 0 28px' }}>
            Não tem conta?{' '}
            <Link to="/cadastro" style={{ fontWeight: 700 }}>
              Criar conta Premium
            </Link>
          </p>

          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <LabeledField
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocus('email')}
              onBlur={() => setFocus('')}
              placeholder="voce@email.com"
              error={errors.email}
              style={fieldStyle(Boolean(errors.email), focus === 'email')}
            />

            <LabeledField
              label="Senha"
              name="senha"
              type={mostrarSenha ? 'text' : 'password'}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              onFocus={() => setFocus('senha')}
              onBlur={() => setFocus('')}
              placeholder="Sua senha"
              error={errors.senha}
              style={fieldStyle(Boolean(errors.senha), focus === 'senha', true)}
              labelAside={
                <a href="#" style={{ fontSize: 13, fontWeight: 600 }}>
                  Esqueci a senha
                </a>
              }
              adornment={
                <button
                  type="button"
                  onClick={() => setMostrarSenha((v) => !v)}
                  aria-label="Mostrar ou ocultar senha"
                  style={{
                    position: 'absolute',
                    right: 6,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 8,
                    fontSize: 15,
                    color: '#7c8aa0',
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {mostrarSenha ? 'Ocultar' : 'Mostrar'}
                </button>
              }
            />

            {formError && <Alert tone="error">{formError}</Alert>}

            <label
              style={{
                display: 'flex',
                gap: 10,
                alignItems: 'center',
                fontSize: 14,
                color: '#47586f',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                style={{ width: 16, height: 16, accentColor: '#1666d6' }}
              />
              Manter conectado
            </label>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? '#5a8fd6' : '#1666d6',
                color: '#fff',
                fontFamily: "'Manrope',sans-serif",
                fontWeight: 700,
                fontSize: 16,
                padding: 15,
                border: 'none',
                borderRadius: 12,
                cursor: loading ? 'default' : 'pointer',
                boxShadow: '0 12px 26px -12px rgba(22,102,214,0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                transition: 'background 0.2s, transform 0.2s',
              }}
            >
              {loading ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                  <span
                    style={{
                      width: 16,
                      height: 16,
                      border: '2px solid rgba(255,255,255,0.4)',
                      borderTopColor: '#fff',
                      borderRadius: '50%',
                      display: 'inline-block',
                      animation: 'spin 0.7s linear infinite',
                    }}
                  />
                  Entrando…
                </span>
              ) : (
                'Entrar'
              )}
            </button>

            {success && <Alert tone="success">Login efetuado! Redirecionando…</Alert>}
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '26px 0' }}>
            <div style={{ flex: 1, height: 1, background: '#e2e9f2' }} />
            <span style={{ fontSize: 13, color: '#9aa6ba', fontWeight: 600 }}>ou</span>
            <div style={{ flex: 1, height: 1, background: '#e2e9f2' }} />
          </div>
          <Link
            to="/download"
            style={{
              display: 'block',
              textAlign: 'center',
              background: '#fff',
              border: '1.5px solid #d3ddf0',
              color: '#0b1f3a',
              fontWeight: 700,
              padding: 13,
              borderRadius: 12,
            }}
          >
            Usar o app grátis (sem login)
          </Link>
        </div>
      </div>
    </div>
  );
}
