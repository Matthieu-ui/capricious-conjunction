import React, { useState, useEffect, useRef, useCallback } from "react";

// ── ASCII Globe ──────────────────────────────────────────────────────────────
function ASCIIGlobe() {
  const [frame, setFrame] = useState("");
  const t = useRef(0);

  useEffect(() => {
    const W = 38, H = 19;
    const chars = " .,:;~+=xX$&#@";
    const render = () => {
      t.current += 0.045;
      const rows = [];
      for (let y = 0; y < H; y++) {
        let row = "";
        for (let x = 0; x < W; x++) {
          const fx = (x / (W - 1)) * 2 - 1;
          const fy = ((y / (H - 1)) * 2 - 1) * 1.1;
          const r2 = fx * fx + fy * fy;
          if (r2 > 1) { row += " "; continue; }
          const fz = Math.sqrt(1 - r2);
          // rotate around Y
          const cosT = Math.cos(t.current), sinT = Math.sin(t.current);
          const rx = fx * cosT + fz * sinT;
          const ry = fy;
          const rz = -fx * sinT + fz * cosT;
          // lat/lon grid lines
          const lon = Math.atan2(rx, rz);
          const lat = Math.asin(Math.max(-1, Math.min(1, ry)));
          const onLon = Math.abs(Math.sin(lon * 6)) < 0.13;
          const onLat = Math.abs(Math.sin(lat * 5)) < 0.13;
          // light
          const lx = 0.6, ly = 0.5, lz = 0.8;
          const ll = Math.sqrt(lx*lx+ly*ly+lz*lz);
          let dot = (rx*lx + ry*ly + rz*lz) / ll;
          dot = Math.max(0.05, dot);
          if (onLon || onLat) dot *= 0.4;
          const idx = Math.min(chars.length - 1, Math.floor(dot * chars.length));
          row += chars[idx];
        }
        rows.push(row);
      }
      setFrame(rows.join("\n"));
    };
    const id = setInterval(render, 45);
    return () => clearInterval(id);
  }, []);

  return (
    <pre className="font-mono text-[7.5px] leading-[1.15] select-none"
      style={{ color: "var(--theme-link)" }}>
      {frame}
    </pre>
  );
}

// ── Matrix Rain ──────────────────────────────────────────────────────────────
function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const fs = 10;
    const cols = Math.floor(W / fs);
    const drops = Array(cols).fill(1);
    const chars = "アカサタナハマヤラワイキシチニヒミリウクスツヌフムユルエケセテネヘ01アβ∑∆Ωπ";

    const draw = () => {
      const dark = document.documentElement.classList.contains("dark");
      ctx.fillStyle = dark ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.12)";
      ctx.fillRect(0, 0, W, H);
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = dark
          ? (drops[i] * fs < 12 ? "#afffaf" : "#00cc33")
          : (drops[i] * fs < 12 ? "#005500" : "#007700");
        ctx.font = `${fs}px monospace`;
        ctx.fillText(ch, i * fs, drops[i] * fs);
        if (drops[i] * fs > H && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const id = setInterval(draw, 40);
    return () => clearInterval(id);
  }, []);

  return <canvas ref={canvasRef} width={240} height={160} className="rounded" />;
}

// ── Terminal Spinners ─────────────────────────────────────────────────────────
const SPINNERS = [
  { name: "braille",  frames: ["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"], ms: 80  },
  { name: "arc",      frames: ["◜","◠","◝","◞","◡","◟"],                     ms: 120 },
  { name: "dots8",    frames: ["⣾","⣽","⣻","⢿","⡿","⣟","⣯","⣷"],           ms: 80  },
  { name: "bounce",   frames: ["[=···]","[·=··]","[··=·]","[···=]","[··=·]","[·=··]"], ms: 140 },
  { name: "arrows",   frames: ["←","↖","↑","↗","→","↘","↓","↙"],             ms: 100 },
  { name: "pipe",     frames: ["┤","┘","┴","└","├","┌","┬","┐"],              ms: 100 },
  { name: "fill",     frames: ["░░░░░","▒░░░░","▒▒░░░","▒▒▒░░","▒▒▒▒░","▒▒▒▒▒","░▒▒▒▒","░░▒▒▒","░░░▒▒","░░░░▒","░░░░░"], ms: 120 },
  { name: "bar",      frames: ["▏","▎","▍","▌","▋","▊","▉","█","▉","▊","▋","▌","▍","▎"], ms: 80 },
];

