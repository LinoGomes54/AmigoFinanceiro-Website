import { useState } from 'react';
import telaCartoes from '../assets/img/tela-cartoes.png';
import telaCategorias from '../assets/img/tela-categorias.png';
import telaConfig from '../assets/img/tela-config.png';
import telaDashboard from '../assets/img/tela-dashboard.png';
import telaRecorrencias from '../assets/img/tela-recorrencias.png';
import telaTransacoes from '../assets/img/tela-transacoes.png';
import { Screenshot } from '../components/AppWindow.tsx';
import { Faq } from '../components/Faq.tsx';
import { SiteFooter } from '../components/Footer.tsx';
import { HeroBackground } from '../components/HeroBackground.tsx';
import { Icon, type IconName } from '../components/Icon.tsx';
import { Lightbox } from '../components/Lightbox.tsx';
import { Planos, type PlanosMode } from '../components/Planos.tsx';
import { SiteHeader } from '../components/SiteHeader.tsx';
import { LinkButton } from '../components/ui/Button.tsx';
import { Reveal } from '../components/ui/Reveal.tsx';
import { useScrollToHash } from '../hooks/useScrollToHash.ts';

const DESTAQUES = [
  ['100% manual', 'Você decide o que entra. Zero conexão com banco.'],
  ['Local ou nuvem', 'No PC de graça, ou sincronizado no Premium.'],
  ['Windows', 'App desktop nativo para Windows 10 e 11.'],
];

interface Feature {
  icone: IconName;
  etiqueta: string;
  titulo: string;
  texto: string;
  itens: string[];
  img: string;
  alt: string;
}

const FEATURES: Feature[] = [
  {
    icone: 'chart',
    etiqueta: 'Dashboard',
    titulo: 'A visão do mês num relance',
    texto:
      'Entradas, saídas e saldo do mês no topo. Abaixo, um gráfico anual por cartão e a divisão de gastos por categoria — dá pra ver o padrão sem esforço.',
    itens: ['Entradas, saídas e saldo do mês', 'Gráfico anual comparando cartões', 'Gasto por categoria em rosca'],
    img: telaDashboard,
    alt: 'Dashboard do Amigo Financeiro',
  },
  {
    icone: 'receipt',
    etiqueta: 'Transações',
    titulo: 'Cada lançamento no lugar certo',
    texto:
      'Registre em segundos, busque por texto e filtre por cartão ou categoria. Compras no crédito podem ser parceladas — o app distribui as parcelas nos meses seguintes automaticamente.',
    itens: ['Busca e filtros por cartão / categoria', 'Parcelamento automático no crédito'],
    img: telaTransacoes,
    alt: 'Tela de transações',
  },
];

const CARDS_RECURSOS: Array<[IconName, string, string, string]> = [
  ['card', 'Cartões', 'Limite, fechamento, vencimento e faturas de cada cartão em um painel só.', telaCartoes],
  [
    'repeat',
    'Recorrências',
    'Salário e assinaturas viram lançamentos automáticos, com previsão dos meses seguintes.',
    telaRecorrencias,
  ],
  ['tag', 'Categorias', 'Personalizáveis, com cor e ícone próprios — do jeito que faz sentido pra você.', telaCategorias],
  ['palette', 'Personalização', 'Temas claro, escuro e gradiente, cores e fontes ajustáveis com prévia ao vivo.', telaConfig],
];

const PASSOS_CONTA = [
  'Você cria a conta aqui no site (nome, email e senha).',
  'No app desktop, entra com essa mesma conta.',
  'Seus dados passam a sincronizar na nuvem, com backup automático.',
];

