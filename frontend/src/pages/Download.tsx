import { AppWindow } from '../components/AppWindow.tsx';
import { SimpleFooter } from '../components/Footer.tsx';
import { Icon } from '../components/Icon.tsx';
import { SiteHeader } from '../components/SiteHeader.tsx';
import { AnchorButton, LinkButton } from '../components/ui/Button.tsx';
import { Reveal } from '../components/ui/Reveal.tsx';
import { release } from '../lib/release.ts';

const BAR_HEIGHTS = [40, 62, 34, 78, 52, 88, 46, 70, 58, 92, 66, 80];

function StatCard({ label, valor, cor }: { label: string; valor: string; cor: string }) {
  return (
    <div
      style={{
        flex: 1,
        padding: 'var(--space-3) var(--space-4)',
        background: 'var(--surface-inset)',
        border: '1px solid var(--win-border)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--win-title)', fontWeight: 600 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-xl)', color: cor }}>
        {valor}
      </div>
    </div>
  );
}

/** Mockup da janela do app — ilustrativo, por isso fora da árvore de acessibilidade. */
function AppMock() {
  return (
    <AppWindow>
      <div style={{ padding: 'var(--space-4)' }} aria-hidden="true">
        <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
          <StatCard label="Entradas" valor="R$ 8.400" cor="var(--brand)" />
          <StatCard label="Saídas" valor="R$ 5.180" cor="var(--danger)" />
          <StatCard label="Saldo" valor="R$ 3.220" cor="var(--text)" />
        </div>
        <div
          style={{
            padding: 'var(--space-3)',
            border: '1px solid var(--win-border)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700 }}>Evolução anual por cartão</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 90, marginTop: 'var(--space-3)' }}>
            {BAR_HEIGHTS.map((h, i) => (
              <div
                key={i}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 2, height: '100%' }}
              >
                <div
                  style={{
                    height: `${h}%`,
                    borderRadius: '3px 3px 0 0',
                    background: 'var(--chart-bar)',
                  }}
                />
                <div
                  style={{
                    height: `${h * 0.4}%`,
                    borderRadius: '0 0 3px 3px',
                    background: 'color-mix(in srgb, var(--brand) 28%, transparent)',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppWindow>
  );
}

const PASSOS = [
  ['Baixe o instalador', 'Clique em baixar e salve o arquivo .exe no seu computador.'],
  ['Execute e instale', 'Abra o arquivo e siga o assistente. Leva menos de um minuto.'],
  ['Comece a usar', 'Abra o app e lance a primeira entrada. Sem conta, sem banco.'],
];

const REQUISITOS = [
  ['Sistema', 'Windows 10 / 11'],
  ['Arquitetura', '64-bit (x64)'],
  ['Memória', '4 GB RAM'],
  ['Espaço em disco', '120 MB'],
  ['Conexão', 'Só no Premium'],
];

const NOVIDADES: Array<[novo: boolean, texto: string]> = [
  [true, 'Parcelamento automático de compras no crédito.'],
  [true, 'Tema gradiente e prévia de cores ao vivo.'],
  [true, 'Previsão de recorrências nos meses futuros.'],
  [false, 'Melhorias de desempenho no dashboard anual.'],
];

export function Download() {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <SiteHeader anchorPrefix="/" />

      <main id="conteudo">
        {/* ---------------- HERO ---------------- */}
        <section className="section" style={{ position: 'relative', paddingTop: 'var(--space-16)' }}>
          <div className="hero-bg" aria-hidden="true">
            <span className="blob blob--1" />
            <span className="blob blob--3" />
          </div>

          <div
            className="container grid grid--2"
            style={{ position: 'relative', gap: 'var(--space-16)', alignItems: 'center' }}
          >
            <div className="hero-enter">
              <span className="badge badge--dot">Disponível para Windows</span>
              <h1 style={{ marginTop: 'var(--space-5)', fontSize: 'var(--text-4xl)' }}>Baixe o Amigo Financeiro</h1>
              <p
                style={{
                  marginTop: 'var(--space-4)',
                  maxWidth: '30rem',
                  fontSize: 'var(--text-lg)',
                  color: 'var(--text-muted)',
                }}
              >
                Grátis, sem cadastro e sem conectar o banco. Instale em segundos e comece a organizar o seu mês.
              </p>

              <div style={{ marginTop: 'var(--space-8)' }}>
                <AnchorButton href="#" size="lg" className="btn--download">
                  <Icon name="windows" size={30} />
                  <span>
                    <span className="btn-sub">Baixar para Windows</span>
                    <span className="btn-main">Amigo Financeiro {release.version}</span>
                  </span>
                </AnchorButton>
                <p
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 'var(--space-2) var(--space-4)',
                    marginTop: 'var(--space-4)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    color: 'var(--text-subtle)',
                  }}
                >
                  <span>Windows 10 e 11 (64-bit)</span>
                  <span aria-hidden="true">·</span>
                  <span>{release.fileSize}</span>
                  <span aria-hidden="true">·</span>
                  <span>Instalador .exe</span>
                  <span aria-hidden="true">·</span>
                  <span>Atualizado em {release.releaseDate}</span>
                </p>
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
                Sem cadastro para a versão gratuita ·{' '}
                <LinkButton to="/#planos" variant="ghost" style={{ padding: 0, fontSize: 'var(--text-sm)' }}>
                  ver planos
                </LinkButton>
              </p>
            </div>

            <div className="hero-visual">
              <AppMock />
            </div>
          </div>
        </section>

        {/* ---------------- PLATAFORMAS ---------------- */}
        <section className="container">
          <Reveal>
            <h2 className="eyebrow" style={{ color: 'var(--text-subtle)' }}>
              Disponível para
            </h2>
            <div
              className="card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-4)',
                borderColor: 'var(--brand)',
                borderWidth: 2,
              }}
            >
              <span className="tile" aria-hidden="true">
                <Icon name="windows" size={22} />
              </span>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-md)' }}>
                  Windows 10 e 11 (64-bit)
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                  {release.version} · {release.fileSize} · Instalador .exe
                </p>
              </div>
              <AnchorButton href="#">Baixar</AnchorButton>
            </div>
          </Reveal>
        </section>

        {/* ---------------- COMO INSTALAR ---------------- */}
        <section className="section">
          <div className="container">
            <Reveal className="section-head">
              <h2 className="section-title">Como instalar</h2>
              <p className="section-sub">Três passos e você já está registrando o primeiro lançamento.</p>
            </Reveal>
            <ol className="grid grid--3">
              {PASSOS.map(([titulo, texto], i) => (
                <Reveal key={titulo} as="li" delay={i * 90}>
                  <div className="card card--interactive" style={{ height: '100%' }}>
                    <span className="tile" aria-hidden="true" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                      {i + 1}
                    </span>
                    <h3 className="card-title" style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-lg)' }}>
                      {titulo}
                    </h3>
                    <p className="card-text">{texto}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------- REQUISITOS E NOVIDADES ---------------- */}
        <section className="section--tight container">
          <div className="grid grid--2">
            <Reveal>
              <div className="card card--lg" style={{ height: '100%' }}>
                <h2 className="card-title">Requisitos do sistema</h2>
                <dl style={{ margin: 'var(--space-5) 0 0' }}>
                  {REQUISITOS.map(([label, valor], i) => (
                    <div
                      key={label}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 'var(--space-4)',
                        padding: 'var(--space-3) 0',
                        borderBottom: i < REQUISITOS.length - 1 ? '1px solid var(--border)' : 'none',
                      }}
                    >
                      <dt style={{ color: 'var(--text-subtle)', fontWeight: 600 }}>{label}</dt>
                      <dd style={{ margin: 0, fontWeight: 700 }}>{valor}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="card card--lg" style={{ height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
                  <h2 className="card-title">Novidades</h2>
                  <span className="badge">{release.version}</span>
                </div>
                <ul className="checklist" style={{ marginTop: 'var(--space-5)' }}>
                  {NOVIDADES.map(([novo, texto]) => (
                    <li key={texto} data-off={!novo || undefined}>
                      <Icon name={novo ? 'plus' : 'sparkle'} size={16} />
                      <span>{texto}</span>
                    </li>
                  ))}
                </ul>
                <a href="#" style={{ display: 'inline-flex', gap: 6, marginTop: 'var(--space-5)', fontWeight: 700, fontSize: 'var(--text-sm)' }}>
                  Ver histórico de versões
                  <Icon name="arrow-right" size={16} />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div
              className="card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-4)',
                flexWrap: 'wrap',
                marginTop: 'var(--space-6)',
                background: 'var(--surface-inset)',
              }}
            >
              <span className="tile" aria-hidden="true">
                <Icon name="shield" size={20} />
              </span>
              <div style={{ flex: 1, minWidth: '15rem' }}>
                <p style={{ fontWeight: 700 }}>Instalador assinado e verificado</p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                  Distribuímos apenas o instalador oficial. Baixe sempre por esta página.
                </p>
              </div>
              <code
                style={{
                  padding: 'var(--space-2) var(--space-3)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-muted)',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                SHA-256: 9f2c…a41e
              </code>
            </div>
          </Reveal>
        </section>

        {/* ---------------- CTA PREMIUM ---------------- */}
        <section className="section--tight container">
          <Reveal>
            {/* Bloco de contraste proposital: fica escuro nos dois temas. */}
            <div
              data-dark-block
              style={{
                padding: 'var(--space-12)',
                textAlign: 'center',
                background: 'var(--dark-bg)',
                borderRadius: 'var(--radius-xl)',
              }}
            >
              <h2 className="section-title" style={{ fontSize: 'var(--text-2xl)', color: 'var(--dark-text)' }}>
                Quer acessar de mais de um dispositivo?
              </h2>
              <p style={{ margin: 'var(--space-3) auto var(--space-6)', maxWidth: '34rem', color: 'var(--dark-muted)' }}>
                Crie uma conta Premium por R$ 30/mês e tenha seus dados sincronizados na nuvem, com backup automático.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
                <LinkButton to="/cadastro">Criar conta Premium</LinkButton>
                <LinkButton to="/#planos" variant="outline-dark">
                  Comparar planos
                </LinkButton>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <SimpleFooter />
    </>
  );
}
