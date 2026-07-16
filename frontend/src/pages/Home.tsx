import { useState } from 'react';
import { Link } from 'react-router-dom';
import telaCartoes from '../assets/img/tela-cartoes.png';
import telaCategorias from '../assets/img/tela-categorias.png';
import telaConfig from '../assets/img/tela-config.png';
import telaDashboard from '../assets/img/tela-dashboard.png';
import telaRecorrencias from '../assets/img/tela-recorrencias.png';
import telaTransacoes from '../assets/img/tela-transacoes.png';
import { Screenshot } from '../components/AppWindow.tsx';
import { Faq } from '../components/Faq.tsx';
import { SiteFooter } from '../components/Footer.tsx';
import { Lightbox } from '../components/Lightbox.tsx';
import { Logo } from '../components/Logo.tsx';
import { Planos, type PlanosMode } from '../components/Planos.tsx';
import { ThemeToggle } from '../components/ThemeToggle.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { useTheme } from '../context/ThemeContext.tsx';
import { useScrolled } from '../hooks/useScrolled.ts';

const DESTAQUES = [
  ['100% manual', 'Você decide o que entra. Zero conexão com banco.'],
  ['Local ou nuvem', 'No PC de graça, ou sincronizado no Premium.'],
  ['Windows', 'App desktop nativo para Windows 10 e 11.'],
];

/** Cada tile tem o pastel do tema claro e o equivalente escurecido para o tema escuro. */
const CARDS_RECURSOS: Array<
  [icone: string, fundoClaro: string, fundoEscuro: string, titulo: string, texto: string, img: string]
> = [
  [
    '💳',
    '#fdf2e2',
    '#3a2e18',
    'Cartões',
    'Limite, fechamento, vencimento e faturas de cada cartão em um painel só.',
    telaCartoes,
  ],
  [
    '🔁',
    '#e7f3ff',
    '#14304f',
    'Recorrências',
    'Salário e assinaturas viram lançamentos automáticos, com previsão dos meses seguintes.',
    telaRecorrencias,
  ],
  [
    '🏷️',
    '#f0ebfa',
    '#2b2440',
    'Categorias',
    'Personalizáveis, com cor e ícone próprios — do jeito que faz sentido pra você.',
    telaCategorias,
  ],
  [
    '🎨',
    '#e8f1fe',
    '#16294a',
    'Personalização',
    'Temas claro, escuro e gradiente, cores e fontes ajustáveis com prévia ao vivo.',
    telaConfig,
  ],
];

