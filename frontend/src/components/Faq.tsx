import { useId, useState } from 'react';
import { Icon } from './Icon.tsx';
import { Reveal } from './ui/Reveal.tsx';

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
  const baseId = useId();

  return (
    <div className="stack" style={{ gap: 'var(--space-3)' }}>
      {FAQS.map(([pergunta, resposta], i) => {
        const isOpen = aberta === i;
        const painelId = `${baseId}-painel-${i}`;
        const botaoId = `${baseId}-botao-${i}`;

        return (
          <Reveal key={pergunta} delay={i * 60}>
            <div className="faq-item" data-open={isOpen}>
              <h3>
                <button
                  type="button"
                  id={botaoId}
                  className="faq-trigger"
                  onClick={() => setAberta(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={painelId}
                >
                  {pergunta}
                  <span className="faq-icon" aria-hidden="true">
                    <Icon name="plus" size={16} />
                  </span>
                </button>
              </h3>
              <div className="faq-body" id={painelId} role="region" aria-labelledby={botaoId}>
                <div>
                  <p>{resposta}</p>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
