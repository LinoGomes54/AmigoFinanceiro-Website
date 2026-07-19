import { Icon } from './Icon.tsx';
import { LinkButton } from './ui/Button.tsx';

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

function FeatureList({ features }: { features: Feature[] }) {
  return (
    <ul className="checklist">
      {features.map(([incluido, texto]) => (
        <li key={texto} data-off={!incluido || undefined}>
          <Icon name={incluido ? 'check' : 'close'} size={17} />
          <span>{texto}</span>
        </li>
      ))}
    </ul>
  );
}

interface PlanCardProps {
  nome: string;
  preco: string;
  por?: string;
  tag: string;
  cta: string;
  to: string;
  features: Feature[];
  /** Card em destaque (Premium). Não tem relação com o tema claro/escuro do site. */
  destaque?: boolean;
  badge?: string;
}

function PlanCard({ nome, preco, por, tag, cta, to, features, destaque = false, badge }: PlanCardProps) {
  return (
    <div className={`plan${destaque ? ' plan--featured' : ''}`}>
      {badge && (
        <span className="badge badge--accent plan-badge">
          <Icon name="cloud" size={14} />
          {badge}
        </span>
      )}
      <h3 className="plan-name">{nome}</h3>
      <p className="plan-price">
        {preco}
        {por && <span>{por}</span>}
      </p>
      <p className="plan-tag">{tag}</p>
      <LinkButton to={to} variant={destaque ? 'primary' : 'outline-dark'} block>
        {cta}
      </LinkButton>
      <FeatureList features={features} />
    </div>
  );
}

function TabelaPlanos() {
  const cell = (on: boolean, plano: string, recurso: string) => (
    <td>
      <Icon
        name={on ? 'check' : 'minus'}
        size={18}
        label={`${recurso}: ${on ? 'incluído' : 'não incluído'} no plano ${plano}`}
        style={{
          margin: '0 auto',
          color: on ? 'var(--brand-strong)' : 'var(--dark-subtle)',
        }}
      />
    </td>
  );

  return (
    <div
      style={{
        background: 'var(--dark-surface)',
        border: '1px solid var(--dark-border)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
      }}
    >
      <div style={{ overflowX: 'auto' }}>
        <table className="plan-table">
          <caption className="sr-only">Comparação entre os planos Grátis e Premium</caption>
          <thead>
            <tr>
              <th scope="col">Recurso</th>
              <th scope="col">Grátis</th>
              <th scope="col">Premium</th>
            </tr>
          </thead>
          <tbody>
            {TABELA.map(([recurso, gratis, premium]) => (
              <tr key={recurso}>
                <th scope="row" style={{ fontWeight: 'var(--weight-normal)', color: 'var(--dark-muted)' }}>
                  {recurso}
                </th>
                {cell(gratis, 'Grátis', recurso)}
                {cell(premium, 'Premium', recurso)}
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
    <div key={`pl-${mode}`} style={{ animation: 'rise var(--duration-slow) var(--ease-out)' }}>
      {mode === 'cards' ? (
        <div className="plans-row" style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'stretch' }}>
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
            destaque
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