export function Home() {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const scrolled = useScrolled();
  const [modoPlanos, setModoPlanos] = useState<PlanosMode>('cards');
  const [lightbox, setLightbox] = useState<string | null>(null);

  const base = isDark ? '11,18,32' : '245,248,253';
  const pillOn = {
    background: '#2f86f0',
    color: '#04203f',
    border: 'none',
    borderRadius: 999,
    padding: '9px 22px',
    fontWeight: 700,
    fontSize: 14,
    cursor: 'pointer',
    fontFamily: "'Manrope',sans-serif",
  };
  const pillOff = { ...pillOn, background: 'none', color: '#9fbce6' };

  return (
    <div
      style={{
        fontFamily: "'Manrope', system-ui, sans-serif",
        color: 'var(--af-text)',
        background: 'var(--af-bg)',
        overflowX: 'hidden',
        lineHeight: 1.5,
      }}
    >
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: scrolled ? `rgba(${base},0.92)` : `rgba(${base},0.7)`,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: scrolled
            ? isDark
              ? '1px solid #223452'
              : '1px solid #e2e9f2'
            : '1px solid rgba(226,233,242,0)',
          boxShadow: scrolled ? '0 10px 30px -18px rgba(11,31,58,0.5)' : '0 0 0 rgba(0,0,0,0)',
          transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
        }}
      >
        <nav
          style={{
            maxWidth: 1160,
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            height: scrolled ? 58 : 72,
            transition: 'height 0.3s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <Logo />
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} data-navlinks>
            <a href="#recursos" style={{ color: 'var(--af-nav)', fontWeight: 600, fontSize: 15 }}>
              Funcionalidades
            </a>
            <a href="#planos" style={{ color: 'var(--af-nav)', fontWeight: 600, fontSize: 15 }}>
              Planos
            </a>
            <Link to="/download" style={{ color: 'var(--af-nav)', fontWeight: 600, fontSize: 15 }}>
              Download
            </Link>
            <a href="#faq" style={{ color: 'var(--af-nav)', fontWeight: 600, fontSize: 15 }}>
              Perguntas
            </a>
          </div>
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          {user ? (
            <span style={{ color: 'var(--af-text)', fontWeight: 700, fontSize: 15, padding: '9px 8px' }}>
              Olá, {user.nome.split(' ')[0]}
            </span>
          ) : (
            <>
              <Link to="/login" style={{ color: 'var(--af-text)', fontWeight: 700, fontSize: 15, padding: '9px 8px' }}>
                Entrar
              </Link>
              <Link
                to="/cadastro"
                className="af-hover-cta"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: '#1666d6',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 15,
                  padding: '10px 18px',
                  borderRadius: 10,
                  boxShadow: '0 6px 16px -6px rgba(22,102,214,0.6)',
                }}
              >
                Criar conta
              </Link>
            </>
          )}
        </nav>
      </header>

      <section id="top" style={{ position: 'relative', padding: '84px 24px 40px' }}>
        <div className="af-hero-bg" aria-hidden="true">
          <span className="af-blob af-blob-1" />
          <span className="af-blob af-blob-2" />
          <span className="af-blob af-blob-3" />
        </div>
        <div
          style={{
            position: 'relative',
            maxWidth: 1160,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1.05fr 1fr',
            gap: 56,
            alignItems: 'center',
          }}
          data-hero-grid
        >
          <div>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#e8f1fe',
                color: '#0d4ea6',
                border: '1px solid #cfe0fb',
                padding: '7px 14px',
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#2f86f0' }} />
              Sem conectar o banco. Sem susto.
            </span>
            <h1
              style={{
                fontFamily: "'Space Grotesk'",
                fontWeight: 700,
                fontSize: 56,
                lineHeight: 1.04,
                letterSpacing: '-0.025em',
                margin: '20px 0 0',
                textWrap: 'balance',
              }}
            >
              Controle financeiro <span style={{ color: '#1666d6' }}>sem enrolação</span>.
            </h1>
            <p style={{ fontSize: 19, color: 'var(--af-muted-1)', margin: '20px 0 0', maxWidth: 520, textWrap: 'pretty' }}>
              Você anota entradas e saídas e enxerga exatamente para onde o dinheiro vai. Nada de integração bancária —
              só clareza sobre o seu mês, no seu computador.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 32 }}>
              <Link
                to="/download"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: '#0b1f3a',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 16,
                  padding: '15px 24px',
                  borderRadius: 12,
                  boxShadow: '0 12px 28px -12px rgba(10,38,36,0.7)',
                }}
              >
                <span style={{ fontSize: 18 }}>↓</span> Baixar grátis
                <span style={{ opacity: 0.6, fontWeight: 600, fontSize: 13 }}>Windows</span>
              </Link>
              <Link
                to="/cadastro"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'var(--af-surface)',
                  color: 'var(--af-text)',
                  fontWeight: 700,
                  fontSize: 16,
                  padding: '15px 24px',
                  borderRadius: 12,
                  border: '1.5px solid var(--af-border-2)',
                }}
              >
                <span style={{ color: '#d99a3a' }}>★</span> Criar conta Premium
              </Link>
            </div>
            <p
              style={{
                fontSize: 14,
                color: 'var(--af-muted-3)',
                marginTop: 18,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ color: '#1666d6', fontWeight: 800 }}>✓</span> Grátis para sempre &nbsp;·&nbsp; sem
              cadastro &nbsp;·&nbsp; seus dados ficam no seu PC
            </p>
          </div>
          <div style={{ position: 'relative' }}>
            {/* Fica embaixo à esquerda: no topo à direita cobriria os controles da janela. */}
            <div
              style={{
                position: 'absolute',
                bottom: -20,
                left: -14,
                background: 'var(--af-win-bg)',
                border: '1px solid var(--af-win-border)',
                borderRadius: 12,
                boxShadow: '0 18px 40px -20px var(--af-win-shadow)',
                padding: '10px 14px',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: isDark ? '#1a2c4d' : '#e8f1fe',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 16,
                }}
              >
                💳
              </span>
              <div>
                <div style={{ fontSize: 10, color: 'var(--af-win-title)', fontWeight: 600 }}>Fatura Inter</div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: 'var(--af-text)',
                    fontFamily: "'Space Grotesk'",
                  }}
                >
                  vence dia 6
                </div>
              </div>
            </div>
            <Screenshot src={telaDashboard} alt="Dashboard do Amigo Financeiro" onZoom={setLightbox} />
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1160, margin: '32px auto 0', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} data-stats>
          {DESTAQUES.map(([titulo, texto]) => (
            <div
              key={titulo}
              style={{
                background: 'var(--af-surface)',
                border: '1px solid var(--af-border)',
                borderRadius: 16,
                padding: '22px 24px',
              }}
            >
              <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 30, color: 'var(--af-text)' }}>
                {titulo}
              </div>
              <div style={{ color: 'var(--af-muted-2)', fontSize: 14, marginTop: 4 }}>{texto}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="recursos" style={{ maxWidth: 1160, margin: '0 auto', padding: '96px 24px 40px' }}>
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto' }}>
          <span
            style={{
              color: '#1666d6',
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Tudo num lugar só
          </span>
          <h2
            style={{
              fontFamily: "'Space Grotesk'",
              fontWeight: 700,
              fontSize: 40,
              letterSpacing: '-0.02em',
              margin: '12px 0 0',
              textWrap: 'balance',
            }}
          >
            Ferramentas simples para um mês sob controle
          </h2>
          <p style={{ fontSize: 18, color: 'var(--af-muted-1)', margin: '16px 0 0' }}>
            Do lançamento rápido à visão anual — sem planilha, sem complicação.
          </p>
        </div>

        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', marginTop: 64 }}
          data-feat
        >
          <div>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#e8f1fe',
                color: '#0d4ea6',
                padding: '6px 12px',
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              📊 Dashboard
            </span>
            <h3
              style={{
                fontFamily: "'Space Grotesk'",
                fontWeight: 700,
                fontSize: 28,
                margin: '16px 0 0',
                letterSpacing: '-0.01em',
              }}
            >
              A visão do mês num relance
            </h3>
            <p style={{ fontSize: 17, color: 'var(--af-muted-1)', margin: '12px 0 20px' }}>
              Entradas, saídas e saldo do mês no topo. Abaixo, um gráfico anual por cartão e a divisão de gastos por
              categoria — dá pra ver o padrão sem esforço.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Entradas, saídas e saldo do mês',
                'Gráfico anual comparando cartões',
                'Gasto por categoria em rosca',
              ].map((item) => (
                <li key={item} style={{ display: 'flex', gap: 10, fontSize: 15, color: 'var(--af-body-2)' }}>
                  <span style={{ color: '#1666d6', fontWeight: 800 }}>✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Screenshot src={telaDashboard} alt="Dashboard do Amigo Financeiro" onZoom={setLightbox} />
          </div>
        </div>

        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', marginTop: 80 }}
          data-feat-rev
        >
          <div style={{ order: 2 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#e7f3ff',
                color: '#1560a8',
                padding: '6px 12px',
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              🧾 Transações
            </span>
            <h3
              style={{
                fontFamily: "'Space Grotesk'",
                fontWeight: 700,
                fontSize: 28,
                margin: '16px 0 0',
                letterSpacing: '-0.01em',
              }}
            >
              Cada lançamento no lugar certo
            </h3>
            <p style={{ fontSize: 17, color: 'var(--af-muted-1)', margin: '12px 0 20px' }}>
              Registre em segundos, busque por texto e filtre por cartão ou categoria. Compras no crédito podem ser
              parceladas — o app distribui as parcelas nos meses seguintes automaticamente.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Busca e filtros por cartão / categoria', 'Parcelamento automático no crédito'].map((item) => (
                <li key={item} style={{ display: 'flex', gap: 10, fontSize: 15, color: 'var(--af-body-2)' }}>
                  <span style={{ color: '#1666d6', fontWeight: 800 }}>✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ order: 1 }}>
            <Screenshot src={telaTransacoes} alt="Tela de transações" onZoom={setLightbox} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px 32px', marginTop: 88 }} data-feat-cards>
          {CARDS_RECURSOS.map(([icone, fundoClaro, fundoEscuro, titulo, texto, img]) => (
            <div key={titulo}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 11,
                    background: isDark ? fundoEscuro : fundoClaro,
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 20,
                  }}
                >
                  {icone}
                </div>
                <h4 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 20, margin: 0 }}>{titulo}</h4>
              </div>
              <p style={{ fontSize: 15, color: 'var(--af-muted-2)', margin: '12px 0 18px' }}>{texto}</p>
              <Screenshot src={img} alt={`Tela de ${titulo.toLowerCase()}`} onZoom={setLightbox} />
            </div>
          ))}
        </div>
      </section>

      <section id="planos" style={{ background: '#0a2a52', marginTop: 88, padding: '84px 24px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
            <span
              style={{
                color: '#8fbcff',
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Planos
            </span>
            <h2
              style={{
                fontFamily: "'Space Grotesk'",
                fontWeight: 700,
                fontSize: 40,
                letterSpacing: '-0.02em',
                margin: '12px 0 0',
                color: '#fff',
                textWrap: 'balance',
              }}
            >
              Comece grátis. Vá pra nuvem quando quiser.
            </h2>
            <p style={{ fontSize: 18, color: '#9fbce6', margin: '16px 0 0' }}>
              As mesmas funcionalidades nos dois planos. O Premium adiciona sincronização e backup.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
            <div
              style={{
                display: 'inline-flex',
                background: '#123a6b',
                border: '1px solid #1e4d84',
                borderRadius: 999,
                padding: 4,
              }}
            >
              <button type="button" onClick={() => setModoPlanos('cards')} style={modoPlanos === 'cards' ? pillOn : pillOff}>
                Cards
              </button>
              <button type="button" onClick={() => setModoPlanos('table')} style={modoPlanos === 'table' ? pillOn : pillOff}>
                Tabela
              </button>
            </div>
          </div>

          <div style={{ marginTop: 36 }}>
            <Planos mode={modoPlanos} />
          </div>

          <p style={{ textAlign: 'center', color: '#7ba0d4', fontSize: 14, marginTop: 28 }}>
            Premium por <strong style={{ color: '#d4e4fb' }}>R$ 30/mês</strong> — cancele quando quiser, sem fidelidade.
          </p>
        </div>
      </section>

      <section id="download" style={{ maxWidth: 1160, margin: '0 auto', padding: '96px 24px' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #e8f1fe, #e7f3ff)',
            border: '1px solid #d7e5f7',
            borderRadius: 24,
            padding: 56,
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: "'Space Grotesk'",
              fontWeight: 700,
              fontSize: 36,
              letterSpacing: '-0.02em',
              margin: 0,
              textWrap: 'balance',
              color: '#0b1f3a',
            }}
          >
            Baixe o Amigo Financeiro
          </h2>
          <p style={{ fontSize: 18, color: '#47586f', margin: '14px 0 32px' }}>
            Grátis, sem cadastro. Baixe e comece hoje.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
            <Link
              to="/download"
              className="af-hover-dl"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 14,
                background: '#0b1f3a',
                color: '#fff',
                padding: '16px 28px',
                borderRadius: 14,
                boxShadow: '0 14px 30px -14px rgba(10,38,36,0.7)',
              }}
            >
              <span style={{ fontSize: 28 }}>⊞</span>
              <span style={{ textAlign: 'left' }}>
                <span style={{ display: 'block', fontSize: 12, opacity: 0.7, fontWeight: 600 }}>Baixar para</span>
                <span style={{ display: 'block', fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 18 }}>
                  Windows
                </span>
              </span>
            </Link>
          </div>
          <p style={{ fontSize: 13, color: '#7c8aa0', marginTop: 22 }}>Windows 10+ · ~40 MB</p>
        </div>
      </section>

      <section style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px 96px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 48,
            alignItems: 'center',
            background: 'var(--af-surface)',
            border: '1px solid var(--af-border)',
            borderRadius: 24,
            padding: 48,
          }}
          data-account
        >
          <div>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#fdf2e2',
                color: '#a9701c',
                padding: '6px 12px',
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              ★ Premium
            </span>
            <h2
              style={{
                fontFamily: "'Space Grotesk'",
                fontWeight: 700,
                fontSize: 32,
                letterSpacing: '-0.02em',
                margin: '16px 0 0',
                textWrap: 'balance',
              }}
            >
              Conta só pra quem quer nuvem
            </h2>
            <p style={{ fontSize: 17, color: 'var(--af-muted-1)', margin: '14px 0 24px' }}>
              O app grátis funciona 100% sem conta. Você só cria uma conta se quiser sincronizar entre dispositivos e
              ter backup automático — e o cadastro acontece aqui no site.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <Link
                to="/cadastro"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: '#1666d6',
                  color: '#fff',
                  fontWeight: 700,
                  padding: '13px 22px',
                  borderRadius: 11,
                  boxShadow: '0 10px 24px -12px rgba(14,147,132,0.7)',
                }}
              >
                Criar conta Premium
              </Link>
              <Link
                to="/login"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'var(--af-surface)',
                  color: 'var(--af-text)',
                  fontWeight: 700,
                  padding: '13px 22px',
                  borderRadius: 11,
                  border: '1.5px solid var(--af-border-2)',
                }}
              >
                Já tenho conta
              </Link>
            </div>
          </div>
          <div
            style={{
              background: 'var(--af-bg)',
              border: '1px solid var(--af-border)',
              borderRadius: 16,
              padding: 24,
            }}
          >
            <div style={{ fontWeight: 700, color: 'var(--af-text)', marginBottom: 14 }}>Como funciona o login</div>
            <ol
              style={{
                margin: 0,
                paddingLeft: 20,
                color: 'var(--af-muted-1)',
                fontSize: 15,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <li>Você cria a conta aqui no site (nome, email e senha).</li>
              <li>No app desktop, entra com essa mesma conta.</li>
              <li>Seus dados passam a sincronizar na nuvem, com backup automático.</li>
            </ol>
          </div>
        </div>
      </section>

      <section id="faq" style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px 96px' }}>
        <div style={{ textAlign: 'center' }}>
          <span
            style={{
              color: '#1666d6',
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Perguntas frequentes
          </span>
          <h2
            style={{
              fontFamily: "'Space Grotesk'",
              fontWeight: 700,
              fontSize: 36,
              letterSpacing: '-0.02em',
              margin: '12px 0 0',
            }}
          >
            Ainda em dúvida?
          </h2>
        </div>
        <Faq />
      </section>

      <SiteFooter />
      <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
    </div>
  );
}
