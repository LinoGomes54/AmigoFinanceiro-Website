import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, FieldError, fieldStyle, LabeledField } from '../components/AuthField.tsx';
import { Logo } from '../components/Logo.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { ApiError } from '../lib/api.ts';

const FORCA_CORES = ['#e0a4a4', '#e0b04a', '#7bc47f', '#1666d6'];

/** Mede a força da senha de 0 a 4, como no protótipo. */
function forcaDaSenha(senha: string): number {
  let n = 0;
  if (senha.length >= 8) n++;
  if (/[A-Z]/.test(senha) && /[a-z]/.test(senha)) n++;
  if (/\d/.test(senha)) n++;
  if (/[^A-Za-z0-9]/.test(senha)) n++;
  return n;
}

export function Cadastro() {
  const { cadastrar } = useAuth();
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [agree, setAgree] = useState(false);
  const [focus, setFocus] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const forca = forcaDaSenha(senha);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();

    const errs: Record<string, string> = {};
    if (!nome.trim()) errs.nome = 'Informe seu nome.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errs.email = 'Email inválido.';
    if (senha.length < 8) errs.senha = 'A senha precisa de ao menos 8 caracteres.';
    if (!agree) errs.agree = 'É preciso aceitar os termos para continuar.';
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
      await cadastrar({ nome, email, senha });
      setSuccess(true);
      navigate('/');
    } catch (err) {
      if (err instanceof ApiError) {
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
        gridTemplateColumns: '1fr 1fr',
        background: '#f5f8fd',
      }}
      data-split
    >
      <div
        style={{
          background: '#0a2a52',
          color: '#d4e4fb',
          padding: 48,
          display: 'flex',
          flexDirection: 'column',
        }}
        data-aside
      >
        <Logo color="#fff" />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 380 }}>
          <span
            style={{
              display: 'inline-flex',
              alignSelf: 'flex-start',
              alignItems: 'center',
              gap: 8,
              background: '#123a6b',
              color: '#8fbcff',
              padding: '6px 12px',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            ★ Conta Premium
          </span>
          <h2
            style={{
              fontFamily: "'Space Grotesk'",
              fontWeight: 700,
              fontSize: 34,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              margin: '18px 0 0',
              color: '#fff',
            }}
          >
            Seus dados em qualquer lugar, com backup.
          </h2>
          <p style={{ fontSize: 16, color: '#9fbce6', margin: '16px 0 28px' }}>
            A conta serve só para o Premium — o app grátis funciona sem cadastro. Depois de criar, você entra com ela
            também no app desktop.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              'Sincronização na nuvem entre dispositivos',
              'Backup automático e restauração',
              'Login no app com a mesma conta',
            ].map((item) => (
              <li key={item} style={{ display: 'flex', gap: 12, fontSize: 15, color: '#dbe8fb' }}>
                <span style={{ color: '#8fbcff', fontWeight: 800 }}>✓</span> {item}
              </li>
            ))}
          </ul>
        </div>
        <p style={{ fontSize: 13, color: '#6b8bb8', margin: 0 }}>
          Premium por R$ 30/mês. Cancele quando quiser, sem fidelidade.
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
        <div style={{ width: '100%', maxWidth: 420 }}>
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
            Criar conta Premium
          </h1>
          <p style={{ fontSize: 15, color: '#5a6a82', margin: '0 0 28px' }}>
            Já tem conta?{' '}
            <Link to="/login" style={{ fontWeight: 700 }}>
              Entrar
            </Link>
          </p>

          {/* noValidate: a validação nativa do browser bloquearia o submit e substituiria
              as mensagens de erro do layout pelas bolhas padrão. */}
          <form onSubmit={onSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <LabeledField
              label="Nome completo"
              name="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              onFocus={() => setFocus('nome')}
              onBlur={() => setFocus('')}
              placeholder="Ana Souza"
              error={errors.nome}
              style={fieldStyle(Boolean(errors.nome), focus === 'nome')}
            />

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

            <div>
              <LabeledField
                label="Senha"
                name="senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                onFocus={() => setFocus('senha')}
                onBlur={() => setFocus('')}
                placeholder="Mínimo 8 caracteres"
                error={errors.senha}
                style={fieldStyle(Boolean(errors.senha), focus === 'senha')}
              />
              {senha.length > 0 && (
                <div style={{ display: 'flex', gap: 5, marginTop: 9 }}>
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: 5,
                        borderRadius: 3,
                        background: i < forca ? FORCA_CORES[Math.max(0, forca - 1)] : '#e6ecf5',
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            <label
              style={{
                display: 'flex',
                gap: 10,
                alignItems: 'flex-start',
                fontSize: 13.5,
                color: '#47586f',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                style={{ marginTop: 2, width: 16, height: 16, accentColor: '#1666d6' }}
              />
              <span>
                Concordo com os <a href="#">Termos de uso</a> e a <a href="#">Política de privacidade</a>.
              </span>
            </label>
            {errors.agree && (
              <div style={{ marginTop: -8 }}>
                <FieldError>{errors.agree}</FieldError>
              </div>
            )}

            {formError && <Alert tone="error">{formError}</Alert>}

            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? '#5a8fd6' : '#1666d6',
                color: '#fff',
                fontFamily: "'Manrope', sans-serif",
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
                  Criando conta…
                </span>
              ) : (
                'Criar conta'
              )}
            </button>

            {success && <Alert tone="info">Conta criada! Agora é só entrar no app desktop com esse email.</Alert>}
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
            Só quero o app grátis (sem conta)
          </Link>
        </div>
      </div>
    </div>
  );
}
