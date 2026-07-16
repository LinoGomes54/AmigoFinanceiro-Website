import { Link } from 'react-router-dom';
import { AppWindow } from '../components/AppWindow.tsx';
import { SimpleFooter } from '../components/Footer.tsx';
import { Logo } from '../components/Logo.tsx';
import { release } from '../lib/release.ts';

const BAR_HEIGHTS = [40, 62, 34, 78, 52, 88, 46, 70, 58, 92, 66, 80];

function StatCard({ label, valor, cor }: { label: string; valor: string; cor: string }) {
  return (
    <div
      style={{
        flex: 1,
        background: 'var(--af-bg)',
        border: '1px solid var(--af-win-border)',
        borderRadius: 10,
        padding: '12px 14px',
      }}
    >
      <div style={{ fontSize: 11, color: 'var(--af-win-title)', fontWeight: 600 }}>{label}</div>
      <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 20, color: cor, marginTop: 3 }}>
        {valor}
      </div>
    </div>
  );
}

function AppMock() {
  return (
    <AppWindow>
      <div style={{ padding: 18 }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
          <StatCard label="Entradas" valor="R$ 8.400" cor="#1666d6" />
          <StatCard label="Saídas" valor="R$ 5.180" cor="#d1495b" />
          <StatCard label="Saldo" valor="R$ 3.220" cor="var(--af-text)" />
        </div>
        <div style={{ border: '1px solid var(--af-win-border)', borderRadius: 10, padding: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--af-text)' }}>Evolução anual por cartão</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 96, marginTop: 10 }}>
            {BAR_HEIGHTS.map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  gap: 2,
                  height: '100%',
                }}
              >
                <div
                  style={{
                    height: `${h}%`,
                    borderRadius: '4px 4px 0 0',
                    background: 'linear-gradient(180deg,#2f86f0,#0f4fb0)',
                  }}
                />
                <div style={{ height: `${h * 0.4}%`, borderRadius: '0 0 4px 4px', background: '#cfe0fb' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppWindow>
  );
}

const PASSOS = [
  ['1', 'Baixe o instalador', 'Clique em baixar e salve o arquivo .exe no seu computador.'],
  ['2', 'Execute e instale', 'Abra o arquivo e siga o assistente. Leva menos de um minuto.'],
  ['3', 'Comece a usar', 'Abra o app e lance a primeira entrada. Sem conta, sem banco.'],
];

const REQUISITOS = [
  ['Sistema', 'Windows 10 / 11'],
  ['Arquitetura', '64-bit (x64)'],
  ['Memória', '4 GB RAM'],
  ['Espaço em disco', '120 MB'],
  ['Conexão', 'Só no Premium'],
];

const NOVIDADES = [
  ['+', '#1666d6', 'Parcelamento automático de compras no crédito.'],
  ['+', '#1666d6', 'Tema gradiente e prévia de cores ao vivo.'],
  ['+', '#1666d6', 'Previsão de recorrências nos meses futuros.'],
  ['~', 'var(--af-muted-3)', 'Melhorias de desempenho no dashboard anual.'],
];

export function Download() {
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
          background: 'rgba(var(--af-bg-rgb), 0.9)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--af-border)',
        }}
      >
        <nav
          style={{
            maxWidth: 1080,
            margin: '0 auto',
            padding: '14px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <Logo />
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} data-navlinks>
            <Link to="/#recursos" style={{ color: 'var(--af-nav)', fontWeight: 600, fontSize: 15 }}>
              Funcionalidades
            </Link>
            <Link to="/#planos" style={{ color: 'var(--af-nav)', fontWeight: 600, fontSize: 15 }}>
              Planos
            </Link>
            <Link to="/#faq" style={{ color: 'var(--af-nav)', fontWeight: 600, fontSize: 15 }}>
              Perguntas
            </Link>
          </div>
          <Link to="/login" style={{ color: 'var(--af-text)', fontWeight: 700, fontSize: 15, padding: '9px 8px' }}>
            Entrar
          </Link>
        </nav>
      </header>

      <section style={{ position: 'relative', padding: '72px 24px 40px' }}>
        <div
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, background: 'var(--af-glow)', pointerEvents: 'none' }}
        />
        <div
          style={{
            position: 'relative',
            maxWidth: 1080,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: 56,
            alignItems: 'center',
          }}
          data-dl-grid
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
              Disponível para Windows
            </span>
            <h1
              style={{
                fontFamily: "'Space Grotesk'",
                fontWeight: 700,
                fontSize: 48,
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                margin: '18px 0 0',
                textWrap: 'balance',
              }}
              data-dl-h1
            >
              Baixe o Amigo Financeiro
            </h1>
            <p
              style={{
                fontSize: 18,
                color: 'var(--af-muted-1)',
                margin: '16px 0 0',
                maxWidth: 480,
                textWrap: 'pretty',
              }}
            >
              Grátis, sem cadastro e sem conectar o banco. Instale em segundos e comece a organizar o seu mês.
            </p>

            <div style={{ marginTop: 30 }}>
              <a
                href="#"
                className="af-hover-dl"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 16,
                  background: '#0b1f3a',
                  color: '#fff',
                  padding: '18px 30px',
                  borderRadius: 16,
                  boxShadow: '0 16px 34px -16px rgba(11,31,58,0.75)',
                }}
              >
                <span style={{ fontSize: 34, lineHeight: 1 }}>⊞</span>
                <span style={{ textAlign: 'left' }}>
                  <span style={{ display: 'block', fontSize: 13, opacity: 0.7, fontWeight: 600 }}>
                    Baixar para Windows
                  </span>
                  <span style={{ display: 'block', fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 22 }}>
                    Amigo Financeiro {release.version}
                  </span>
                </span>
              </a>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px 20px',
                  marginTop: 16,
                  color: 'var(--af-muted-3)',
                  fontSize: 13.5,
                  fontWeight: 600,
                }}
              >
                <span>Windows 10 e 11 (64-bit)</span>
                <span>·</span>
                <span>{release.fileSize}</span>
                <span>·</span>
                <span>Instalador .exe</span>
                <span>·</span>
                <span>Atualizado em {release.releaseDate}</span>
              </div>
            </div>

            <p
              style={{
                fontSize: 13,
                color: 'var(--af-muted-3)',
                marginTop: 18,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ color: '#1666d6', fontWeight: 800 }}>✓</span> Sem cadastro para a versão gratuita
              &nbsp;·&nbsp;{' '}
              <Link to="/#planos" style={{ fontWeight: 700 }}>
                ver planos
              </Link>
            </p>
          </div>

          <div style={{ position: 'relative' }}>
            <AppMock />
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1080, margin: '24px auto 0', padding: '0 24px' }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--af-muted-3)',
            marginBottom: 14,
          }}
        >
          Disponível para
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr' }} data-alts>
          <div
            style={{
              background: 'var(--af-surface)',
              border: '2px solid #1666d6',
              borderRadius: 16,
              padding: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <span style={{ fontSize: 30 }}>⊞</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 17 }}>
                Windows 10 e 11 (64-bit)
              </div>
              <div style={{ fontSize: 13, color: 'var(--af-muted-2)' }}>
                {release.version} · {release.fileSize} · Instalador .exe
              </div>
            </div>
            <a
              href="#"
              style={{
                background: '#1666d6',
                color: '#fff',
                fontWeight: 700,
                fontSize: 13,
                padding: '9px 14px',
                borderRadius: 10,
              }}
            >
              Baixar
            </a>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '72px 24px 0' }}>
        <h2 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 30, letterSpacing: '-0.02em', margin: 0 }}>
          Como instalar
        </h2>
        <p style={{ fontSize: 16, color: 'var(--af-muted-1)', margin: '10px 0 28px' }}>
          Três passos e você já está registrando o primeiro lançamento.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} data-steps>
          {PASSOS.map(([n, titulo, texto]) => (
            <div
              key={n}
              style={{
                background: 'var(--af-surface)',
                border: '1px solid var(--af-border)',
                borderRadius: 16,
                padding: 26,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: 'var(--af-tile-bg)',
                  color: 'var(--af-tile-color)',
                  display: 'grid',
                  placeItems: 'center',
                  fontFamily: "'Space Grotesk'",
                  fontWeight: 700,
                  fontSize: 18,
                }}
              >
                {n}
              </div>
              <h3 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 18, margin: '16px 0 6px' }}>
                {titulo}
              </h3>
              <p style={{ fontSize: 14.5, color: 'var(--af-muted-2)', margin: 0 }}>{texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '56px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} data-req>
          <div
            style={{
              background: 'var(--af-surface)',
              border: '1px solid var(--af-border)',
              borderRadius: 18,
              padding: 30,
            }}
          >
            <h3 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 20, margin: '0 0 18px' }}>
              Requisitos do sistema
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {REQUISITOS.map(([label, valor], i) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '12px 0',
                    borderBottom: i < REQUISITOS.length - 1 ? '1px solid var(--af-border)' : 'none',
                    fontSize: 15,
                  }}
                >
                  <span style={{ color: 'var(--af-muted-3)', fontWeight: 600 }}>{label}</span>
                  <span style={{ fontWeight: 700 }}>{valor}</span>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              background: 'var(--af-surface)',
              border: '1px solid var(--af-border)',
              borderRadius: 18,
              padding: 30,
            }}
          >
            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}
            >
              <h3 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 20, margin: 0 }}>Novidades</h3>
              <span
                style={{
                  background: 'var(--af-tile-bg)',
                  color: 'var(--af-tile-color)',
                  fontWeight: 700,
                  fontSize: 13,
                  padding: '5px 12px',
                  borderRadius: 999,
                }}
              >
                {release.version}
              </span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {NOVIDADES.map(([sinal, cor, texto]) => (
                <li key={texto} style={{ display: 'flex', gap: 12, fontSize: 15, color: 'var(--af-body-2)' }}>
                  <span style={{ color: cor, fontWeight: 800 }}>{sinal}</span> {texto}
                </li>
              ))}
            </ul>
            <a href="#" style={{ display: 'inline-block', marginTop: 18, fontSize: 14, fontWeight: 700 }}>
              Ver histórico de versões →
            </a>
          </div>
        </div>

        <div
          style={{
            marginTop: 24,
            background: 'var(--af-note-bg)',
            border: '1px solid var(--af-note-border)',
            borderRadius: 16,
            padding: '22px 26px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontSize: 26 }}>🛡️</span>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Instalador assinado e verificado</div>
            <div style={{ fontSize: 14, color: 'var(--af-muted-1)' }}>
              Distribuímos apenas o instalador oficial. Baixe sempre por esta página.
            </div>
          </div>
          <code
            style={{
              fontFamily: "'Space Grotesk', monospace",
              fontSize: 12.5,
              color: 'var(--af-muted-2)',
              background: 'var(--af-surface)',
              border: '1px solid var(--af-border)',
              borderRadius: 8,
              padding: '8px 12px',
            }}
          >
            SHA-256: 9f2c…a41e
          </code>
        </div>
      </section>

      <section style={{ maxWidth: 1080, margin: '0 auto 80px', padding: '0 24px' }}>
        <div style={{ background: '#0a2a52', borderRadius: 22, padding: 44, textAlign: 'center', color: '#d4e4fb' }}>
          <h2
            style={{
              fontFamily: "'Space Grotesk'",
              fontWeight: 700,
              fontSize: 28,
              letterSpacing: '-0.02em',
              margin: 0,
              color: '#fff',
              textWrap: 'balance',
            }}
          >
            Quer acessar de mais de um dispositivo?
          </h2>
          <p style={{ fontSize: 16, color: '#9fbce6', margin: '12px 0 24px' }}>
            Crie uma conta Premium por R$ 30/mês e tenha seus dados sincronizados na nuvem, com backup automático.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/cadastro"
              style={{ background: '#2f86f0', color: '#fff', fontWeight: 700, padding: '13px 24px', borderRadius: 12 }}
            >
              Criar conta Premium
            </Link>
            <Link
              to="/#planos"
              style={{
                background: '#123a6b',
                color: '#d4e4fb',
                fontWeight: 700,
                padding: '13px 24px',
                borderRadius: 12,
              }}
            >
              Comparar planos
            </Link>
          </div>
        </div>
      </section>

      <SimpleFooter />
    </div>
  );
}
