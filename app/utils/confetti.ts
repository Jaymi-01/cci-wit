export function triggerConfetti() {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "999999";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    document.body.removeChild(canvas);
    return;
  }
  const context: CanvasRenderingContext2D = ctx;

  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  const colors = ["#D3111C", "#EF4444", "#FFFFFF", "#FBBF24", "#F59E0B", "#FCD34D"];
  const particleCount = 120;
  const particles: Array<{
    x: number;
    y: number;
    w: number;
    h: number;
    color: string;
    vx: number;
    vy: number;
    tilt: number;
    tiltAngle: number;
    tiltAngleIncrement: number;
    opacity: number;
  }> = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: width / 2 + (Math.random() - 0.5) * 200,
      y: height * 0.45 + (Math.random() - 0.5) * 100,
      w: Math.random() * 12 + 6,
      h: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 18,
      vy: Math.random() * -14 - 4,
      tilt: Math.random() * 10 - 5,
      tiltAngle: Math.random() * Math.PI,
      tiltAngleIncrement: Math.random() * 0.1 + 0.05,
      opacity: 1,
    });
  }

  let animationId: number;
  let startTime = performance.now();

  function render(time: number) {
    const elapsed = time - startTime;
    context.clearRect(0, 0, width, height);

    let activeParticles = 0;
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.vx *= 0.98; // air resistance
      p.tiltAngle += p.tiltAngleIncrement;
      p.tilt = Math.sin(p.tiltAngle) * 12;

      if (elapsed > 1800) {
        p.opacity = Math.max(0, p.opacity - 0.02);
      }

      if (p.opacity > 0 && p.y < height + 50) {
        activeParticles++;
        context.save();
        context.globalAlpha = p.opacity;
        context.fillStyle = p.color;
        context.translate(p.x, p.y);
        context.rotate(p.tiltAngle);
        context.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        context.restore();
      }
    }

    if (activeParticles > 0 && elapsed < 4000) {
      animationId = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(animationId);
      if (canvas.parentElement) {
        canvas.parentElement.removeChild(canvas);
      }
    }
  }

  animationId = requestAnimationFrame(render);
}