function SingleSpinner({ frames, ms }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI(x => (x + 1) % frames.length), ms);
    return () => clearInterval(id);
  }, []);
  return <span style={{ whiteSpace: "pre" }}>{frames[i]}</span>;
}

function TerminalSpinners() {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-2 font-mono text-[11px] h-full content-center px-1">
      {SPINNERS.map(s => (
        <div key={s.name} className="flex items-center gap-2 min-w-0">
          <span className="shrink-0 w-[6ch] text-center" style={{ color: "var(--theme-link)" }}>
            <SingleSpinner frames={s.frames} ms={s.ms} />
          </span>
          <span className="opacity-30 text-[9px] truncate">{s.name}</span>
        </div>
      ))}
    </div>
  );
}

// ── ASCII Fire ────────────────────────────────────────────────────────────────
function ASCIIFire() {
  const W = 34, H = 14;
  const chars = " .:-=+*#%@█";
  const buf = useRef(Array(W * H).fill(0));
  const [frame, setFrame] = useState("");

  useEffect(() => {
    const render = () => {
      const b = buf.current;
      // seed bottom row
      for (let x = 0; x < W; x++) b[(H - 1) * W + x] = 9 + Math.random() * 2;
      // propagate upward
      for (let y = 0; y < H - 1; y++) {
        for (let x = 0; x < W; x++) {
          const below = b[(y + 1) * W + x];
          const decay = Math.random() * 0.9;
          b[y * W + x] = Math.max(0, below - decay);
        }
      }
      const rows = [];
      for (let y = 0; y < H; y++) {
        let row = "";
        for (let x = 0; x < W; x++) {
          const v = Math.min(chars.length - 1, Math.floor(b[y * W + x]));
          row += chars[v];
        }
        rows.push(row);
      }
      setFrame(rows.join("\n"));
    };
    const id = setInterval(render, 60);
    return () => clearInterval(id);
  }, []);

  return (
    <pre className="font-mono text-[8px] leading-[1.2] select-none"
      style={{ background: "transparent", color: "transparent",
        backgroundImage: "linear-gradient(to top, #ff4400, #ff8800, #ffdd00, #ffffff)",
        WebkitBackgroundClip: "text", backgroundClip: "text" }}>
      {frame}
    </pre>
  );
}

// ── Conway's Game of Life ─────────────────────────────────────────────────────
function GameOfLife() {
  const COLS = 32, ROWS = 16;
  const rand = () => Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => Math.random() > 0.7 ? 1 : 0));

  const [grid, setGrid] = useState(rand);
  const [gen, setGen] = useState(0);

  useEffect(() => {
    const step = (g) => g.map((row, r) =>
      row.map((cell, c) => {
        let n = 0;
        for (let dr = -1; dr <= 1; dr++)
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const nr = (r + dr + ROWS) % ROWS, nc = (c + dc + COLS) % COLS;
            n += g[nr][nc];
          }
        return cell ? (n === 2 || n === 3 ? 1 : 0) : (n === 3 ? 1 : 0);
      })
    );

    const id = setInterval(() => {
      setGrid(g => {
        const next = step(g);
        setGen(x => x + 1);
        return next;
      });
    }, 120);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center gap-1">
      <pre className="font-mono text-[7px] leading-[1.1] select-none"
        style={{ color: "var(--theme-link)" }}>
        {grid.map(row => row.map(c => c ? "█" : "·").join("")).join("\n")}
      </pre>
      <span className="text-[9px] opacity-30 font-mono">gen {gen}</span>
    </div>
  );
}

