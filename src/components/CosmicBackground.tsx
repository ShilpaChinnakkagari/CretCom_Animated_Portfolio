import { useEffect, useRef } from "react";

const CosmicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Stars
    const stars = Array.from({ length: 300 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2,
    }));

    // Nebula blobs
    const nebulae = [
      { x: 0.2, y: 0.3, r: 300, color: [270, 60, 20] as [number, number, number], phase: 0 },
      { x: 0.7, y: 0.6, r: 250, color: [310, 70, 25] as [number, number, number], phase: 2 },
      { x: 0.5, y: 0.8, r: 350, color: [190, 70, 20] as [number, number, number], phase: 4 },
      { x: 0.85, y: 0.2, r: 200, color: [220, 80, 25] as [number, number, number], phase: 1 },
    ];

    // Floating particles
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 100,
      speed: Math.random() * 0.5 + 0.2,
      size: Math.random() * 2 + 0.5,
      drift: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.3,
    }));

    let frame = 0;

    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Deep space gradient
      const bg = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.5, 0,
        canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.8
      );
      bg.addColorStop(0, "hsl(240, 30%, 6%)");
      bg.addColorStop(0.5, "hsl(250, 25%, 4%)");
      bg.addColorStop(1, "hsl(240, 30%, 2%)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Nebulae
      nebulae.forEach((n) => {
        const time = frame * 0.003 + n.phase;
        const cx = n.x * canvas.width + Math.sin(time) * 30;
        const cy = n.y * canvas.height + Math.cos(time * 0.7) * 20;
        const pulse = 0.4 + Math.sin(time * 0.5) * 0.15;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, n.r);
        grad.addColorStop(0, `hsla(${n.color[0]}, ${n.color[1]}%, ${n.color[2]}%, ${pulse * 0.4})`);
        grad.addColorStop(0.5, `hsla(${n.color[0]}, ${n.color[1]}%, ${n.color[2]}%, ${pulse * 0.15})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(cx - n.r, cy - n.r, n.r * 2, n.r * 2);
      });

      // Stars
      stars.forEach((s) => {
        const twinkle = 0.3 + Math.sin(frame * s.twinkleSpeed + s.phase) * 0.7;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(45, 100%, 90%, ${twinkle})`;
        ctx.fill();
        if (s.r > 1.2) {
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
          glow.addColorStop(0, `hsla(45, 100%, 90%, ${twinkle * 0.3})`);
          glow.addColorStop(1, "transparent");
          ctx.fillStyle = glow;
          ctx.fillRect(s.x - s.r * 4, s.y - s.r * 4, s.r * 8, s.r * 8);
        }
      });

      // Floating particles
      particles.forEach((p) => {
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(42, 78%, 70%, ${p.opacity * (0.5 + Math.sin(frame * 0.02) * 0.3)})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    const id = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
};

export default CosmicBackground;
