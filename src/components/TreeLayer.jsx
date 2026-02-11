import { useEffect, useRef } from 'react';

const TreeLayer = () => {
  const treeCanvasRef = useRef(null);
  const groundCanvasRef = useRef(null);

  useEffect(() => {
    const treeCanvas = treeCanvasRef.current;
    const groundCanvas = groundCanvasRef.current;
    if (!treeCanvas || !groundCanvas) return;

    const setupCanvas = (canvas) => {
      const ctx = canvas.getContext("2d");
      const resize = () => {
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        const w = window.innerWidth;
        const h = window.innerHeight;
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        return { w, h };
      };
      return { ctx, resize };
    };


    // Tree Logic
    const { ctx: tCtx, resize: tResize } = setupCanvas(treeCanvas);
    let tW = 0, tH = 0;
    const edges = [], sparks = [];
    const rand = (a, b) => a + Math.random() * (b - a);

    const rebuildTree = () => {
      edges.length = 0;
      sparks.length = 0;
      const groundY = tH * 0.88;
      const trunkTop = groundY - tH * 0.30;
      const nodes = [];
      const base = { x: tW * 0.5, y: groundY };
      nodes.push(base);

      let prev = base;
      for (let i = 1; i <= 18; i++) {
        const t = i / 18;
        const n = { x: tW * 0.5 + Math.sin(t * 3.0) * tW * 0.004, y: groundY - t * (groundY - trunkTop) };
        edges.push([prev, n]);
        prev = n;
        nodes.push(n);
      }

      for (let b = 0; b < 26; b++) {
        const side = (b % 2 === 0) ? -1 : 1;
        const start = nodes[Math.floor(rand(7, nodes.length - 1))];
        const len = rand(tH * 0.06, tH * 0.18);
        const seg = Math.floor(rand(5, 10));
        let p = start;

        for (let s = 1; s <= seg; s++) {
          const tt = s / seg;
          const angle = side * (0.35 + tt * 0.9) + rand(-0.08, 0.08);
          const step = len / seg;
          const n = {
            x: p.x + Math.cos(angle) * step * rand(0.9, 1.15),
            y: p.y - Math.sin(Math.abs(angle)) * step * rand(0.9, 1.15) - step * 0.18
          };
          edges.push([p, n]);
          p = n;

          if (s > seg * 0.55 && Math.random() < 0.78) {
            sparks.push({ x: n.x + rand(-tW * 0.01, tW * 0.01), y: n.y + rand(-tH * 0.01, tH * 0.01), r: rand(0.9, 2.2), ph: rand(0, Math.PI * 2), sp: rand(0.8, 2.0) });
          }
        }
      }

      for (let i = 0; i < 1050; i++) {
        let rx = rand(-1, 1), ry = rand(-1, 1);
        if (Math.sqrt(rx * rx + ry * ry) > 1) { i--; continue; }
        const x = tW * 0.5 + rx * (tW * 0.20) * (0.35 + Math.random() * 0.65);
        const y = tH * 0.58 + ry * (tH * 0.16) * (0.35 + Math.random() * 0.65);
        sparks.push({ x, y, r: rand(0.7, 2.1), ph: rand(0, Math.PI * 2), sp: rand(0.6, 2.5) });
      }
    };

    // Ground Logic
    const { ctx: gCtx, resize: gResize } = setupCanvas(groundCanvas);
    let gW = 0, gH = 0;
    let meshEdges = [];

    const buildMesh = () => {
      meshEdges = [];
      const groundY = gH * 0.88;
      const pts = [];
      const cols = 36, rows = 7;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          pts.push({ x: (c / (cols - 1)) * gW, y: groundY + r * (gH * 0.02) + rand(-gH * 0.01, gH * 0.01) });
        }
      }
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          if (c < cols - 1) meshEdges.push([pts[idx], pts[idx + 1]]);
          if (r < rows - 1) meshEdges.push([pts[idx], pts[idx + cols]]);
          if (c < cols - 1 && r < rows - 1 && Math.random() < 0.34) meshEdges.push([pts[idx], pts[idx + cols + 1]]);
        }
      }
    };

    const onResizeAll = () => {
      const sT = tResize(); tW = sT.w; tH = sT.h; rebuildTree();
      const sG = gResize(); gW = sG.w; gH = sG.h; buildMesh();
    };

    onResizeAll();
    window.addEventListener("resize", onResizeAll);

    let animationId;
    const draw = (t) => {
      const time = t / 1000;
      
      // Draw Tree
      tCtx.clearRect(0, 0, tW, tH);
      tCtx.save();
      tCtx.lineCap = "round";
      tCtx.globalAlpha = 0.92;
      tCtx.strokeStyle = "rgba(255,255,255,0.22)";
      tCtx.lineWidth = 1.35;
      tCtx.beginPath();
      for (const [a, b] of edges) { tCtx.moveTo(a.x, a.y); tCtx.lineTo(b.x, b.y); }
      tCtx.stroke();

      tCtx.globalAlpha = 0.48;
      tCtx.strokeStyle = "rgba(0,255,230,0.38)";
      tCtx.lineWidth = 4.3;
      tCtx.beginPath();
      for (const [a, b] of edges) { tCtx.moveTo(a.x, a.y); tCtx.lineTo(b.x, b.y); }
      tCtx.stroke();
      tCtx.restore();

      tCtx.save();
      for (const s of sparks) {
        const tw = 0.5 + 0.5 * Math.sin(time * s.sp + s.ph);
        const a = 0.24 + tw * 0.74;
        tCtx.fillStyle = `rgba(255,255,255,${a * 0.92})`;
        tCtx.beginPath(); tCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2); tCtx.fill();
        tCtx.fillStyle = `rgba(0,255,230,${a * 0.28})`;
        tCtx.beginPath(); tCtx.arc(s.x, s.y, s.r * 3.0, 0, Math.PI * 2); tCtx.fill();
      }
      tCtx.restore();

      tCtx.save();
      tCtx.globalCompositeOperation = "destination-in";
      const gT = tCtx.createLinearGradient(0, tH * 0.45, 0, tH);
      gT.addColorStop(0.0, "rgba(0,0,0,0)");
      gT.addColorStop(0.30, "rgba(0,0,0,0.08)");
      gT.addColorStop(0.62, "rgba(0,0,0,0.98)");
      gT.addColorStop(1.0, "rgba(0,0,0,1)");
      tCtx.fillStyle = gT;
      tCtx.fillRect(0, 0, tW, tH);
      tCtx.restore();

      // Draw Ground
      gCtx.clearRect(0, 0, gW, gH);
      gCtx.save();
      gCtx.globalAlpha = 0.88;
      gCtx.lineCap = "round";
      gCtx.strokeStyle = "rgba(255,255,255,0.17)";
      gCtx.lineWidth = 1.25;
      gCtx.beginPath();
      for (const [a, b] of meshEdges) { gCtx.moveTo(a.x, a.y); gCtx.lineTo(b.x, b.y); }
      gCtx.stroke();

      gCtx.globalAlpha = 0.38;
      gCtx.strokeStyle = "rgba(0,255,230,0.30)";
      gCtx.lineWidth = 3.2;
      gCtx.beginPath();
      for (const [a, b] of meshEdges) { gCtx.moveTo(a.x, a.y); gCtx.lineTo(b.x, b.y); }
      gCtx.stroke();
      gCtx.restore();

      gCtx.save();
      gCtx.globalCompositeOperation = "destination-in";
      const gG = gCtx.createLinearGradient(0, gH * 0.72, 0, gH);
      gG.addColorStop(0.0, "rgba(0,0,0,0)");
      gG.addColorStop(0.55, "rgba(0,0,0,0.55)");
      gG.addColorStop(1.0, "rgba(0,0,0,1)");
      gG.fillStyle = gG;
      gG.fillRect(0, 0, gW, gH);
      gG.restore();

      animationId = requestAnimationFrame(draw);
    };
    animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", onResizeAll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="tree-layer" id="treeLayer">
      <div className="ground-plate"></div>
      <canvas ref={treeCanvasRef} id="treeFx" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', zIndex: 2 }}></canvas>
      <canvas ref={groundCanvasRef} id="groundFx" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', zIndex: 2 }}></canvas>
    </div>
  );
};

export default TreeLayer;
