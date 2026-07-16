import { Link } from 'react-router-dom';

export type PlanosMode = 'cards' | 'table';

type Feature = [incluido: boolean, texto: string];

const FREE_FEATURES: Feature[] = [
  [true, 'Uso ilimitado de todas as funcionalidades'],
  [true, 'Dados salvos localmente no seu computador'],
  [true, 'Dashboard, transações, cartões, recorrências'],
  [false, 'Sincronização entre dispositivos'],
  [false, 'Backup automático na nuvem'],
];

const PREMIUM_FEATURES: Feature[] = [
  [true, 'Tudo do plano grátis, sem limites'],
  [true, 'Dados salvos e sincronizados na nuvem'],
  [true, 'Acesso de qualquer dispositivo'],
  [true, 'Backup automático e restauração'],
  [true, 'Login no app desktop com a sua conta'],
];

const TABELA: Array<[recurso: string, gratis: boolean, premium: boolean]> = [
  ['Todas as funcionalidades do app', true, true],
  ['Dados salvos localmente', true, true],
  ['Sem necessidade de conta', true, false],
  ['Sincronização entre dispositivos', false, true],
  ['Acesso multi-dispositivo', false, true],
  ['Backup automático na nuvem', false, true],
];

interface PlanCardProps {
  nome: string;
  preco: string;
  por?: string;
  tag: string;
  cta: string;
  to: string;
  features: Feature[];
  dark?: boolean;
  badge?: string;
}

function PlanCard({ nome, preco, por, tag, cta, to, features, dark = false, badge }: PlanCardProps) {
  return (
    <div
      className={`af-plan-card ${dark ? 'af-plan-card--dark' : 'af-plan-card--light'}`}
      style={{
        background: dark ? 'linear-gradient(160deg,#123a6b,#0d2e58)' : '#fff',
        border: dark ? '1px solid #1e4d84' : '1px solid #e6ecf5',
        borderRadius: 20,
        padding: 32,
        position: 'relative',
        flex: 1,
        boxShadow: dark ? '0 30px 60px -30px rgba(0,0,0,0.5)' : 'none',
      }}
    >
      {badge && (
        <span
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: '#d99a3a',
            color: '#231604',
            fontWeight: 800,
            fontSize: 12,
            padding: '5px 12px',
            borderRadius: 999,
            animation: 'afPop .35s ease',
          }}
        >
          {badge}
        </span>
      )}
      <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 22, color: dark ? '#fff' : '#0b1f3a' }}>
        {nome}
      </div>
      <div
        style={{
          fontFamily: "'Space Grotesk'",
          fontWeight: 700,
          fontSize: 34,
          color: dark ? '#fff' : '#0b1f3a',
          marginTop: 10,
        }}
      >
        {preco}
        {por && (
          <span style={{ fontSize: 15, fontWeight: 600, color: dark ? '#9fbce6' : '#7c8aa0' }}>{por}</span>
        )}
      </div>
      <p style={{ fontSize: 14, color: dark ? '#9fbce6' : '#5a6a82', margin: '8px 0 20px', minHeight: 20 }}>{tag}</p>
      <Link
        to={to}
        className="af-plan-cta"
        style={{
          display: 'block',
          textAlign: 'center',
          background: dark ? '#2f86f0' : '#0b1f3a',
          color: '#fff',
          fontWeight: 700,
          padding: 13,
          borderRadius: 11,
          marginBottom: 22,
        }}
      >
        {cta}
      </Link>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {features.map(([incluido, texto], i) => (
          <li
            key={texto}
            className="af-feat-li"
            style={{
              display: 'flex',
              fontSize: 14.5,
              transitionDelay: `${i * 25}ms`,
              color: incluido ? (dark ? '#dbe8fb' : '#2b3b52') : dark ? '#6b8bb8' : '#9aa6ba',
            }}
          >
            <span style={{ color: incluido ? '#1666d6' : '#c26a72', fontWeight: 800, marginRight: 8 }}>
              {incluido ? '✓' : '✕'}
            </span>
            <span>{texto}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TabelaPlanos() {
  const cell = (on: boolean) => (
    <td style={{ textAlign: 'center', padding: '16px 20px', borderTop: '1px solid #16345e' }}>
      {on ? (
        <span style={{ color: '#8fbcff', fontWeight: 800, fontSize: 18 }}>✓</span>
      ) : (
        <span style={{ color: '#5a807b', fontWeight: 800, fontSize: 16 }}>—</span>
      )}
    </td>
  );

  return (
    <div style={{ background: '#123a6b', border: '1px solid #1e4d84', borderRadius: 20, overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: 20, color: '#9fbce6', fontWeight: 700, fontSize: 14 }}>
                Recurso
              </th>
              <th style={{ padding: 20, color: '#fff', fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 18 }}>
                Grátis
              </th>
              <th
                style={{ padding: 20, color: '#8fbcff', fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 18 }}
              >
                Premium
              </th>
            </tr>
          </thead>
          <tbody>
            {TABELA.map(([recurso, gratis, premium]) => (
              <tr key={recurso}>
                <td style={{ padding: '16px 20px', color: '#dbe8fb', fontSize: 15, borderTop: '1px solid #16345e' }}>
                  {recurso}
                </td>
                {cell(gratis)}
                {cell(premium)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Planos({ mode }: { mode: PlanosMode }) {
  return (
    <div key={`pl-${mode}`} style={{ animation: 'afRise .4s cubic-bezier(0.22,1,0.36,1)' }}>
      {mode === 'cards' ? (
        <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }} className="af-plans">
          <PlanCard
            nome="Grátis"
            preco="R$ 0"
            tag="Para sempre, sem cadastro."
            cta="Baixar grátis"
            to="/download"
            features={FREE_FEATURES}
          />
          <PlanCard
            nome="Premium"
            dark
            preco="R$ 30"
            por="/mês"
            tag="Cobrança mensal. Cancele quando quiser."
            cta="Criar conta Premium"
            to="/cadastro"
            features={PREMIUM_FEATURES}
            badge="Nuvem"
          />
        </div>
      ) : (
        <TabelaPlanos />
      )}
    </div>
  );
}