// ── Corrupt Terminal ──────────────────────────────────────────────────────────
const LOG_LINES = [
  "kernel: usb 1-1.2: device descriptor read/64, error -71",
  "init: tty1 main process ended, respawning",
  "EXT4-fs error (device sda1): ext4_find_entry:1455",
  "kernel: general protection fault: 0000 [#1] SMP PTI",
  "systemd[1]: Reached target Shutdown.",
  "ACPI: bus type PCI registered",
  "NET: registered protocol family 2",
  "clocksource: tsc-early: mask: 0xffffffffffffffff",
];
const CORRUPT = "░▒▓█╳╱|\\";

function CorruptTerminal() {
  const [lines, setLines] = useState(() => LOG_LINES.slice(0, 5));
  const [corrupted, setCorrupted] = useState({}); // {lineIdx: {charIdx: replacedChar}}

  useEffect(() => {
    // occasionally corrupt a random char in a random line, then restore it
    const id = setInterval(() => {
      if (Math.random() < 0.35) {
        const li = Math.floor(Math.random() * lines.length);
        const ci = Math.floor(Math.random() * lines[li].length);
        const ch = CORRUPT[Math.floor(Math.random() * CORRUPT.length)];
        setCorrupted(prev => ({ ...prev, [`${li}-${ci}`]: ch }));
        setTimeout(() => {
          setCorrupted(prev => {
            const next = { ...prev };
            delete next[`${li}-${ci}`];
            return next;
          });
        }, 80 + Math.random() * 120);
      }
      // scroll: drop first line, add new one
      if (Math.random() < 0.08) {
        setLines(prev => {
          const next = [...prev.slice(1), LOG_LINES[Math.floor(Math.random() * LOG_LINES.length)]];
          return next;
        });
      }
    }, 200);
    return () => clearInterval(id);
  }, [lines]);

  return (
    <div className="font-mono text-[8px] leading-relaxed w-full h-full flex flex-col justify-center px-1 overflow-hidden">
      {lines.map((line, li) => (
        <div key={li} className="whitespace-nowrap overflow-hidden opacity-80">
          <span className="opacity-30 mr-1">›</span>
          {line.split("").map((ch, ci) => {
            const key = `${li}-${ci}`;
            return corrupted[key]
              ? <span key={ci} style={{ color: "var(--theme-link)", opacity: 0.9 }}>{corrupted[key]}</span>
              : <span key={ci}>{ch}</span>;
          })}
        </div>
      ))}
    </div>
  );
}

// ── Lissajous Tracer ──────────────────────────────────────────────────────────
function Lissajous() {
  const [t, setT] = useState(0);
  const presets = [
    { a: 3, b: 2, d: Math.PI / 4 },
    { a: 5, b: 4, d: Math.PI / 6 },
    { a: 2, b: 3, d: Math.PI / 2 },
    { a: 1, b: 2, d: Math.PI / 4 },
  ];
  const [preset, setPreset] = useState(0);
  const { a, b, d } = presets[preset];

  useEffect(() => {
    const id = setInterval(() => setT(x => x + 0.018), 30);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setPreset(p => (p + 1) % presets.length), 4000);
    return () => clearInterval(id);
  }, []);

  const N = 300;
  const pts = Array.from({ length: N }, (_, i) => {
    const u = (i / N) * Math.PI * 2 + t;
    return [70 + 60 * Math.sin(a * u + d), 70 + 60 * Math.sin(b * u)];
  });

  const dot = pts[pts.length - 1];

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <polyline
          points={pts.map(p => p.join(",")).join(" ")}
          fill="none"
          stroke="rgba(139,92,246,0.7)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <circle cx={dot[0]} cy={dot[1]} r="3" fill="#a78bfa" />
      </svg>
      <span className="font-mono text-[9px] opacity-30">{a}:{b}</span>
    </div>
  );
}

