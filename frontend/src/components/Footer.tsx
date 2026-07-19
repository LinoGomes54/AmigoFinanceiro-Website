import { Link } from 'react-router-dom';
import { Icon, type IconName } from './Icon.tsx';
import { Logo } from './Logo.tsx';

const SOCIAL: Array<[IconName, string]> = [
  ['instagram', 'Instagram'],
  ['x', 'X'],
  ['youtube', 'YouTube'],
];

const LEGAL = ['Termos de uso', 'Privacidade', 'Contato'];

/** Rodapé enxuto, usado na página de Download. */
export function SimpleFooter() {
  return (
    <footer className="footer" style={{ paddingBlock: 'var(--space-10)' }}>
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
        }}
      >
        <Logo onDark />
        <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
          {LEGAL.map((item) => (
            <a key={item} href="#">
              {item}
            </a>
          ))}
        </div>
        <span style={{ color: 'var(--dark-subtle)', fontSize: 'var(--text-sm)' }}>© 2026 Amigo Financeiro</span>
      </div>
    </footer>
  );
}

/** Rodapé completo da landing. */
export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Logo onDark />
            <p style={{ marginTop: 'var(--space-4)', maxWidth: '19rem', fontSize: 'var(--text-sm)' }}>
              Controle financeiro pessoal, manual e sem conectar o banco. Para Windows.
            </p>
            <div className="footer-social">
              {SOCIAL.map(([icone, nome]) => (
                <a key={nome} href="#" aria-label={nome}>
                  <Icon name={icone} size={17} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="footer-col-title">Produto</h2>
            <div className="footer-links">
              <Link to="/#recursos">Funcionalidades</Link>
              <Link to="/#planos">Planos</Link>
              <Link to="/download">Download</Link>
              <Link to="/cadastro">Criar conta</Link>
            </div>
          </div>

          <div>
            <h2 className="footer-col-title">Legal</h2>
            <div className="footer-links">
              {LEGAL.map((item) => (
                <a key={item} href="#">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Amigo Financeiro. Todos os direitos reservados.</span>
          <span>Feito para quem gosta de saber onde o dinheiro está.</span>
        </div>
      </div>
    </footer>
  );
}
