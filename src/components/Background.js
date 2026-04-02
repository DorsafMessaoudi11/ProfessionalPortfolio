import React, { useEffect, useRef } from 'react';
import './Background.css';

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let w, h;
    let nodes = [];
    let t = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      initNodes();
    };

    const initNodes = () => {
      nodes = [];
      const count = Math.floor((w * h) / 22000);
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.35 + 0.1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.004;

      // Grid
      ctx.strokeStyle = 'rgba(138, 106, 90, 0.055)';
      ctx.lineWidth = 0.5;
      const gridSize = 72;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(138, 106, 90, ${0.08 * (1 - dist / 160)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 176, 138, ${n.opacity})`;
        ctx.fill();
      });

      // Ambient blobs
      const blobs = [
        { x: w * 0.15, y: h * 0.2, r: 300, ox: 0.3, oy: 0.2 },
        { x: w * 0.85, y: h * 0.6, r: 250, ox: -0.2, oy: 0.25 },
        { x: w * 0.5, y: h * 0.85, r: 200, ox: 0.15, oy: -0.2 },
      ];
      blobs.forEach((b, i) => {
        const px = b.x + Math.sin(t + i) * b.ox * 60;
        const py = b.y + Math.cos(t * 0.7 + i) * b.oy * 60;
        const grad = ctx.createRadialGradient(px, py, 0, px, py, b.r);
        grad.addColorStop(0, 'rgba(90, 55, 35, 0.06)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, b.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="bg-wrapper">
      <canvas ref={canvasRef} className="bg-canvas" />
    </div>
  );
}
