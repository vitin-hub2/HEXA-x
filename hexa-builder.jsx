import { useState, useEffect, useRef, useCallback } from "react";

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 16, className = "", strokeWidth = 1.75, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
    strokeLinejoin="round" className={className} style={style}>
    <path d={d} />
  </svg>
);
const Icons = {
  send: "M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z",
  stop: "M6 6h12v12H6z",
  refresh: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8M3 3v5h5",
  trash: "M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  code: "M16 18l6-6-6-6M8 6l-6 6 6 6",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
  plus: "M12 5v14M5 12h14",
  chevronDown: "M6 9l6 6 6-6",
  external: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3",
  monitor: "M20 3H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8 21h8M12 17v4",
  smartphone: "M5 2h14a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM12 18h.01",
  sparkles: "M12 3l1.88 5.76L19.64 10l-4.5 3.24L16.76 19 12 15.77 7.24 19l1.62-5.76L4.36 10l5.76-1.24L12 3z",
  back: "M19 12H5M12 19l-7-7 7-7",
  pen: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  check: "M20 6L9 17l-5-5",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  globe: "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  copy: "M20 9h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2zM5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 0 2 2v1",
  grid: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  layers: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  cpu: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
  wand: "M15 4V2m0 14v-2M8 9h2m10 0h2M17.8 11.8L19 13M15 9h0M4.2 4.2L5.4 5.4M10.2 10.2l1.2 1.2",
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const genId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

function extractHtml(markdown) {
  if (!markdown) return null;
  const fence = /```(\w+)?\n([\s\S]*?)(```|$)/g;
  let blocks = [], m;
  while ((m = fence.exec(markdown)) !== null) {
    blocks.push({ lang: (m[1] || "").toLowerCase(), content: m[2] ?? "" });
  }
  for (let i = blocks.length - 1; i >= 0; i--) {
    const b = blocks[i];
    if (b.lang === "html" || /<!doctype\s+html/i.test(b.content) || /<html[\s>]/i.test(b.content)) {
      if (b.content.trim()) return b.content.trim();
    }
  }
  return null;
}

