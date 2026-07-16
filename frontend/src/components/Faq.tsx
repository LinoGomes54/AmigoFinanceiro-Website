import { useState } from 'react';

const FAQS: Array<[pergunta: string, resposta: string]> = [
  [
    'Preciso de conta para usar o app?',
    'Não. O app grátis funciona 100% sem cadastro, com os dados salvos no seu próprio computador. A conta só é necessária no plano Premium, para sincronizar na nuvem.',
  ],
  [
    'O app se conecta ao meu banco?',
    'Não, e essa é justamente a proposta. Todos os lançamentos são manuais — você anota entradas e saídas e enxerga com clareza para onde o dinheiro vai, sem abrir mão dos dados do seu banco.',
  ],
  [
    'Meus dados ficam seguros na nuvem?',
    'No Premium, os dados são transmitidos por conexão criptografada e armazenados com criptografia, com backup automático. Você controla a sua conta e pode exportar ou apagar seus dados quando quiser.',
  ],
  [
    'Qual a diferença entre o plano grátis e o Premium?',
    'As funcionalidades são as mesmas. No grátis, os dados ficam salvos localmente no seu PC. No Premium, eles são sincronizados na nuvem e acessíveis de qualquer dispositivo, com backup automático.',
  ],
  [
    'Funciona no Windows e no Mac?',
    'Sim. O Amigo Financeiro é um app desktop nativo para Windows 10+ e macOS 12+. Você baixa gratuitamente e começa a usar na hora.',
  ],
];

export function Faq() {
  const [aberta, setAberta] = useState(0);

  return (
    <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {FAQS.map(([pergunta, resposta], i) => {
        const isOpen = aberta === i;
        return (
          <div
            key={pergunta}
            className="af-faq-card"
            style={{
              background: 'var(--af-surface)',
              border: isOpen ? '1px solid #bcd4f8' : '1px solid var(--af-border)',
              borderRadius: 14,
              overflow: 'hidden',
              boxShadow: isOpen ? '0 18px 40px -24px rgba(22,102,214,0.4)' : '0 1px 0 rgba(0,0,0,0)',
              transition: 'border-color 0.3s, box-shadow 0.35s',
            }}
          >
            <button
              type="button"
              onClick={() => setAberta(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              style={{
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '20px 22px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              <span style={{ flex: 1, fontWeight: 700, fontSize: 17, color: 'var(--af-text)' }}>{pergunta}</span>
              <span
                style={{
                  width: 26,
                  height: 26,
                  flex: 'none',
                  borderRadius: 8,
                  display: 'grid',
                  placeItems: 'center',
                  background: isOpen ? '#1666d6' : 'var(--af-tile-bg)',
                  color: isOpen ? '#fff' : 'var(--af-tile-color)',
                  fontSize: 20,
                  lineHeight: 1,
                  transform: isOpen ? 'rotate(135deg)' : 'rotate(0deg)',
                  transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), background 0.3s, color 0.3s',
                }}
              >
                +
              </span>
            </button>
            <div
              style={{
                display: 'grid',
                gridTemplateRows: isOpen ? '1fr' : '0fr',
                transition: 'grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)',
              }}
            >
              <div style={{ overflow: 'hidden' }}>
                <p
                  style={{
                    margin: 0,
                    padding: '0 22px 20px',
                    color: 'var(--af-muted-1)',
                    fontSize: 15,
                    lineHeight: 1.6,
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateY(0)' : 'translateY(-6px)',
                    transition: 'opacity 0.3s ease 0.05s, transform 0.35s ease 0.05s',
                  }}
                >
                  {resposta}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
