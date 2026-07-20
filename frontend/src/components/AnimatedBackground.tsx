import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

const COR = '143, 188, 255'; // azul claro da marca, em canais para usar com alpha
const DIST_MAX = 130; // distância em px até a qual duas partículas se ligam
const DENSIDADE = 9000; // 1 partícula a cada N px² — menos = mais partículas

/**
 * Fundo de constelação em canvas: partículas que flutuam e se ligam por linhas
 * quando ficam próximas, reagindo ao mouse. Preenche o elemento pai (position
 * relative). Pausa com a aba oculta e não anima sob prefers-reduced-motion.
 */
export function AnimatedBackground() {
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
    let particulas: Particle[] = [];
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;

    function criarParticulas() {
      const qtd = Math.min(90, Math.floor((largura * altura) / DENSIDADE));
      particulas = Array.from({ length: qtd }, () => ({
        x: Math.random() * largura,
        y: Math.random() * altura,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
      }));
    }

    function redimensionar() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      largura = pai!.clientWidth;
      altura = pai!.clientHeight;
      canvas!.width = largura * dpr;
      canvas!.height = altura * dpr;
      canvas!.style.width = `${largura}px`;
      canvas!.style.height = `${altura}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      criarParticulas();
    }

    function desenhar() {
      ctx!.clearRect(0, 0, largura, altura);

      for (const p of particulas) {
        p.x += p.vx;
        p.y += p.vy;

        // Vai e volta ao encostar nas bordas.
        if (p.x < 0 || p.x > largura) p.vx *= -1;
        if (p.y < 0 || p.y > altura) p.vy *= -1;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${COR}, 0.7)`;
        ctx!.fill();
      }

      // Liga partículas próximas entre si e ao ponteiro; quanto mais perto, mais opaca.
      for (let i = 0; i < particulas.length; i++) {
        const a = particulas[i]!;
        for (let j = i + 1; j < particulas.length; j++) {
          const b = particulas[j]!;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < DIST_MAX) {
            ctx!.strokeStyle = `rgba(${COR}, ${0.16 * (1 - d / DIST_MAX)})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }

        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < DIST_MAX * 1.4) {
          ctx!.strokeStyle = `rgba(${COR}, ${0.28 * (1 - dm / (DIST_MAX * 1.4))})`;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(mouse.x, mouse.y);
          ctx!.stroke();
        }
      }

      raf = requestAnimationFrame(desenhar);
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function onMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    // Poupa CPU e bateria quando a aba não está visível.
    function onVisibilidade() {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!semMovimento) {
        raf = requestAnimationFrame(desenhar);
      }
    }

    redimensionar();
    const ro = new ResizeObserver(redimensionar);
    ro.observe(pai);

    if (semMovimento) {
      // Desenha um quadro estático, sem loop nem interação.
      desenhar();
      cancelAnimationFrame(raf);
    } else {
      pai.addEventListener('mousemove', onMouseMove);
      pai.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('visibilitychange', onVisibilidade);
      raf = requestAnimationFrame(desenhar);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      pai.removeEventListener('mousemove', onMouseMove);
      pai.removeEventListener('mouseleave', onMouseLeave);
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