function extractCode(markdown) {
  if (!markdown) return null;
  const fence = /```(\w+)?\n([\s\S]*?)(```|$)/g;
  let last = null, m;
  while ((m = fence.exec(markdown)) !== null) {
    last = { lang: (m[1] || "txt").toLowerCase(), content: m[2] ?? "" };
  }
  return last;
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #FAFAF7;
    --bg2: #F4F4EF;
    --fg: #1A1A14;
    --fg2: #6B6B5A;
    --fg3: #9B9B88;
    --border: rgba(0,0,0,0.08);
    --border2: rgba(0,0,0,0.14);
    --gold: #C9A84C;
    --gold-neon: #E8C55A;
    --gold-glow: rgba(201,168,76,0.25);
    --gold-soft: rgba(201,168,76,0.1);
    --card: rgba(255,255,255,0.72);
    --glass: rgba(255,255,255,0.55);
    --glass-strong: rgba(255,255,255,0.82);
    --radius: 16px;
    --radius-sm: 10px;
    --radius-lg: 24px;
    --shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.05);
    --shadow-gold: 0 0 0 1px rgba(201,168,76,0.3), 0 4px 24px rgba(201,168,76,0.18);
    --font: 'DM Sans', system-ui, sans-serif;
    --mono: 'DM Mono', monospace;
  }

  body { font-family: var(--font); background: var(--bg); color: var(--fg); line-height: 1.5; overflow: hidden; height: 100vh; }

  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 99px; }

  .root { display: flex; height: 100vh; overflow: hidden; }
  .sidebar { width: 260px; min-width: 260px; background: var(--bg2); border-right: 1px solid var(--border); display: flex; flex-direction: column; overflow: hidden; transition: width 0.2s; }
  .sidebar.collapsed { width: 0; min-width: 0; }
  .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; position: relative; }

  .sidebar-header { padding: 18px 16px 12px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; }
  .sidebar-logo { width: 32px; height: 32px; background: linear-gradient(135deg, var(--gold-neon), var(--gold)); border-radius: 9px; display: grid; place-items: center; flex-shrink: 0; box-shadow: 0 2px 8px var(--gold-glow); }
  .sidebar-logo svg { color: #1A1A14; }
  .sidebar-brand { font-size: 15px; font-weight: 700; letter-spacing: -0.4px; }
  .sidebar-brand span { color: var(--gold); }
  .sidebar-nav { flex: 1; overflow-y: auto; padding: 10px 8px; display: flex; flex-direction: column; gap: 1px; }
  .sidebar-label { font-size: 10px; font-weight: 600; color: var(--fg3); letter-spacing: 0.08em; text-transform: uppercase; padding: 12px 8px 4px; }
  .sidebar-item { display: flex; align-items: center; gap: 9px; padding: 8px 10px; border-radius: var(--radius-sm); cursor: pointer; font-size: 13px; color: var(--fg2); transition: all 0.15s; border: 1px solid transparent; white-space: nowrap; overflow: hidden; }
  .sidebar-item:hover { background: var(--glass); color: var(--fg); }
  .sidebar-item.active { background: var(--card); color: var(--fg); border-color: var(--border); box-shadow: var(--shadow); }
  .sidebar-item .item-name { flex: 1; overflow: hidden; text-overflow: ellipsis; }
  .sidebar-item .item-star { opacity: 0; transition: opacity 0.15s; }
  .sidebar-item:hover .item-star, .sidebar-item .item-star.starred { opacity: 1; }
  .sidebar-item .item-star.starred { color: var(--gold); }
  .sidebar-footer { padding: 12px; border-top: 1px solid var(--border); }
  .btn-new { width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 10px; border-radius: var(--radius-sm); background: linear-gradient(135deg, var(--gold-neon), var(--gold)); color: #1A1A14; font-size: 13px; font-weight: 600; cursor: pointer; border: none; font-family: var(--font); transition: all 0.2s; box-shadow: 0 2px 8px var(--gold-glow); }
  .btn-new:hover { box-shadow: var(--shadow-gold); transform: translateY(-1px); }

  .home { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 32px 24px; overflow-y: auto; position: relative; }
  .orb { position: absolute; pointer-events: none; border-radius: 50%; filter: blur(80px); opacity: 0.35; }
  .orb-1 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(201,168,76,0.5), transparent 70%); top: -100px; left: 50%; transform: translateX(-50%); }
  .orb-2 { width: 300px; height: 300px; background: radial-gradient(circle, rgba(232,197,90,0.4), transparent 70%); bottom: 100px; right: 10%; }
  .home-badge { display: inline-flex; align-items: center; gap: 8px; background: var(--glass-strong); border: 1px solid var(--border); border-radius: 99px; padding: 5px 14px 5px 6px; font-size: 11px; color: var(--fg2); backdrop-filter: blur(12px); margin-bottom: 28px; }
  .home-badge-pill { background: linear-gradient(135deg, var(--gold-neon), var(--gold)); color: #1A1A14; font-size: 9px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 2px 8px; border-radius: 99px; }
  .home-logo { width: 56px; height: 56px; background: linear-gradient(135deg, var(--gold-neon), var(--gold)); border-radius: 16px; display: grid; place-items: center; margin: 0 auto 20px; box-shadow: 0 0 32px var(--gold-glow), 0 4px 16px rgba(0,0,0,0.1); }
  .home-title { font-size: clamp(28px, 5vw, 48px); font-weight: 700; text-align: center; letter-spacing: -1.5px; line-height: 1.15; margin-bottom: 12px; }
  .home-title .gold { background: linear-gradient(135deg, var(--gold-neon), var(--gold)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .home-sub { font-size: 15px; color: var(--fg2); text-align: center; max-width: 480px; line-height: 1.6; margin-bottom: 36px; }
  .home-input-wrap { width: 100%; max-width: 720px; position: relative; z-index: 2; }
  .home-suggestions { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-top: 20px; max-width: 680px; }
  .suggestion-chip { background: var(--glass); border: 1px solid var(--border); border-radius: 99px; padding: 6px 14px; font-size: 12px; color: var(--fg2); cursor: pointer; transition: all 0.15s; backdrop-filter: blur(8px); white-space: nowrap; }
  .suggestion-chip:hover { border-color: var(--gold); color: var(--fg); background: var(--gold-soft); }
  .home-projects { width: 100%; max-width: 760px; margin-top: 40px; }
  .section-title { font-size: 12px; font-weight: 600; color: var(--fg3); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 14px; }
  .project-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 10px; }
  .project-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 14px; cursor: pointer; transition: all 0.2s; position: relative; overflow: hidden; min-height: 90px; display: flex; flex-direction: column; justify-content: flex-end; }
  .project-card::before { content: ''; position: absolute; inset: 0; opacity: 0.5; }
  .project-card:hover { border-color: var(--gold); box-shadow: 0 4px 16px var(--gold-glow); transform: translateY(-2px); }
  .project-card-name { font-size: 12px; font-weight: 600; position: relative; z-index: 1; line-height: 1.35; }
  .project-card-date { font-size: 10px; color: var(--fg3); position: relative; z-index: 1; margin-top: 2px; }

  /* COMPLEXITY BADGE */
  .complexity-badge { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 99px; font-size: 10px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; }
  .complexity-simple { background: rgba(100,200,100,0.12); color: #3a9a3a; border: 1px solid rgba(100,200,100,0.25); }
  .complexity-medium { background: rgba(201,168,76,0.12); color: var(--gold); border: 1px solid rgba(201,168,76,0.25); }
  .complexity-complex { background: rgba(200,100,255,0.1); color: #a855f7; border: 1px solid rgba(200,100,255,0.2); }
  .complexity-expert { background: rgba(255,80,80,0.1); color: #e05; border: 1px solid rgba(255,80,80,0.2); }

  /* PROMPT INPUT */
  .prompt-box { background: var(--glass-strong); border: 1px solid var(--border2); border-radius: var(--radius-lg); backdrop-filter: blur(16px); box-shadow: var(--shadow); transition: border-color 0.2s, box-shadow 0.2s; overflow: hidden; }
  .prompt-box:focus-within { border-color: var(--gold); box-shadow: var(--shadow-gold); }
  .prompt-textarea { width: 100%; background: transparent; border: none; outline: none; resize: none; padding: 18px 20px 8px; font-size: 15px; color: var(--fg); font-family: var(--font); line-height: 1.55; min-height: 28px; max-height: 200px; }
  .prompt-textarea::placeholder { color: var(--fg3); }
  .prompt-actions { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px 12px; gap: 8px; }
  .mode-btn { display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 99px; font-size: 12px; font-weight: 500; color: var(--fg2); cursor: pointer; border: 1px solid var(--border); background: var(--glass); transition: all 0.15s; font-family: var(--font); }
  .mode-btn:hover { border-color: var(--gold); color: var(--fg); }
  .send-btn { width: 36px; height: 36px; border-radius: 99px; border: none; cursor: pointer; display: grid; place-items: center; transition: all 0.2s; font-family: var(--font); }
  .send-btn.active { background: linear-gradient(135deg, var(--gold-neon), var(--gold)); color: #1A1A14; box-shadow: 0 2px 8px var(--gold-glow); }
  .send-btn.active:hover { box-shadow: var(--shadow-gold); transform: scale(1.05); }
  .send-btn.inactive { background: var(--bg2); color: var(--fg3); }
  .send-btn.stop { background: var(--fg); color: var(--bg); }
  .mode-dropdown { position: absolute; bottom: calc(100% + 8px); left: 0; background: var(--glass-strong); border: 1px solid var(--border); border-radius: var(--radius); padding: 6px; min-width: 280px; box-shadow: var(--shadow); backdrop-filter: blur(16px); z-index: 100; }
  .mode-option { display: flex; flex-direction: column; gap: 1px; padding: 9px 12px; border-radius: var(--radius-sm); cursor: pointer; transition: background 0.1s; }
  .mode-option:hover { background: var(--gold-soft); }
  .mode-option-name { font-size: 13px; font-weight: 600; color: var(--fg); }
  .mode-option-desc { font-size: 11px; color: var(--fg3); }

  /* COMPLEXITY SELECTOR */
  .complexity-row { display: flex; align-items: center; gap: 6px; padding: 0 12px 10px; flex-wrap: wrap; }
  .complexity-row-label { font-size: 11px; color: var(--fg3); font-weight: 500; }
  .complexity-pill { padding: 3px 10px; border-radius: 99px; font-size: 11px; font-weight: 500; cursor: pointer; border: 1px solid transparent; transition: all 0.15s; font-family: var(--font); background: var(--bg2); color: var(--fg3); }
  .complexity-pill:hover { color: var(--fg); border-color: var(--border2); }
  .complexity-pill.active-simple { background: rgba(100,200,100,0.12); color: #3a9a3a; border-color: rgba(100,200,100,0.35); }
  .complexity-pill.active-medium { background: rgba(201,168,76,0.12); color: var(--gold); border-color: rgba(201,168,76,0.35); }
  .complexity-pill.active-complex { background: rgba(200,100,255,0.1); color: #a855f7; border-color: rgba(200,100,255,0.3); }
  .complexity-pill.active-expert { background: rgba(255,80,80,0.1); color: #e05; border-color: rgba(255,80,80,0.3); }

  /* WORKSPACE */
  .workspace { flex: 1; display: flex; overflow: hidden; }
  .chat-panel { width: 420px; min-width: 360px; max-width: 480px; display: flex; flex-direction: column; border-right: 1px solid var(--border); background: var(--bg); }
  .chat-header { padding: 14px 16px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; background: var(--glass-strong); backdrop-filter: blur(12px); }
  .chat-title { flex: 1; font-size: 14px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .chat-header-btn { width: 32px; height: 32px; border-radius: 99px; border: none; background: transparent; color: var(--fg2); cursor: pointer; display: grid; place-items: center; transition: all 0.15s; }
  .chat-header-btn:hover { background: var(--bg2); color: var(--fg); }
  .chat-header-btn.danger:hover { background: rgba(220,50,50,0.1); color: #dc3232; }
  .chat-messages { flex: 1; overflow-y: auto; padding: 20px 16px; display: flex; flex-direction: column; gap: 16px; }
  .msg { display: flex; gap: 10px; }
  .msg.user { flex-direction: row-reverse; }
  .msg-avatar { width: 30px; height: 30px; border-radius: 10px; flex-shrink: 0; display: grid; place-items: center; }
  .msg-avatar.ai { background: linear-gradient(135deg, var(--gold-neon), var(--gold)); color: #1A1A14; font-size: 12px; font-weight: 700; }
  .msg-avatar.user { background: var(--fg); color: var(--bg); font-size: 11px; font-weight: 700; }
  .msg-bubble { max-width: 85%; padding: 11px 15px; border-radius: 16px; font-size: 13.5px; line-height: 1.6; }
  .msg-bubble.ai { background: var(--glass); border: 1px solid var(--border); border-top-left-radius: 4px; }
  .msg-bubble.user { background: var(--fg); color: var(--bg); border-top-right-radius: 4px; }
  .msg-thinking { display: flex; gap: 4px; align-items: center; padding: 13px 15px; }
  .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold); animation: pulse 1.4s ease-in-out infinite; }
  .dot:nth-child(2) { animation-delay: 0.2s; }
  .dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes pulse { 0%,80%,100% { transform: scale(0.7); opacity: 0.5; } 40% { transform: scale(1); opacity: 1; } }
  .chat-input-area { padding: 12px; border-top: 1px solid var(--border); background: var(--bg); }

  /* PROGRESS BAR */
  .build-progress { padding: 0 16px 10px; }
  .build-progress-bar { height: 3px; background: var(--bg2); border-radius: 99px; overflow: hidden; }
  .build-progress-fill { height: 100%; background: linear-gradient(90deg, var(--gold-neon), var(--gold)); border-radius: 99px; transition: width 0.4s ease; }
  .build-progress-label { font-size: 11px; color: var(--fg3); margin-top: 5px; display: flex; justify-content: space-between; }

  /* PREVIEW PANEL */
  .preview-panel { flex: 1; display: flex; flex-direction: column; overflow: hidden; background: var(--bg2); }
  .preview-header { padding: 10px 14px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; background: var(--glass-strong); backdrop-filter: blur(12px); flex-shrink: 0; }
  .preview-tabs { display: flex; background: var(--bg2); border-radius: 99px; padding: 3px; gap: 2px; }
  .preview-tab { padding: 5px 14px; border-radius: 99px; font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.15s; border: none; font-family: var(--font); color: var(--fg2); background: transparent; }
  .preview-tab.active { background: var(--card); color: var(--fg); box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
  .preview-actions { display: flex; gap: 4px; margin-left: auto; }
  .preview-btn { width: 30px; height: 30px; border-radius: 8px; border: none; background: transparent; color: var(--fg2); cursor: pointer; display: grid; place-items: center; transition: all 0.15s; }
  .preview-btn:hover { background: var(--bg2); color: var(--fg); }
  .preview-device-btns { display: flex; background: var(--bg2); border-radius: 99px; padding: 2px; gap: 1px; }
  .preview-device-btn { width: 28px; height: 24px; display: grid; place-items: center; border-radius: 99px; border: none; cursor: pointer; transition: all 0.15s; font-family: var(--font); }
  .preview-device-btn.active { background: var(--card); box-shadow: 0 1px 3px rgba(0,0,0,0.08); color: var(--fg); }
  .preview-device-btn:not(.active) { background: transparent; color: var(--fg3); }
  .preview-content { flex: 1; overflow: auto; display: flex; align-items: flex-start; justify-content: center; padding: 16px; }
  .preview-frame-wrap { background: white; border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow); transition: width 0.3s; height: 100%; }
  .preview-frame-wrap.desktop { width: 100%; }
  .preview-frame-wrap.mobile { width: 390px; max-width: 100%; }
  .preview-iframe { width: 100%; height: 100%; border: none; min-height: 500px; }
  .preview-empty { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; color: var(--fg3); text-align: center; padding: 40px; }
  .preview-empty-icon { width: 56px; height: 56px; background: var(--gold-soft); border-radius: 16px; display: grid; place-items: center; color: var(--gold); }
  .preview-empty p { font-size: 13px; line-height: 1.6; max-width: 280px; }

  /* CODE PANEL */
  .code-wrap { flex: 1; overflow: auto; background: #1A1A14; border-radius: var(--radius); margin: 16px; padding: 20px; position: relative; }
  .code-wrap pre { font-family: var(--mono); font-size: 12.5px; line-height: 1.7; color: #E8C55A; white-space: pre-wrap; word-break: break-all; }
  .code-copy-btn { position: absolute; top: 12px; right: 12px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); color: #E8C55A; padding: 6px 12px; border-radius: 8px; font-size: 12px; cursor: pointer; font-family: var(--font); transition: all 0.15s; display: flex; align-items: center; gap: 6px; }
  .code-copy-btn:hover { background: rgba(255,255,255,0.18); }

  /* PUBLISH MODAL */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(8px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; }
  .modal { background: var(--glass-strong); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 32px; max-width: 480px; width: 100%; backdrop-filter: blur(20px); box-shadow: 0 20px 60px rgba(0,0,0,0.15); }
  .modal h2 { font-size: 20px; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 6px; }
  .modal p { font-size: 13.5px; color: var(--fg2); line-height: 1.6; margin-bottom: 24px; }
  .publish-opts { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
  .publish-opt { display: flex; align-items: center; gap: 14px; padding: 14px 16px; background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); cursor: pointer; transition: all 0.2s; }
  .publish-opt:hover { border-color: var(--gold); background: var(--gold-soft); }
  .publish-opt-icon { width: 40px; height: 40px; border-radius: 10px; display: grid; place-items: center; font-size: 18px; flex-shrink: 0; }
  .publish-opt-info h4 { font-size: 14px; font-weight: 600; margin-bottom: 2px; }
  .publish-opt-info p { font-size: 12px; color: var(--fg2); margin: 0; }
  .modal-close { width: 100%; padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--border); background: transparent; color: var(--fg2); font-size: 14px; font-weight: 500; cursor: pointer; font-family: var(--font); transition: all 0.15s; }
  .modal-close:hover { background: var(--bg2); color: var(--fg); }

  /* MISC */
  .topbar { padding: 12px 16px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; background: var(--glass-strong); backdrop-filter: blur(12px); flex-shrink: 0; }
  .topbar-back { width: 32px; height: 32px; border-radius: 99px; border: none; background: transparent; color: var(--fg2); cursor: pointer; display: grid; place-items: center; transition: all 0.15s; }
  .topbar-back:hover { background: var(--bg2); color: var(--fg); }
  .status-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--gold-neon); box-shadow: 0 0 8px var(--gold-neon); animation: blink 1.5s ease-in-out infinite; }
  @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
  .tag { font-size: 10px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; padding: 2px 8px; border-radius: 99px; }
  .tag-gold { background: var(--gold-soft); color: var(--gold); border: 1px solid rgba(201,168,76,0.2); }
  .no-select { user-select: none; }
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .items-center { align-items: center; }
  .gap-2 { gap: 8px; }
  .gap-1 { gap: 4px; }
  .ml-auto { margin-left: auto; }
  .text-muted { color: var(--fg3); font-size: 12px; }
  .spin { animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .fade-in { animation: fadeIn 0.3s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

  /* MARKDOWN */
  .md h1,.md h2,.md h3 { font-weight: 700; letter-spacing: -0.3px; margin-bottom: 6px; }
  .md p { margin-bottom: 10px; }
  .md p:last-child { margin-bottom: 0; }
  .md ul,.md ol { margin: 8px 0 10px 20px; }
  .md li { margin-bottom: 4px; }
  .md code { font-family: var(--mono); font-size: 12px; background: var(--bg2); padding: 1px 5px; border-radius: 4px; color: var(--gold); }
  .md pre { background: #1A1A14; border-radius: 10px; padding: 14px; overflow-x: auto; margin: 12px 0; }
  .md pre code { background: none; color: var(--gold-neon); padding: 0; font-size: 12px; }
  .md strong { font-weight: 700; }
  .md a { color: var(--gold); text-decoration: underline; }

  /* RESIZABLE */
  .resize-handle { width: 4px; background: transparent; cursor: col-resize; transition: background 0.15s; flex-shrink: 0; }
  .resize-handle:hover { background: var(--gold-soft); }

  @media (max-width: 900px) {
    .sidebar { display: none; }
    .chat-panel { width: 100%; min-width: unset; max-width: unset; }
    .preview-panel { display: none; }
  }
`;

// ─── COMPLEXITY LEVELS ────────────────────────────────────────────────────────
const COMPLEXITY_LEVELS = {
  simple: {
    label: "Simple",
    emoji: "⚡",
    tokens: 6000,
    desc: "Fast single-page output",
    instruction: `Keep the output focused and concise. Prioritize speed and clarity. 1 page, minimal JS, clean CSS.`,
  },
  medium: {
    label: "Medium",
    emoji: "🔥",
    tokens: 10000,
    desc: "Multi-section with interactions",
    instruction: `Build a well-structured multi-section app with meaningful interactivity, state management, and polished UI. Include multiple views or tabs if appropriate.`,
  },
  complex: {
    label: "Complex",
    emoji: "🚀",
    tokens: 14000,
    desc: "Full app with routing & data",
    instruction: `Build a comprehensive, feature-rich application. Include:
- Client-side routing (SPA with hash-based navigation or view switching)
- Realistic local state / mock data persisted with localStorage
- Multiple distinct pages/views with navigation
- Advanced UI patterns: modals, toasts, dropdowns, sidebars, tables, forms with validation
- Loading states, empty states, error states
- Search/filter/sort functionality where applicable
- Polished animations and micro-interactions using CSS transitions
- At least 200 lines of meaningful JavaScript logic`,
  },
  expert: {
    label: "Expert",
    emoji: "💎",
    tokens: 16000,
    desc: "Production-grade architecture",
    instruction: `Build a production-grade, architect-level application with:
- Full SPA architecture with client-side router (hash routing)
- Centralized state management pattern (pub/sub or observer)
- Persistent data layer using localStorage with a clean API
- Multiple modules: auth simulation (login/logout with session), dashboard, data views, settings
- Rich data tables with sort, filter, pagination
- Form system with real-time validation and error messages
- Notification/toast system
- Keyboard navigation & accessibility (ARIA roles, focus management)
- Responsive layout with sidebar, topbar, main content area
- Dark/light mode toggle with CSS variables
- Performance optimizations: event delegation, debouncing
- At least 400 lines of pure, clean JavaScript
- Real-world copy with realistic mock data (no "Lorem ipsum")
The result should look and feel like a real startup's internal tool or SaaS product.`,
  },
};

// ─── SYSTEM PROMPTS ───────────────────────────────────────────────────────────
const BASE_BUILD_PROMPT = `You are HEXA, an elite senior full-stack engineer and UI/UX designer. You build exceptional apps, websites and digital products from prompts.

═══════════════════════════════════════════
CRITICAL OUTPUT FORMAT — FOLLOW EXACTLY
═══════════════════════════════════════════

1. Start with ONE sentence (≤20 words) describing what you built.

2. Output ONE complete, fully-runnable single-file HTML document in a fenced \`\`\`html code block.

THE HTML FILE MUST:
✓ Start with <!DOCTYPE html> and include all required meta tags (charset, viewport)
✓ Inline ALL CSS inside a <style> tag in <head> — no external stylesheets
✓ Inline ALL JavaScript inside a <script> tag at the end of <body> — no external scripts
✓ Use CDN imports only from: cdnjs.cloudflare.com, cdn.jsdelivr.net, unpkg.com, fonts.googleapis.com
✓ Be fully self-contained — works by opening the HTML file in any browser with no server

VISUAL QUALITY REQUIREMENTS:
✓ Choose a distinctive, opinionated design direction (not generic/boring)
✓ Use a custom font from Google Fonts that matches the app's personality
✓ Define a cohesive color system with CSS custom properties (--color-*)
✓ Create depth with shadows, gradients, blur effects (backdrop-filter)
✓ Add meaningful animations: page load reveals, hover states, transitions
✓ Use modern layout: CSS Grid + Flexbox intelligently combined
✓ Every clickable element must have a visible hover/active state
✓ Use real, contextual copy — never placeholder text
✓ Be fully responsive — works on mobile (375px) and desktop (1440px)

FUNCTIONAL REQUIREMENTS:
✓ Every single button, link, form, and UI control must be functional
✓ Interactive elements respond immediately with visual feedback
✓ Forms must validate input and show meaningful error/success states
✓ No broken interactions — test every user flow mentally before writing

3. After the code block, write:
   **What's inside** (3-5 bullet points of key features)
   **Next steps** (3 suggestions for what to build next)

═══════════════════════════════════════════
NEVER output incomplete or skeleton code.
The iframe preview runs immediately — deliver perfection.
═══════════════════════════════════════════`;

const SYSTEM_PROMPTS = {
  build: (complexity) => `${BASE_BUILD_PROMPT}

COMPLEXITY LEVEL: ${COMPLEXITY_LEVELS[complexity].label.toUpperCase()} ${COMPLEXITY_LEVELS[complexity].emoji}
${COMPLEXITY_LEVELS[complexity].instruction}`,

  design: `You are HEXA in Design Mode — you architect the experience before writing code.

DELIVERABLE FORMAT:
1. **Concept** (2-3 sentences) — the core idea, target user, and emotional tone
2. **Visual System**:
   - Color palette: 4-6 colors with hex values and usage roles
   - Typography: specific Google Font pairings (display + body + mono)
   - Spacing scale: base unit and scale ratios
   - Motion principles: easing curves, durations, personality
3. **Information Architecture**: pages/views list with purpose of each
4. **Component Inventory**: list every UI component with description
5. **Key Interactions**: describe the 3-5 most important user flows step by step
6. **Edge Cases**: empty states, error states, loading states for each major view
7. **Accessibility Notes**: color contrast requirements, keyboard nav plan
8. **Implementation Roadmap**: ordered list of what to build first

Be opinionated. Make specific choices. No "it depends" — commit to a direction.`,

  explain: `You are HEXA in Explain Mode — you teach concepts with clarity and precision.

FORMAT:
1. **TL;DR** — one-paragraph plain-English summary
2. **Core Concept** — the mental model with an analogy
3. **Code Examples** — small, focused snippets (use \`\`\`html, \`\`\`css, \`\`\`js)
4. **Alternatives & Tradeoffs** — when to use what
5. **Common Pitfalls** — top 3 mistakes and how to avoid them
6. **When to use this** — concrete scenarios

Use real-world analogies. Be concrete, not vague.`,
};

const SUGGESTIONS = [
  "SaaS dashboard with charts & KPIs",
  "E-commerce store with cart & checkout",
  "Real-time crypto tracker",
  "Project management Kanban board",
  "AI-powered note-taking app",
  "Minimal pomodoro timer",
  "Admin panel with user management",
  "Interactive data visualization tool",
  "Social media profile builder",
  "Invoice generator with PDF export",
];

const TEMPLATES = [
  { name: "SaaS Landing", icon: "🚀", complexity: "medium", prompt: "A modern SaaS landing page with hero, feature grid, social proof, pricing table, and FAQ. Dark premium aesthetic, animated gradients." },
  { name: "Dashboard", icon: "📊", complexity: "complex", prompt: "A full analytics dashboard with sidebar nav, KPI cards, line/bar charts using Chart.js, data table with sorting, and dark theme." },
  { name: "E-Commerce", icon: "🛍️", complexity: "complex", prompt: "A product store with filterable grid, cart sidebar, checkout flow, and order confirmation. Modern clean design." },
  { name: "Kanban Board", icon: "🗂️", complexity: "complex", prompt: "A drag-and-drop Kanban board with columns (Todo/In Progress/Done), card creation, priorities, and local persistence." },
  { name: "Portfolio", icon: "✨", complexity: "medium", prompt: "A creative developer portfolio with animated hero, project cards with live demos, skills section, and contact form." },
  { name: "Game", icon: "🎮", complexity: "medium", prompt: "A neon arcade snake game with score tracking, speed levels, high score persistence, and game over screen." },
];

// ─── MARKDOWN RENDERER ────────────────────────────────────────────────────────
function renderMarkdown(text) {
  if (!text) return "";
  return text
    .replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) =>
      `<pre><code>${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/^[-*] (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[hou]|<pre|<li)(.*)/gm, (l) => l ? `<p>${l}</p>` : "")
    .replace(/<p><\/p>/g, "");
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [projects, setProjects] = useState(() => {
    try { return JSON.parse(localStorage.getItem("hexa-projects") || "[]"); }
    catch { return []; }
  });
  const [activeId, setActiveId] = useState(null);
  const [view, setView] = useState("home");
  const [showPublish, setShowPublish] = useState(false);

  useEffect(() => {
    try { localStorage.setItem("hexa-projects", JSON.stringify(projects)); }
    catch {}
  }, [projects]);

  const activeProject = projects.find(p => p.id === activeId);

  const createProject = (prompt, mode, complexity = "medium") => {
    const id = genId();
    const name = prompt.trim().slice(0, 42) + (prompt.length > 42 ? "…" : "");
    const project = { id, name, mode, complexity, messages: [], html: null, starred: false, createdAt: Date.now() };
    setProjects(prev => [project, ...prev]);
    sessionStorage.setItem(`hexa-init-${id}`, prompt);
    setActiveId(id);
    setView("workspace");
    return id;
  };

  const updateProject = (id, patch) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...patch } : p));
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    if (activeId === id) { setActiveId(null); setView("home"); }
  };

  const openProject = (id) => { setActiveId(id); setView("workspace"); };

  return (
    <>
      <style>{css}</style>
      <div className="root">
        <Sidebar
          projects={projects}
          activeId={activeId}
          onNew={() => { setActiveId(null); setView("home"); }}
          onOpen={openProject}
          onDelete={deleteProject}
          onStar={id => updateProject(id, { starred: !projects.find(p => p.id === id)?.starred })}
        />
        <div className="main">
          {view === "home" && (
            <HomeView projects={projects} onSubmit={createProject} onOpen={openProject} />
          )}
          {view === "workspace" && activeProject && (
            <WorkspaceView
              key={activeId}
              project={activeProject}
              onUpdate={patch => updateProject(activeId, patch)}
              onBack={() => setView("home")}
              onDelete={() => deleteProject(activeId)}
              onPublish={() => setShowPublish(true)}
              onStar={() => updateProject(activeId, { starred: !activeProject.starred })}
            />
          )}
        </div>
        {showPublish && (
          <PublishModal project={activeProject} onClose={() => setShowPublish(false)} />
        )}
      </div>
    </>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function Sidebar({ projects, activeId, onNew, onOpen, onDelete, onStar }) {
  const starred = projects.filter(p => p.starred);
  const recent = projects.slice(0, 12);
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Icon d={Icons.zap} size={18} strokeWidth={2.5} />
        </div>
        <div className="sidebar-brand">HEX<span>A</span></div>
      </div>
      <div className="sidebar-nav">
        {starred.length > 0 && (
          <>
            <div className="sidebar-label">Starred</div>
            {starred.map(p => (
              <SidebarItem key={p.id} project={p} active={p.id === activeId}
                onOpen={onOpen} onDelete={onDelete} onStar={onStar} />
            ))}
          </>
        )}
        <div className="sidebar-label">Recent</div>
        {recent.length === 0 && (
          <div style={{ padding: "8px 10px", fontSize: 12, color: "var(--fg3)" }}>
            No projects yet. Start building!
          </div>
        )}
        {recent.map(p => (
          <SidebarItem key={p.id} project={p} active={p.id === activeId}
            onOpen={onOpen} onDelete={onDelete} onStar={onStar} />
        ))}
      </div>
      <div className="sidebar-footer">
        <button className="btn-new" onClick={onNew}>
          <Icon d={Icons.plus} size={15} strokeWidth={2.5} />
          New project
        </button>
      </div>
    </div>
  );
}

function SidebarItem({ project, active, onOpen, onDelete, onStar }) {
  const cx = project.complexity || "medium";
  const cEmoji = COMPLEXITY_LEVELS[cx]?.emoji || "🔥";
  return (
    <div className={`sidebar-item ${active ? "active" : ""}`} onClick={() => onOpen(project.id)}>
      <span style={{ fontSize: 13, flexShrink: 0 }}>{cEmoji}</span>
      <span className="item-name">{project.name}</span>
      <button
        className={`item-star ${project.starred ? "starred" : ""}`}
        onClick={e => { e.stopPropagation(); onStar(project.id); }}
        style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "grid", placeItems: "center", color: "inherit" }}
      >
        <Icon d={Icons.star} size={12} strokeWidth={2} style={{ fill: project.starred ? "currentColor" : "none" }} />
      </button>
    </div>
  );
}

// ─── HOME VIEW ────────────────────────────────────────────────────────────────
function HomeView({ projects, onSubmit, onOpen }) {
  const [value, setValue] = useState("");
  const [mode, setMode] = useState("build");
  const [complexity, setComplexity] = useState("medium");
  const [showMode, setShowMode] = useState(false);

  const submit = () => {
    if (!value.trim()) return;
    onSubmit(value.trim(), mode, complexity);
    setValue("");
  };

  const recent = projects.slice(0, 6);

  return (
    <div className="home">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        <div className="home-badge">
          <span className="home-badge-pill">New</span>
          Claude Sonnet 4 · Complex App Mode
          <Icon d={Icons.back} size={12} style={{ transform: "rotate(180deg)" }} />
        </div>
        <div className="home-logo">
          <Icon d={Icons.zap} size={28} strokeWidth={2.5} style={{ color: "#1A1A14" }} />
        </div>
        <h1 className="home-title">
          Build anything <span className="gold">complex</span>
        </h1>
        <p className="home-sub">
          Describe any app, dashboard, game, or product. Choose your complexity level and HEXA generates production-grade HTML — fully functional, visually stunning.
        </p>

        <div className="home-input-wrap">
          <PromptInput
            value={value} onChange={setValue} onSubmit={submit}
            mode={mode} onModeChange={setMode}
            complexity={complexity} onComplexityChange={setComplexity}
            placeholder="Describe the app, site, or tool you want to build…"
            showMode={showMode} setShowMode={setShowMode}
          />
        </div>

        <div className="home-suggestions">
          {SUGGESTIONS.map(s => (
            <button key={s} className="suggestion-chip" onClick={() => setValue(s)}>
              <Icon d={Icons.sparkles} size={11} style={{ display: "inline", verticalAlign: "middle", marginRight: 4, color: "var(--gold)" }} />
              {s}
            </button>
          ))}
        </div>

        {recent.length > 0 ? (
          <div className="home-projects">
            <div className="section-title">Recent Projects</div>
            <div className="project-grid">
              {recent.map((p, i) => (
                <div key={p.id} className="project-card" onClick={() => onOpen(p.id)}
                  style={{ background: `linear-gradient(135deg, oklch(0.95 0.1 ${85 + i * 12} / 0.6), var(--card))` }}>
                  <div style={{ position: "absolute", top: 10, right: 10, fontSize: 16 }}>
                    {COMPLEXITY_LEVELS[p.complexity || "medium"]?.emoji}
                  </div>
                  <div className="project-card-name">{p.name}</div>
                  <div className="project-card-date">{new Date(p.createdAt).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="home-projects">
            <div className="section-title">Start with a Template</div>
            <div className="project-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))" }}>
              {TEMPLATES.map(t => (
                <div key={t.name} className="project-card" style={{ cursor: "pointer" }}
                  onClick={() => { setValue(t.prompt); setComplexity(t.complexity); }}>
                  <div style={{ position: "absolute", top: 10, right: 10, fontSize: 13 }}>
                    {COMPLEXITY_LEVELS[t.complexity]?.emoji}
                  </div>
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{t.icon}</div>
                  <div className="project-card-name">{t.name}</div>
                  <div className="project-card-date">{COMPLEXITY_LEVELS[t.complexity]?.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── WORKSPACE VIEW ───────────────────────────────────────────────────────────
function WorkspaceView({ project, onUpdate, onBack, onDelete, onPublish, onStar }) {
  const [messages, setMessages] = useState(project.messages || []);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState(project.mode || "build");
  const [complexity, setComplexity] = useState(project.complexity || "medium");
  const [streaming, setStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [buildProgress, setBuildProgress] = useState(0);
  const [buildPhase, setBuildPhase] = useState("");
  const [previewTab, setPreviewTab] = useState("preview");
  const [device, setDevice] = useState("desktop");
  const [showMode, setShowMode] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameVal, setNameVal] = useState(project.name);
  const [copied, setCopied] = useState(false);
  const messagesEndRef = useRef(null);
  const abortRef = useRef(null);

  const currentHtml = project.html || extractHtml(messages.filter(m => m.role === "assistant").map(m => m.content).join("\n"));

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingText]);

  // Build progress simulation during streaming
  useEffect(() => {
    if (!streaming) { setBuildProgress(0); setBuildPhase(""); return; }
    const phases = [
      [5, "Analyzing prompt…"],
      [15, "Designing architecture…"],
      [30, "Writing HTML structure…"],
      [50, "Styling components…"],
      [70, "Adding interactions…"],
      [85, "Polishing details…"],
      [95, "Finalizing output…"],
    ];
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < phases.length) {
        setBuildProgress(phases[idx][0]);
        setBuildPhase(phases[idx][1]);
        idx++;
      }
    }, COMPLEXITY_LEVELS[complexity].tokens / phases.length / 10);
    return () => clearInterval(interval);
  }, [streaming, complexity]);

  // Auto-send first message
  useEffect(() => {
    if (messages.length === 0) {
      const stored = sessionStorage.getItem(`hexa-init-${project.id}`);
      if (stored) {
        sessionStorage.removeItem(`hexa-init-${project.id}`);
        sendMessage(stored);
      }
    }
  }, []);

  const sendMessage = async (text) => {
    if (!text?.trim() || streaming) return;
    const userMsg = { id: genId(), role: "user", content: text.trim() };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    onUpdate({ messages: nextMessages });
    setInput("");
    setStreaming(true);
    setStreamingText("");

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const systemPrompt = mode === "build"
        ? SYSTEM_PROMPTS.build(complexity)
        : SYSTEM_PROMPTS[mode];

      const apiMessages = nextMessages.map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.content }));

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: COMPLEXITY_LEVELS[complexity]?.tokens || 10000,
          system: systemPrompt,
          messages: apiMessages,
          stream: true,
        }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split("\n")) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.type === "content_block_delta" && data.delta?.text) {
                fullText += data.delta.text;
                setStreamingText(fullText);
              }
            } catch {}
          }
        }
      }

      setBuildProgress(100);
      const aiMsg = { id: genId(), role: "assistant", content: fullText };
      const finalMessages = [...nextMessages, aiMsg];
      const newHtml = extractHtml(fullText);
      setMessages(finalMessages);
      onUpdate({ messages: finalMessages, html: newHtml || project.html, complexity });
      if (newHtml) setPreviewTab("preview");
    } catch (err) {
      if (err.name !== "AbortError") {
        const errMsg = { id: genId(), role: "assistant", content: "⚠️ Something went wrong. Please try again." };
        const finalMessages = [...nextMessages, errMsg];
        setMessages(finalMessages);
        onUpdate({ messages: finalMessages });
      }
    } finally {
      setStreaming(false);
      setStreamingText("");
    }
  };

  const stop = () => { abortRef.current?.abort(); };

  const downloadCode = () => {
    if (!currentHtml) return;
    const blob = new Blob([currentHtml], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${project.name.replace(/\s+/g, "-").toLowerCase()}.html`;
    a.click();
  };

  const openInNewTab = () => {
    if (!currentHtml) return;
    const blob = new Blob([currentHtml], { type: "text/html" });
    window.open(URL.createObjectURL(blob), "_blank");
  };

  const latestCode = extractCode(messages.filter(m => m.role === "assistant").map(m => m.content).join("\n")) ||
    (currentHtml ? { lang: "html", content: currentHtml } : null);

  const cx = complexity;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      {/* Top bar */}
      <div className="topbar">
        <button className="topbar-back" onClick={onBack}>
          <Icon d={Icons.back} size={16} />
        </button>
        {editingName ? (
          <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}>
            <input value={nameVal} onChange={e => setNameVal(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") { onUpdate({ name: nameVal.trim() || project.name }); setEditingName(false); }
                if (e.key === "Escape") { setNameVal(project.name); setEditingName(false); }
              }}
              style={{ flex: 1, background: "var(--bg2)", border: "1px solid var(--border2)", borderRadius: 8, padding: "5px 10px", fontSize: 14, fontWeight: 600, fontFamily: "var(--font)", color: "var(--fg)", outline: "none" }}
              autoFocus
            />
            <button onClick={() => { onUpdate({ name: nameVal.trim() || project.name }); setEditingName(false); }}
              style={{ background: "var(--gold)", border: "none", borderRadius: 8, padding: "5px 8px", cursor: "pointer", display: "grid", placeItems: "center" }}>
              <Icon d={Icons.check} size={14} strokeWidth={2.5} style={{ color: "#1A1A14" }} />
            </button>
          </div>
        ) : (
          <button onClick={() => setEditingName(true)}
            style={{ flex: 1, background: "none", border: "none", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font)", minWidth: 0 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--fg)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{project.name}</span>
            <Icon d={Icons.pen} size={12} style={{ color: "var(--fg3)", flexShrink: 0 }} />
          </button>
        )}

        <span className={`complexity-badge complexity-${cx}`}>
          {COMPLEXITY_LEVELS[cx]?.emoji} {COMPLEXITY_LEVELS[cx]?.label}
        </span>

        <div style={{ display: "flex", gap: 4 }}>
          {streaming && <div className="status-dot" style={{ marginRight: 4 }} />}
          <button className="chat-header-btn" onClick={onStar} title="Star" style={{ color: project.starred ? "var(--gold)" : undefined }}>
            <Icon d={Icons.star} size={15} style={{ fill: project.starred ? "currentColor" : "none" }} />
          </button>
          {currentHtml && (
            <>
              <button className="chat-header-btn" onClick={downloadCode} title="Download HTML">
                <Icon d={Icons.download} size={15} />
              </button>
              <button className="chat-header-btn" title="Publish" onClick={onPublish}
                style={{ background: "var(--gold-soft)", color: "var(--gold)", borderRadius: "99px", padding: "0 12px", width: "auto", fontSize: 12, fontWeight: 600, fontFamily: "var(--font)", border: "1px solid rgba(201,168,76,0.3)" }}>
                <Icon d={Icons.globe} size={13} style={{ marginRight: 5, display: "inline" }} />
                Publish
              </button>
            </>
          )}
          <button className="chat-header-btn danger" onClick={onDelete} title="Delete">
            <Icon d={Icons.trash} size={15} />
          </button>
        </div>
      </div>

      <div className="workspace">
        {/* Chat */}
        <div className="chat-panel">
          <div className="chat-messages">
            {messages.length === 0 && (
              <div style={{ textAlign: "center", color: "var(--fg3)", fontSize: 13, padding: "40px 20px" }}>
                <div style={{ width: 48, height: 48, background: "var(--gold-soft)", borderRadius: 14, display: "grid", placeItems: "center", margin: "0 auto 12px", color: "var(--gold)" }}>
                  <Icon d={Icons.zap} size={22} strokeWidth={2.5} />
                </div>
                Ready to build. Send your first prompt.
              </div>
            )}
            {messages.map(msg => (
              <div key={msg.id} className={`msg ${msg.role} fade-in`}>
                <div className={`msg-avatar ${msg.role}`}>
                  {msg.role === "ai" || msg.role === "assistant" ? "H" : "U"}
                </div>
                <div className={`msg-bubble ${msg.role === "assistant" ? "ai" : "user"}`}>
                  {msg.role === "assistant" ? (
                    <div className="md" dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
                  ) : (
                    <span style={{ whiteSpace: "pre-wrap" }}>{msg.content}</span>
                  )}
                </div>
              </div>
            ))}
            {streaming && (
              <div className="msg fade-in">
                <div className="msg-avatar ai">H</div>
                {streamingText ? (
                  <div className="msg-bubble ai">
                    <div className="md" dangerouslySetInnerHTML={{ __html: renderMarkdown(streamingText) }} />
                  </div>
                ) : (
                  <div className="msg-bubble ai msg-thinking">
                    <div className="dot" /><div className="dot" /><div className="dot" />
                  </div>
                )}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Build progress */}
          {streaming && buildProgress > 0 && (
            <div className="build-progress">
              <div className="build-progress-bar">
                <div className="build-progress-fill" style={{ width: `${buildProgress}%` }} />
              </div>
              <div className="build-progress-label">
                <span>{buildPhase}</span>
                <span>{buildProgress}%</span>
              </div>
            </div>
          )}

          <div className="chat-input-area">
            <PromptInput
              value={input}
              onChange={setInput}
              onSubmit={() => sendMessage(input)}
              onStop={stop}
              mode={mode} onModeChange={setMode}
              complexity={complexity} onComplexityChange={setComplexity}
              isStreaming={streaming}
              placeholder="Refine, extend, fix, or add features…"
              compact
              showMode={showMode} setShowMode={setShowMode}
            />
          </div>
        </div>

        {/* Resize handle */}
        <div className="resize-handle" />

        {/* Preview */}
        <div className="preview-panel">
          <div className="preview-header">
            <div className="preview-tabs">
              <button className={`preview-tab ${previewTab === "preview" ? "active" : ""}`} onClick={() => setPreviewTab("preview")}>
                <Icon d={Icons.eye} size={12} style={{ display: "inline", marginRight: 5 }} />Preview
              </button>
              <button className={`preview-tab ${previewTab === "code" ? "active" : ""}`} onClick={() => setPreviewTab("code")}>
                <Icon d={Icons.code} size={12} style={{ display: "inline", marginRight: 5 }} />Code
              </button>
            </div>

            {previewTab === "preview" && currentHtml && (
              <div className="preview-device-btns" style={{ marginLeft: 8 }}>
                <button className={`preview-device-btn ${device === "desktop" ? "active" : ""}`} onClick={() => setDevice("desktop")}>
                  <Icon d={Icons.monitor} size={13} />
                </button>
                <button className={`preview-device-btn ${device === "mobile" ? "active" : ""}`} onClick={() => setDevice("mobile")}>
                  <Icon d={Icons.smartphone} size={13} />
                </button>
              </div>
            )}

            <div className="preview-actions">
              {currentHtml && (
                <>
                  <button className="preview-btn" onClick={openInNewTab} title="Open in new tab">
                    <Icon d={Icons.external} size={14} />
                  </button>
                  <button className="preview-btn" onClick={downloadCode} title="Download">
                    <Icon d={Icons.download} size={14} />
                  </button>
                </>
              )}
            </div>
          </div>

          {previewTab === "preview" && (
            currentHtml ? (
              <div className="preview-content">
                <div className={`preview-frame-wrap ${device}`}>
                  <iframe
                    className="preview-iframe"
                    title="HEXA Preview"
                    srcDoc={currentHtml}
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                  />
                </div>
              </div>
            ) : (
              <div className="preview-empty">
                <div className="preview-empty-icon">
                  <Icon d={Icons.monitor} size={26} />
                </div>
                <p>Your generated app will appear here live.<br />Send a prompt and HEXA will build it.</p>
              </div>
            )
          )}

          {previewTab === "code" && (
            latestCode ? (
              <div className="code-wrap">
                <button className="code-copy-btn" onClick={() => {
                  navigator.clipboard.writeText(latestCode.content);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1800);
                }}>
                  <Icon d={copied ? Icons.check : Icons.copy} size={13} />
                  {copied ? "Copied!" : "Copy"}
                </button>
                <pre><code>{latestCode.content}</code></pre>
              </div>
            ) : (
              <div className="preview-empty">
                <div className="preview-empty-icon">
                  <Icon d={Icons.code} size={26} />
                </div>
                <p>Code will appear here once HEXA generates it.</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PROMPT INPUT ─────────────────────────────────────────────────────────────
function PromptInput({ value, onChange, onSubmit, onStop, mode, onModeChange, complexity, onComplexityChange, isStreaming, placeholder, compact, showMode, setShowMode }) {
  const ref = useRef(null);

  useEffect(() => {
    const ta = ref.current;
    if (!ta) return;
    ta.style.height = "0px";
    ta.style.height = Math.min(ta.scrollHeight, 180) + "px";
  }, [value]);

  const modeLabels = { build: "⚡ Build", design: "🎨 Design", explain: "📚 Explain" };
  const modeDescs = {
    build: "Generate working HTML app",
    design: "Plan UI, architecture & style",
    explain: "Walk through concepts & code",
  };

  return (
    <div className="prompt-box" style={{ position: "relative" }}>
      {showMode && (
        <div className="mode-dropdown">
          {Object.keys(modeLabels).map(m => (
            <div key={m} className="mode-option" onClick={() => { onModeChange(m); setShowMode(false); }}>
              <span className="mode-option-name">{modeLabels[m]}</span>
              <span className="mode-option-desc">{modeDescs[m]}</span>
            </div>
          ))}
        </div>
      )}
      <textarea
        ref={ref}
        className="prompt-textarea"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (!isStreaming && value.trim()) onSubmit();
          }
        }}
        placeholder={placeholder}
        rows={1}
      />
      {/* Complexity selector */}
      {mode === "build" && (
        <div className="complexity-row">
          <span className="complexity-row-label">Complexity:</span>
          {Object.entries(COMPLEXITY_LEVELS).map(([key, lv]) => (
            <button
              key={key}
              className={`complexity-pill ${complexity === key ? `active-${key}` : ""}`}
              onClick={() => onComplexityChange(key)}
              title={lv.desc}
            >
              {lv.emoji} {lv.label}
            </button>
          ))}
        </div>
      )}
      <div className="prompt-actions">
        <button className="mode-btn" onClick={() => setShowMode(!showMode)}>
          {modeLabels[mode]}
          <Icon d={Icons.chevronDown} size={11} strokeWidth={2.5} />
        </button>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {isStreaming ? (
            <button className="send-btn stop" onClick={onStop} title="Stop">
              <Icon d={Icons.stop} size={14} strokeWidth={2.5} style={{ fill: "currentColor" }} />
            </button>
          ) : (
            <button
              className={`send-btn ${value.trim() ? "active" : "inactive"}`}
              onClick={onSubmit}
              disabled={!value.trim()}
            >
              <Icon d={Icons.send} size={15} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PUBLISH MODAL ────────────────────────────────────────────────────────────
function PublishModal({ project, onClose }) {
  const html = project?.html;

  const publishCodePen = () => {
    if (!html) return;
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://codepen.io/pen/define";
    form.target = "_blank";
    const input = document.createElement("input");
    input.type = "hidden"; input.name = "data"; input.value = JSON.stringify({ html });
    form.appendChild(input); document.body.appendChild(form);
    form.submit(); document.body.removeChild(form);
    onClose();
  };

  const downloadHtml = () => {
    if (!html) return;
    const blob = new Blob([html], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${project.name.replace(/\s+/g, "-").toLowerCase()}.html`;
    a.click(); onClose();
  };

  const copyHtml = () => {
    if (!html) return;
    navigator.clipboard.writeText(html);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal fade-in">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div style={{ width: 40, height: 40, background: "var(--gold-soft)", borderRadius: 12, display: "grid", placeItems: "center", color: "var(--gold)" }}>
            <Icon d={Icons.globe} size={20} />
          </div>
          <h2>Publish Project</h2>
        </div>
        <p>Export or deploy your generated project to share it with the world.</p>

        {!html && (
          <div style={{ background: "rgba(220,50,50,0.08)", border: "1px solid rgba(220,50,50,0.2)", borderRadius: "var(--radius-sm)", padding: "12px 14px", fontSize: 13, color: "#dc3232", marginBottom: 20 }}>
            ⚠️ No generated HTML yet. Build something first!
          </div>
        )}

        <div className="publish-opts">
          <div className="publish-opt" onClick={html ? publishCodePen : undefined} style={{ opacity: html ? 1 : 0.45 }}>
            <div className="publish-opt-icon" style={{ background: "#1D1F20", fontSize: 20 }}>🖊️</div>
            <div className="publish-opt-info">
              <h4>Open in CodePen</h4>
              <p>Launch in CodePen's live editor for further editing and sharing.</p>
            </div>
          </div>
          <div className="publish-opt" onClick={downloadHtml} style={{ opacity: html ? 1 : 0.45 }}>
            <div className="publish-opt-icon" style={{ background: "var(--gold-soft)", fontSize: 20 }}>💾</div>
            <div className="publish-opt-info">
              <h4>Download HTML File</h4>
              <p>Save a standalone .html file — host on Vercel, Netlify, or GitHub Pages.</p>
            </div>
          </div>
          <div className="publish-opt" onClick={copyHtml} style={{ opacity: html ? 1 : 0.45 }}>
            <div className="publish-opt-icon" style={{ background: "var(--gold-soft)", fontSize: 20 }}>📋</div>
            <div className="publish-opt-info">
              <h4>Copy HTML to Clipboard</h4>
              <p>Paste directly into any editor, CMS, or deployment platform.</p>
            </div>
          </div>
        </div>
        <button className="modal-close" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