export function Home() {
  const [modoPlanos, setModoPlanos] = useState<PlanosMode>('cards');
  const [lightbox, setLightbox] = useState<string | null>(null);
  useScrollToHash();

  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <SiteHeader />

      <main id="conteudo">
        {/* ---------------- HERO ---------------- */}
        <section className="section" style={{ position: 'relative', paddingTop: 'var(--space-20)' }}>
          <div className="hero-bg" aria-hidden="true">
            <span className="blob blob--1" />
            <span className="blob blob--2" />
            <span className="blob blob--3" />
            <HeroBackground />
          </div>

          <div
            className="container grid grid--2"
            style={{ position: 'relative', gap: 'var(--space-16)', alignItems: 'center' }}
            data-hero
          >
            <div className="hero-enter">
              <span className="badge badge--dot">Sem conectar o banco. Sem susto.</span>
              <h1 style={{ marginTop: 'var(--space-5)', fontSize: 'var(--text-4xl)' }}>
                Controle financeiro <span style={{ color: 'var(--brand)' }}>sem enrolação</span>.
              </h1>
              <p
                style={{
                  marginTop: 'var(--space-5)',
                  maxWidth: '30rem',
                  fontSize: 'var(--text-lg)',
                  color: 'var(--text-muted)',
                }}
              >
                Você anota entradas e saídas e enxerga exatamente para onde o dinheiro vai. Nada de integração bancária
                — só clareza sobre o seu mês, no seu computador.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginTop: 'var(--space-8)' }}>
                <LinkButton to="/download" size="lg">
                  <Icon name="download" size={18} />
                  Baixar grátis
                </LinkButton>
                <LinkButton to="/cadastro" variant="secondary" size="lg">
                  <Icon name="star" size={18} style={{ color: 'var(--accent)' }} />
                  Criar conta Premium
                </LinkButton>
              </div>
              <p
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  marginTop: 'var(--space-5)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-subtle)',
                }}
              >
                <Icon name="check" size={15} style={{ color: 'var(--brand)' }} />
                Grátis para sempre · sem cadastro · seus dados ficam no seu PC
              </p>
            </div>

            <div style={{ position: 'relative' }} className="hero-visual">
              <Screenshot src={telaDashboard} alt="Dashboard do Amigo Financeiro" onZoom={setLightbox} />
              {/* Embaixo à esquerda: no topo à direita cobriria os controles da janela. */}
              <div
                className="card float-card"
                style={{
                  position: 'absolute',
                  bottom: 'calc(var(--space-5) * -1)',
                  left: 'calc(var(--space-4) * -1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-3) var(--space-4)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <span className="tile tile--sm" aria-hidden="true">
                  <Icon name="card" size={17} />
                </span>
                <div>
                  <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-subtle)', fontWeight: 600 }}>
                    Fatura Inter
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-sm)' }}>
                    vence dia 6
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- DESTAQUES ---------------- */}
        <section className="container">
          <div className="grid grid--3">
            {DESTAQUES.map(([titulo, texto], i) => (
              <Reveal key={titulo} delay={i * 90}>
                <div className="card card--interactive" style={{ height: '100%' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 700 }}>
                    {titulo}
                  </p>
                  <p className="card-text">{texto}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------- RECURSOS ---------------- */}
        <section id="recursos" className="section">
          <div className="container">
            <Reveal className="section-head section-head--center">
              <span className="eyebrow">Tudo num lugar só</span>
              <h2 className="section-title">Ferramentas simples para um mês sob controle</h2>
              <p className="section-sub">Do lançamento rápido à visão anual — sem planilha, sem complicação.</p>
            </Reveal>

            {FEATURES.map((feature, i) => (
              <Reveal key={feature.titulo}>
                <div
                  className="grid grid--2 feature-row"
                  style={{
                    gap: 'var(--space-12)',
                    alignItems: 'center',
                    marginTop: i === 0 ? 0 : 'var(--space-20)',
                  }}
                >
                  {/* Alterna o lado da imagem sem quebrar a ordem de leitura no mobile. */}
                  <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
                    <span className="badge">
                      <Icon name={feature.icone} size={15} />
                      {feature.etiqueta}
                    </span>
                    <h3 style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-2xl)' }}>{feature.titulo}</h3>
                    <p style={{ margin: 'var(--space-3) 0 var(--space-6)', color: 'var(--text-muted)' }}>
                      {feature.texto}
                    </p>
                    <ul className="checklist">
                      {feature.itens.map((item) => (
                        <li key={item}>
                          <Icon name="check" size={17} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Screenshot src={feature.img} alt={feature.alt} onZoom={setLightbox} />
                </div>
              </Reveal>
            ))}

            <div className="grid grid--2" style={{ gap: 'var(--space-12)', marginTop: 'var(--space-20)' }}>
              {CARDS_RECURSOS.map(([icone, titulo, texto, img], i) => (
                <Reveal key={titulo} delay={(i % 2) * 90}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <span className="tile" aria-hidden="true">
                      <Icon name={icone} size={20} />
                    </span>
                    <h3 style={{ fontSize: 'var(--text-xl)' }}>{titulo}</h3>
                  </div>
                  <p className="card-text" style={{ margin: 'var(--space-3) 0 var(--space-5)' }}>
                    {texto}
                  </p>
                  <Screenshot src={img} alt={`Tela de ${titulo.toLowerCase()}`} onZoom={setLightbox} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- PLANOS ---------------- */}
        <section id="planos" className="section" style={{ background: 'var(--dark-bg)' }}>
          <div className="container">
            <Reveal className="section-head section-head--center">
              <span className="eyebrow" style={{ color: 'var(--brand-strong)' }}>
                Planos
              </span>
              <h2 className="section-title" style={{ color: 'var(--dark-text)' }}>
                Comece grátis. Vá pra nuvem quando quiser.
              </h2>
              <p className="section-sub" style={{ color: 'var(--dark-muted)' }}>
                As mesmas funcionalidades nos dois planos. O Premium adiciona sincronização e backup.
              </p>
            </Reveal>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-8)' }}>
              <div className="segmented" role="group" aria-label="Formato de exibição dos planos">
                <button type="button" onClick={() => setModoPlanos('cards')} aria-pressed={modoPlanos === 'cards'}>
                  Cards
                </button>
                <button type="button" onClick={() => setModoPlanos('table')} aria-pressed={modoPlanos === 'table'}>
                  Tabela
                </button>
              </div>
            </div>

            <Planos mode={modoPlanos} />

            <p
              style={{
                marginTop: 'var(--space-8)',
                textAlign: 'center',
                fontSize: 'var(--text-sm)',
                color: 'var(--dark-subtle)',
              }}
            >
              Premium por <strong style={{ color: 'var(--dark-muted)' }}>R$ 30/mês</strong> — cancele quando quiser, sem
              fidelidade.
            </p>
          </div>
        </section>

        {/* ---------------- DOWNLOAD ---------------- */}
        <section id="download" className="section">
          <div className="container">
            <Reveal>
              <div
                className="card card--lg"
                style={{
                  textAlign: 'center',
                  padding: 'var(--space-16) var(--space-8)',
                  background: 'linear-gradient(160deg, var(--brand-soft), var(--surface))',
                }}
              >
                <h2 className="section-title">Baixe o Amigo Financeiro</h2>
                <p className="section-sub" style={{ marginBottom: 'var(--space-8)' }}>
                  Grátis, sem cadastro. Baixe e comece hoje.
                </p>
                <LinkButton to="/download" size="lg" className="btn--download">
                  <Icon name="windows" size={26} />
                  <span>
                    <span className="btn-sub">Baixar para</span>
                    <span className="btn-main">Windows</span>
                  </span>
                </LinkButton>
                <p style={{ marginTop: 'var(--space-5)', fontSize: 'var(--text-sm)', color: 'var(--text-subtle)' }}>
                  Windows 10+ · ~40 MB
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------------- CONTA PREMIUM ---------------- */}
        <section className="section--tight container">
          <Reveal>
            <div className="card card--lg grid grid--2" style={{ gap: 'var(--space-12)', alignItems: 'center' }}>
              <div>
                <span className="badge badge--accent">
                  <Icon name="star" size={14} />
                  Premium
                </span>
                <h2 style={{ margin: 'var(--space-4) 0 0', fontSize: 'var(--text-2xl)' }}>
                  Conta só pra quem quer nuvem
                </h2>
                <p style={{ margin: 'var(--space-3) 0 var(--space-6)', color: 'var(--text-muted)' }}>
                  O app grátis funciona 100% sem conta. Você só cria uma conta se quiser sincronizar entre dispositivos
                  e ter backup automático — e o cadastro acontece aqui no site.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                  <LinkButton to="/cadastro">Criar conta Premium</LinkButton>
                  <LinkButton to="/login" variant="secondary">
                    Já tenho conta
                  </LinkButton>
                </div>
              </div>

              <div
                style={{
                  padding: 'var(--space-6)',
                  background: 'var(--surface-inset)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <p style={{ fontWeight: 700, marginBottom: 'var(--space-4)' }}>Como funciona o login</p>
                <ol className="stack" style={{ gap: 'var(--space-4)' }}>
                  {PASSOS_CONTA.map((passo, i) => (
                    <li key={passo} style={{ display: 'flex', gap: 'var(--space-3)', color: 'var(--text-muted)' }}>
                      <span className="tile tile--sm" aria-hidden="true" style={{ fontWeight: 700 }}>
                        {i + 1}
                      </span>
                      <span style={{ paddingTop: 4 }}>{passo}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ---------------- FAQ ---------------- */}
        <section id="faq" className="section">
          <div className="container container--narrow">
            <Reveal className="section-head section-head--center">
              <span className="eyebrow">Perguntas frequentes</span>
              <h2 className="section-title">Ainda em dúvida?</h2>
            </Reveal>
            <Faq />
          </div>
        </section>
      </main>

      <SiteFooter />
      <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
    </>
  );
}