// ── ASCII Starfield ───────────────────────────────────────────────────────────
function Starfield() {
  const W = 36, H = 16;
  const N = 60;
  const stars = useRef(
    Array.from({ length: N }, () => ({
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: Math.random(),
    }))
  );
  const [frame, setFrame] = useState("");

  useEffect(() => {
    const render = () => {
      const s = stars.current;
      for (const star of s) {
        star.z -= 0.02;
        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * 2;
          star.y = (Math.random() - 0.5) * 2;
          star.z = 1;
        }
      }
      const grid = Array(H).fill(null).map(() => Array(W).fill(" "));
      for (const star of s) {
        const px = Math.floor((star.x / star.z + 1) * 0.5 * W);
        const py = Math.floor((star.y / star.z + 1) * 0.5 * H);
        if (px >= 0 && px < W && py >= 0 && py < H) {
          const depth = 1 - star.z;
          grid[py][px] = depth > 0.8 ? "★" : depth > 0.5 ? "+" : depth > 0.25 ? "·" : ".";
        }
      }
      setFrame(grid.map(r => r.join("")).join("\n"));
    };
    const id = setInterval(render, 50);
    return () => clearInterval(id);
  }, []);

  return (
    <pre className="font-mono text-[8px] leading-[1.2] select-none"
      style={{ color: "var(--theme-text)" }}>
      {frame}
    </pre>
  );
}

// ── Scope / Oscilloscope ──────────────────────────────────────────────────────
function Oscilloscope() {
  const canvasRef = useRef(null);
  const t = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;

    const draw = () => {
      t.current += 0.06;
      const dark = document.documentElement.classList.contains("dark");
      ctx.fillStyle = dark ? "rgba(0,0,0,0.15)" : "rgba(240,240,240,0.25)";
      ctx.fillRect(0, 0, W, H);
      // grid
      ctx.strokeStyle = dark ? "rgba(0,255,100,0.06)" : "rgba(0,100,60,0.12)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += 20) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
      for (let y = 0; y < H; y += 20) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
      // wave
      const waveColor = dark ? "#00ff88" : "#007744";
      ctx.beginPath();
      ctx.strokeStyle = waveColor;
      ctx.lineWidth = .50;
      ctx.shadowColor = waveColor;
      ctx.shadowBlur = dark ? 6 : 2;
      for (let x = 0; x < W; x++) {
        const u = (x / W) * Math.PI * 1;
        const y = H / 2 + (H / 2 - 8) * (
          Math.sin(u + t.current) * 0.7 +
          Math.sin(u * 1.3 + t.current * 5.7) * 0.3 +
          Math.sin(u * 1.5 + t.current * 0.4) * 0.2
        );
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    };
    const id = setInterval(draw, 30);
    return () => clearInterval(id);
  }, []);

  return <canvas ref={canvasRef} width={240} height={120} className="rounded" />;
}

