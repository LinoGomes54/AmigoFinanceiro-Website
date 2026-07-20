import { useEffect, useRef } from 'react';

/**
 * Fundo animado do hero: camadas de ondas suaves que fluem na horizontal, como
 * linhas de um gráfico financeiro. Preenche o elemento pai (position relative).
 * Pausa com a aba oculta e desenha um quadro estático sob prefers-reduced-motion.
 */

interface Onda {
  amplitude: number; // altura da onda em px
  comprimento: number; // largura de um ciclo, relativo à largura do canvas
  velocidade: number; // deslocamento de fase por quadro
  yBase: number; // linha de base vertical, 0..1 da altura
  fase: number;
  alpha: number;
}

const AZUL = '47, 134, 240'; // azul da marca; funciona nos dois temas com alpha baixo

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const pai = canvas?.parentElement;
    if (!canvas || !pai) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let largura = 0;
    let altura = 0;
    let raf = 0;

    const ondas: Onda[] = [
      { amplitude: 26, comprimento: 1.1, velocidade: 0.0016, yBase: 0.62, fase: 0, alpha: 0.1 },
      { amplitude: 34, comprimento: 1.5, velocidade: 0.0022, yBase: 0.72, fase: 2.1, alpha: 0.09 },
      { amplitude: 20, comprimento: 0.85, velocidade: 0.0031, yBase: 0.82, fase: 4.3, alpha: 0.07 },
    ];

    function redimensionar() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      largura = pai!.clientWidth;
      altura = pai!.clientHeight;
      canvas!.width = largura * dpr;
      canvas!.height = altura * dpr;
      canvas!.style.width = `${largura}px`;
      canvas!.style.height = `${altura}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function desenharOnda(o: Onda) {
      const base = altura * o.yBase;
      const k = (Math.PI * 2) / (largura * o.comprimento);

      ctx!.beginPath();
      ctx!.moveTo(0, altura);
      for (let x = 0; x <= largura; x += 8) {
        // Soma de duas frequências para a linha não parecer uma senoide perfeita.
        const y = base + Math.sin(x * k + o.fase) * o.amplitude + Math.sin(x * k * 2.3 + o.fase * 1.7) * (o.amplitude * 0.35);
        ctx!.lineTo(x, y);
      }
      ctx!.lineTo(largura, altura);
      ctx!.closePath();

      const grad = ctx!.createLinearGradient(0, base - o.amplitude, 0, altura);
      grad.addColorStop(0, `rgba(${AZUL}, ${o.alpha})`);
      grad.addColorStop(1, `rgba(${AZUL}, 0)`);
      ctx!.fillStyle = grad;
      ctx!.fill();

      // Linha de topo mais nítida, reforçando o traço do "gráfico".
      ctx!.beginPath();
      for (let x = 0; x <= largura; x += 8) {
        const y = base + Math.sin(x * k + o.fase) * o.amplitude + Math.sin(x * k * 2.3 + o.fase * 1.7) * (o.amplitude * 0.35);
        if (x === 0) ctx!.moveTo(x, y);
        else ctx!.lineTo(x, y);
      }
      ctx!.strokeStyle = `rgba(${AZUL}, ${o.alpha + 0.12})`;
      ctx!.lineWidth = 1.5;
      ctx!.stroke();
    }

    function desenhar() {
      ctx!.clearRect(0, 0, largura, altura);
      for (const o of ondas) {
        o.fase += o.velocidade * 16; // ~por quadro a 60fps
        desenharOnda(o);
      }
      raf = requestAnimationFrame(desenhar);
    }

    function onVisibilidade() {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!semMovimento) {
        raf = requestAnimationFrame(desenhar);
      }
    }

    redimensionar();
    const ro = new ResizeObserver(() => {
      redimensionar();
      if (semMovimento) {
        ondas.forEach((o) => desenharOnda(o));
      }
    });
    ro.observe(pai);

    if (semMovimento) {
      ondas.forEach((o) => desenharOnda(o));
    } else {
      document.addEventListener('visibilitychange', onVisibilidade);
      raf = requestAnimationFrame(desenhar);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibilidade);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}
