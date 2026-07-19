import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout.tsx';
import { Icon } from '../components/Icon.tsx';
import { Button } from '../components/ui/Button.tsx';
import { Alert, Field } from '../components/ui/Field.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { ApiError } from '../lib/api.ts';

const VANTAGENS = [
  'Sincronização na nuvem entre dispositivos',
  'Backup automático e restauração',
  'Login no app com a mesma conta',
];

const FORCA_CORES = ['var(--danger)', 'var(--accent)', 'var(--strength-good)', 'var(--brand)'];
const FORCA_ROTULOS = ['fraca', 'razoável', 'boa', 'forte'];

/** Mede a força da senha de 0 a 4. */
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState('');
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
      return;
    }

    setErrors({});
    setFormError('');
    setLoading(true);

    try {
      await cadastrar({ nome, email, senha });
      navigate('/');
    } catch (err) {
      if (err instanceof ApiError) {
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
      asideBadge="Conta Premium"
      asideTitle="Seus dados em qualquer lugar, com backup."
      asideText="A conta serve só para o Premium — o app grátis funciona sem cadastro. Depois de criar, você entra com ela também no app desktop."
      asideExtra={
        <ul className="checklist">
          {VANTAGENS.map((item) => (
            <li key={item} style={{ color: 'var(--dark-muted)' }}>
              <Icon name="check" size={16} style={{ color: 'var(--brand-strong)' }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      }
      asideFooter="Premium por R$ 30/mês. Cancele quando quiser, sem fidelidade."
      title="Criar conta Premium"
      subtitle={
        <>
          Já tem conta?{' '}
          <Link to="/login" style={{ fontWeight: 700 }}>
            Entrar
          </Link>
        </>
      }
    >
      {/* noValidate: a validação nativa do browser bloquearia o submit e substituiria
          as mensagens de erro do layout pelas bolhas padrão. */}
      <form onSubmit={onSubmit} noValidate className="stack" style={{ gap: 'var(--space-5)' }}>
        <Field
          label="Nome completo"
          name="nome"
          type="text"
          autoComplete="name"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ana Souza"
          error={errors.nome}
        />

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

        <div>
          <Field
            label="Senha"
            name="senha"
            type="password"
            autoComplete="new-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Mínimo 8 caracteres"
            error={errors.senha}
          />
          {senha.length > 0 && (
            <>
              <div className="strength" aria-hidden="true">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} style={i < forca ? { background: FORCA_CORES[Math.max(0, forca - 1)] } : undefined} />
                ))}
              </div>
              {/* O leitor de tela recebe a força em texto; as barras são só visuais. */}
              <p className="sr-only" role="status">
                Força da senha: {FORCA_ROTULOS[Math.max(0, forca - 1)]}
              </p>
            </>
          )}
        </div>

        <div>
          <label className="checkbox">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            <span>
              Concordo com os <a href="#">Termos de uso</a> e a <a href="#">Política de privacidade</a>.
            </span>
          </label>
          {errors.agree && (
            <p className="field-error" style={{ marginTop: 'var(--space-2)' }}>
              <Icon name="alert" size={14} />
              {errors.agree}
            </p>
          )}
        </div>

        {formError && <Alert tone="error">{formError}</Alert>}

        <Button type="submit" size="lg" block disabled={loading}>
          {loading ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Criando conta…
            </>
          ) : (
            'Criar conta'
          )}
        </Button>
      </form>

      <p className="divider" style={{ margin: 'var(--space-8) 0' }}>
        ou
      </p>

      <Link to="/download" className="btn btn--secondary btn--block">
        Só quero o app grátis (sem conta)
      </Link>
    </AuthLayout>
  );
}