// ── ASCII Progress Bars ───────────────────────────────────────────────────────
function ASCIIBars() {
  const tasks = ["LOADING", "PARSING", "COMPILING", "LINKING", "DONE"];
  const [progresses, setProgresses] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    const id = setInterval(() => {
      setProgresses(prev => prev.map((p, i) => {
        const target = i === 0 ? 100 : Math.min(100, prev[i - 1] > 40 ? p + Math.random() * 5 : p);
        return Math.min(100, p + (i === 0 ? Math.random() * 4 : 0) + (prev[i-1] > 40 ? Math.random() * 3 : 0));
      }).map(p => Math.min(100, p)));
    }, 80);
    return () => clearInterval(id);
  }, []);

  const bar = (pct) => {
    const filled = Math.floor(pct / 5);
    return "[" + "█".repeat(filled) + "░".repeat(20 - filled) + "]";
  };

  return (
    <div className="font-mono text-[9px] leading-relaxed h-full flex flex-col justify-center gap-1">
      {tasks.map((task, i) => (
        <div key={task} className="flex flex-col gap-0.5">
          <span className="opacity-50">{task}</span>
          <span className={progresses[i] >= 99 ? "text-green-400" : "text-yellow-300"}>
            {bar(progresses[i])} {Math.floor(progresses[i])}%
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Reaction Diffusion (Gray-Scott) ──────────────────────────────────────────
function ReactionDiffusion() {
  const W = 36, H = 18;
  const chars = " ·∶∷▪▫▬▮█";
  const A = useRef(Array(W * H).fill(1));
  const B = useRef(Array(W * H).fill(0));
  const [frame, setFrame] = useState("");
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      // seed center
      for (let dy = -2; dy <= 2; dy++)
        for (let dx = -2; dx <= 2; dx++) {
          const x = Math.floor(W/2) + dx, y = Math.floor(H/2) + dy;
          B.current[y * W + x] = 1;
          A.current[y * W + x] = 0;
        }
    }
    const f = 0.055, k = 0.062, Da = 0.21, Db = 0.105;
    const render = () => {
      const a = A.current, b = B.current;
      const na = [...a], nb = [...b];
      for (let y = 1; y < H - 1; y++) {
        for (let x = 1; x < W - 1; x++) {
          const i = y * W + x;
          const lapA = a[i-1]+a[i+1]+a[(y-1)*W+x]+a[(y+1)*W+x] - 4*a[i];
          const lapB = b[i-1]+b[i+1]+b[(y-1)*W+x]+b[(y+1)*W+x] - 4*b[i];
          const abb = a[i]*b[i]*b[i];
          na[i] = Math.max(0, Math.min(1, a[i] + Da*lapA - abb + f*(1-a[i])));
          nb[i] = Math.max(0, Math.min(1, b[i] + Db*lapB + abb - (k+f)*b[i]));
        }
      }
      A.current = na; B.current = nb;
      const rows = [];
      for (let y = 0; y < H; y++) {
        let row = "";
        for (let x = 0; x < W; x++) {
          const v = Math.floor(nb[y*W+x] * (chars.length - 1));
          row += chars[Math.min(chars.length - 1, Math.max(0, v))];
        }
        rows.push(row);
      }
      setFrame(rows.join("\n"));
    };
    const id = setInterval(render, 50);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center gap-1">
      <pre className="font-mono text-[8px] leading-[1.15] select-none"
        style={{ color: "var(--theme-accent)" }}>{frame}</pre>
      <span className="font-mono text-[9px] opacity-20">gray-scott</span>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function MotionExamples() {
  const demos = [
    { title: "ascii globe",             wide: false, component: <ASCIIGlobe /> },
    { title: "matrix rain",             wide: false, component: <MatrixRain /> },
    { title: "terminal spinners",       wide: false, component: <TerminalSpinners /> },
    { title: "ascii fire",              wide: false, component: <ASCIIFire /> },
    { title: "game of life",            wide: false, component: <GameOfLife /> },
    { title: "corrupt terminal",         wide: false, component: <CorruptTerminal /> },
    { title: "lissajous",               wide: false, component: <Lissajous /> },
    { title: "ascii starfield",         wide: false, component: <Starfield /> },
    { title: "oscilloscope",            wide: false, component: <Oscilloscope /> },
    { title: "ascii progress",          wide: false, component: <ASCIIBars /> },
    { title: "reaction diffusion",      wide: false, component: <ReactionDiffusion /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {demos.map(({ title, component }) => (
        <div
          key={title}
          className="rounded-lg border border-[color:var(--theme-grid-bg)] p-3 flex flex-col overflow-hidden"
          style={{ background: "var(--theme-bg2, var(--theme-bg))", minHeight: "180px" }}
        >
          <p className="font-mono text-[9px] uppercase tracking-widest opacity-30 mb-2">{title}</p>
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            {component}
          </div>
        </div>
      ))}
    </div>
  );
}
