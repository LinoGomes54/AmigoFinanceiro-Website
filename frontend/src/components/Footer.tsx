import { Link } from 'react-router-dom';
import { Logo } from './Logo.tsx';

/** Rodapé enxuto usado na página de Download. */
export function SimpleFooter() {
  return (
    <footer style={{ background: '#0a2a52', color: '#d4e4fb', padding: '40px 24px' }}>
      <div
        style={{
          maxWidth: 1080,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <Logo color="#fff" size={30} />
        <div style={{ display: 'flex', gap: 22, fontSize: 14 }}>
          <a href="#" style={{ color: '#9fbce6' }}>
            Termos
          </a>
          <a href="#" style={{ color: '#9fbce6' }}>
            Privacidade
          </a>
          <a href="#" style={{ color: '#9fbce6' }}>
            Contato
          </a>
        </div>
        <span style={{ color: '#6b8bb8', fontSize: 13 }}>© 2026 Amigo Financeiro</span>
      </div>
    </footer>
  );
}

/** Rodapé completo da landing, com as colunas de links. */
export function SiteFooter() {
  return (
    <footer style={{ background: '#0a2a52', color: '#d4e4fb', padding: '56px 24px 40px' }}>
      <div
        style={{
          maxWidth: 1160,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr',
          gap: 40,
        }}
        data-footer
      >
        <div>
          <Logo color="#fff" />
          <p style={{ color: '#7ba0d4', fontSize: 14, margin: '16px 0 0', maxWidth: 300 }}>
            Controle financeiro pessoal, manual e sem conectar o banco. Para Windows e Mac.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            {[
              ['Instagram', 'ig'],
              ['X', 'x'],
              ['YouTube', 'yt'],
            ].map(([label, sigla]) => (
              <a
                key={sigla}
                href="#"
                aria-label={label}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 9,
                  background: '#123a6b',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#8fbcff',
                  fontWeight: 700,
                }}
              >
                {sigla}
              </a>
            ))}
          </div>
        </div>
        <div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Produto</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a href="#recursos" style={{ color: '#9fbce6', fontSize: 14 }}>
              Funcionalidades
            </a>
            <a href="#planos" style={{ color: '#9fbce6', fontSize: 14 }}>
              Planos
            </a>
            <Link to="/download" style={{ color: '#9fbce6', fontSize: 14 }}>
              Download
            </Link>
            <Link to="/cadastro" style={{ color: '#9fbce6', fontSize: 14 }}>
              Criar conta
            </Link>
          </div>
        </div>
        <div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Legal</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a href="#" style={{ color: '#9fbce6', fontSize: 14 }}>
              Termos de uso
            </a>
            <a href="#" style={{ color: '#9fbce6', fontSize: 14 }}>
              Privacidade
            </a>
            <a href="#" style={{ color: '#9fbce6', fontSize: 14 }}>
              Contato
            </a>
          </div>
        </div>
      </div>
      <div
        style={{
          maxWidth: 1160,
          margin: '36px auto 0',
          paddingTop: 24,
          borderTop: '1px solid #16345e',
          color: '#6b8bb8',
          fontSize: 13,
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <span>© 2026 Amigo Financeiro. Todos os direitos reservados.</span>
        <span>Feito para quem gosta de saber onde o dinheiro está.</span>
      </div>
    </footer>
  );
}
