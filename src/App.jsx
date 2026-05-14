import { useState, useEffect } from "react";

// =====================================================
// LOGO IMAGE (base64)
// =====================================================
const LOGO_SRC = "data:image/jpeg;base64,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";

// =====================================================
// GOOGLE SHEETS ENDPOINT (Apps Script Web App)
// =====================================================
const SHEET_URL = "https://script.google.com/macros/s/AKfycbw0N4vUuNBHd_2ZJMgjmtrjjkuwuMnILpTaJXZNyROoef5nfeqWEN5u8sqwqvXPA5ts/exec";

async function sendToSheet(data) {
  try {
    await fetch(SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data)
    });
    return true;
  } catch (e) {
    console.warn("Failed to send to sheet:", e);
    return false;
  }
}

// =====================================================
// STORAGE: window.storage in Claude, localStorage fallback
// =====================================================
const SKEY = "odem_responses_v2";

async function loadAll() {
  try {
    if (typeof window !== "undefined" && window.storage) {
      const r = await window.storage.get(SKEY);
      return r && r.value ? JSON.parse(r.value) : [];
    }
  } catch (e) {}
  try {
    const raw = localStorage.getItem(SKEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {}
  return [];
}

async function saveAll(arr) {
  try {
    if (typeof window !== "undefined" && window.storage) {
      await window.storage.set(SKEY, JSON.stringify(arr));
      return true;
    }
  } catch (e) {}
  try {
    localStorage.setItem(SKEY, JSON.stringify(arr));
    return true;
  } catch (e) {}
  return false;
}

// =====================================================
// SVG CHESS PIECES (custom Staunton-style)
// =====================================================
function Piece({ p, size = 40 }) {
  if (!p || p === ".") return null;
  const isW = p === p.toUpperCase();
  const t = p.toUpperCase();
  const fill = isW ? "#FAFAFA" : "#2A2A2A";
  const stroke = isW ? "#1A1A1A" : "#FAFAFA";
  const sw = 1.5;

  const paths = {
    K: (
      <g>
        <path d="M22.5 7v6M19 10h7" stroke={stroke} strokeWidth={2} strokeLinecap="round" fill="none"/>
        <path d="M22.5 26c4-8 7.5-9 7.5-13.5 0-3-2.5-5-5-5s-5 2-5 5c0 4.5 3.5 5.5 7.5 13.5z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"/>
        <path d="M11 36c0 2.5 2 4 5 4h13c3 0 5-1.5 5-4v-5c0-2.5-2-4-5-4H16c-3 0-5 1.5-5 4z" fill={fill} stroke={stroke} strokeWidth={sw}/>
        <ellipse cx="22.5" cy="40" rx="14" ry="2.8" fill={fill} stroke={stroke} strokeWidth={sw}/>
      </g>
    ),
    Q: (
      <g>
        <circle cx="8" cy="14" r="2" fill={fill} stroke={stroke} strokeWidth={sw}/>
        <circle cx="15.5" cy="9" r="2" fill={fill} stroke={stroke} strokeWidth={sw}/>
        <circle cx="22.5" cy="7" r="2" fill={fill} stroke={stroke} strokeWidth={sw}/>
        <circle cx="29.5" cy="9" r="2" fill={fill} stroke={stroke} strokeWidth={sw}/>
        <circle cx="37" cy="14" r="2" fill={fill} stroke={stroke} strokeWidth={sw}/>
        <path d="M8 16l3 14h23l3-14-7 10-2.5-13.5L25 27 22.5 11 20 27l-1.5-13.5L15 26z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"/>
        <path d="M11 30h23v4c0 2-2 3-5 3H16c-3 0-5-1-5-3z" fill={fill} stroke={stroke} strokeWidth={sw}/>
        <ellipse cx="22.5" cy="40" rx="14" ry="2.8" fill={fill} stroke={stroke} strokeWidth={sw}/>
      </g>
    ),
    R: (
      <g>
        <path d="M10 11v7h4v-4h4v4h9v-4h4v4h4v-7z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"/>
        <path d="M13 18v14h19V18" fill={fill} stroke={stroke} strokeWidth={sw}/>
        <path d="M10 32h25v4H10z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"/>
        <ellipse cx="22.5" cy="40" rx="14" ry="2.8" fill={fill} stroke={stroke} strokeWidth={sw}/>
      </g>
    ),
    B: (
      <g>
        <circle cx="22.5" cy="9" r="2.5" fill={fill} stroke={stroke} strokeWidth={sw}/>
        <path d="M22.5 13c-5 0-8 6-8 11 0 3 2 5 5 6h6c3-1 5-3 5-6 0-5-3-11-8-11z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"/>
        <path d="M19 23h7M22.5 18v6" stroke={stroke} strokeWidth={sw} strokeLinecap="round"/>
        <path d="M13 32h19v5H13z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"/>
        <ellipse cx="22.5" cy="40" rx="14" ry="2.8" fill={fill} stroke={stroke} strokeWidth={sw}/>
      </g>
    ),
    N: (
      <g>
        <path d="M22 9c-3 0-5 1-6 3-1 1-1 3 0 4-2 1-4 3-5 6-1 4 1 6 3 7-1 2-2 4-2 6v3h22v-5c0-8-2-15-7-19-1-1-2-2-4-3-2-1-1-2-1-2z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"/>
        <circle cx="17" cy="17" r="1.3" fill={stroke}/>
        <path d="M14 22c1 0.5 2 0.5 3 0" stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round"/>
        <path d="M14 12c0-2 1-3 2-3" stroke={stroke} strokeWidth={sw} fill="none" strokeLinecap="round"/>
        <ellipse cx="22.5" cy="40" rx="14" ry="2.8" fill={fill} stroke={stroke} strokeWidth={sw}/>
      </g>
    ),
    P: (
      <g>
        <circle cx="22.5" cy="14" r="5" fill={fill} stroke={stroke} strokeWidth={sw}/>
        <path d="M17 20c-3 1-4 4-4 6 0 3 2 4 2 6v3h15v-3c0-2 2-3 2-6 0-2-1-5-4-6z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"/>
        <ellipse cx="22.5" cy="38" rx="12" ry="2.4" fill={fill} stroke={stroke} strokeWidth={sw}/>
      </g>
    ),
  };

  return (
    <svg viewBox="0 0 45 45" width={size} height={size} style={{ filter: "drop-shadow(0 2px 1.5px rgba(0,0,0,0.4))", pointerEvents: "none" }}>
      {paths[t]}
    </svg>
  );
}

// =====================================================
// CHESS LOGIC
// =====================================================
const isW = p => p && p !== "." && p === p.toUpperCase();
const isB = p => p && p !== "." && p === p.toLowerCase();
const sameC = (a, b) => a && b && a !== "." && b !== "." && (isW(a) === isW(b));
const inB = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;

function getValidMoves(board, fr, fc) {
  const piece = board[fr][fc];
  if (!piece || piece === ".") return [];
  const moves = [];
  const t = piece.toUpperCase();
  const white = isW(piece);
  const slide = dirs => {
    for (const [dr, dc] of dirs) {
      let r = fr + dr, c = fc + dc;
      while (inB(r, c)) {
        if (board[r][c] === ".") moves.push([r, c]);
        else { if (!sameC(piece, board[r][c])) moves.push([r, c]); break; }
        r += dr; c += dc;
      }
    }
  };
  if (t === "R") slide([[-1,0],[1,0],[0,-1],[0,1]]);
  else if (t === "B") slide([[-1,-1],[-1,1],[1,-1],[1,1]]);
  else if (t === "Q") slide([[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]]);
  else if (t === "K") {
    for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
      if (!dr && !dc) continue;
      const r = fr + dr, c = fc + dc;
      if (inB(r, c) && !sameC(piece, board[r][c])) moves.push([r, c]);
    }
  } else if (t === "N") {
    for (const [dr, dc] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]) {
      const r = fr + dr, c = fc + dc;
      if (inB(r, c) && !sameC(piece, board[r][c])) moves.push([r, c]);
    }
  } else if (t === "P") {
    const dir = white ? -1 : 1, sr = white ? 6 : 1;
    if (inB(fr + dir, fc) && board[fr + dir][fc] === ".") {
      moves.push([fr + dir, fc]);
      if (fr === sr && board[fr + 2*dir][fc] === ".") moves.push([fr + 2*dir, fc]);
    }
    for (const dc of [-1, 1]) {
      const r = fr + dir, c = fc + dc;
      if (inB(r, c) && board[r][c] !== "." && !sameC(piece, board[r][c])) moves.push([r, c]);
    }
  }
  return moves;
}

// =====================================================
// BOARD COMPONENT (interactive)
// =====================================================
function Board({ board, onMove, fixedHighlight, lastMove, restrictColor, squareSize = 38, showCoords = true, disabled = false }) {
  const [selected, setSelected] = useState(null);
  const [hint, setHint] = useState([]);

  const moves = fixedHighlight || hint;

  const click = (r, c) => {
    if (disabled) return;
    const piece = board[r][c];
    if (selected) {
      const ok = hint.some(([hr, hc]) => hr === r && hc === c);
      if (ok) {
        onMove && onMove(selected, [r, c]);
        setSelected(null); setHint([]);
        return;
      }
    }
    if (piece && piece !== ".") {
      if (restrictColor === "w" && !isW(piece)) { setSelected(null); setHint([]); return; }
      if (restrictColor === "b" && !isB(piece)) { setSelected(null); setHint([]); return; }
      setSelected([r, c]);
      setHint(getValidMoves(board, r, c));
    } else { setSelected(null); setHint([]); }
  };

  const files = ["a","b","c","d","e","f","g","h"];

  return (
    <div style={{display:"inline-block", padding:5, background:"linear-gradient(135deg,#4a2f1a,#2d1810)", borderRadius:6, boxShadow:"0 8px 20px rgba(0,0,0,0.3)"}}>
      <div style={{display:"inline-block", border:"1.5px solid #1a1208", borderRadius:2, overflow:"hidden"}}>
        {board.map((row, r) => (
          <div key={r} style={{display:"flex"}}>
            {showCoords && (
              <div style={{width:14, height:squareSize, display:"flex", alignItems:"center", justifyContent:"center", color:"#d4c5a8", fontSize:9, fontWeight:700, background:"#3d2817"}}>{8-r}</div>
            )}
            {row.map((cell, c) => {
              const light = (r + c) % 2 === 0;
              const sel = selected && selected[0]===r && selected[1]===c;
              const tgt = moves.some(([mr,mc]) => mr===r && mc===c);
              const cap = tgt && cell !== ".";
              const last = lastMove && ((lastMove[0][0]===r && lastMove[0][1]===c)||(lastMove[1][0]===r && lastMove[1][1]===c));
              let bg = light ? "#f0d9b5" : "#b58863";
              if (sel) bg = light ? "#f7ec74" : "#dac34a";
              else if (last) bg = light ? "#cdd26a" : "#aaa23a";
              return (
                <div key={c} onClick={() => click(r, c)} style={{
                  width:squareSize, height:squareSize, background:bg,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  cursor: disabled ? "default" : "pointer", position:"relative", transition:"background 0.15s"
                }}>
                  <Piece p={cell} size={Math.floor(squareSize * 0.88)}/>
                  {tgt && !cap && <div style={{position:"absolute", width:squareSize*0.32, height:squareSize*0.32, borderRadius:"50%", background:"rgba(20,90,20,0.5)", pointerEvents:"none"}}/>}
                  {tgt && cap && <div style={{position:"absolute", inset:1, border:"3px solid rgba(180,20,20,0.6)", borderRadius:2, pointerEvents:"none"}}/>}
                </div>
              );
            })}
          </div>
        ))}
        {showCoords && (
          <div style={{display:"flex", paddingLeft:14, background:"#3d2817"}}>
            {files.map(f => <div key={f} style={{width:squareSize, height:13, color:"#d4c5a8", fontSize:9, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center"}}>{f}</div>)}
          </div>
        )}
      </div>
    </div>
  );
}

// =====================================================
// HELPERS
// =====================================================
function emptyBoard() {
  return Array(8).fill(0).map(() => Array(8).fill("."));
}
function placePiece(b, r, c, p) {
  const nb = b.map(row => row.slice());
  nb[r][c] = p;
  return nb;
}
function makeMove(b, from, to) {
  const nb = b.map(row => row.slice());
  const p = nb[from[0]][from[1]];
  nb[from[0]][from[1]] = ".";
  nb[to[0]][to[1]] = p;
  return nb;
}

// =====================================================
// PIECE DEMONSTRATIONS (on a real board)
// =====================================================
const PIECE_DEMOS = [
  {
    type: "P",
    name: "רגלי",
    icon: "♙",
    color: "#5a5a5a",
    pos: [6, 4],  // e2 - starting square
    desc: "הכלי החלש ביותר אבל החשוב ביותר.",
    rules: [
      "זז קדימה שדה אחד (לכיוון המחנה היריב).",
      "מהמהלך הראשון יכול לזוז 2 שדות.",
      "אוכל באלכסון בלבד – לא בקו הישר!",
      "לא יכול לסגת אחורה.",
      "אם מגיע לסוף הלוח – הופך למלכה (או כלי אחר)!",
    ],
    setup: (b) => {
      // black pieces for capture demo
      b = placePiece(b, 5, 3, "p"); // d3 - capturable
      b = placePiece(b, 5, 5, "p"); // f3 - capturable
      return b;
    }
  },
  {
    type: "R",
    name: "צריח",
    icon: "♖",
    color: "#2471a3",
    pos: [4, 3],  // d4
    desc: "זז בקווים ישרים – חזק במיוחד בלוח פתוח.",
    rules: [
      "זז כמה שדות שרוצה בקו ישר: למעלה, למטה, ימינה, שמאלה.",
      "לא יכול לעבור דרך כלים אחרים.",
      "אוכל את הכלי הראשון שפוגש בדרך (אם הוא של היריב).",
      "בתחילת המשחק נמצא בפינות.",
      "משתתף במהלך מיוחד הנקרא הצרחה!",
    ]
  },
  {
    type: "B",
    name: "רץ",
    icon: "♗",
    color: "#1e8449",
    pos: [4, 3],
    desc: "זז באלכסונים – כל שחקן מקבל רץ 'שחור' ורץ 'לבן'.",
    rules: [
      "זז כמה שדות שרוצה באלכסון בלבד.",
      "לא יכול לעבור דרך כלים אחרים.",
      "אוכל את הכלי הראשון שפוגש (אם הוא של היריב).",
      "תמיד נשאר על אותו צבע שדה לכל המשחק! (זה החוק החשוב!)",
      "חלש בעמדות סגורות, חזק בלוחות פתוחים.",
    ]
  },
  {
    type: "Q",
    name: "מלכה",
    icon: "♕",
    color: "#8e44ad",
    pos: [4, 3],
    desc: "הכלי החזק ביותר – שילוב של צריח ורץ!",
    rules: [
      "זזה כמה שדות שרוצה: בקו ישר ובאלכסון.",
      "לא יכולה לעבור דרך כלים אחרים.",
      "השווי שלה: 9 נקודות (לעומת צריח 5, רץ/סוס 3, רגלי 1).",
      "אסור לחשוף אותה מוקדם מדי – היריב יתקוף אותה.",
      "אובדן המלכה כמעט תמיד אומר הפסד.",
    ]
  },
  {
    type: "K",
    name: "מלך",
    icon: "♔",
    color: "#c0392b",
    pos: [4, 3],
    desc: "הכלי החשוב ביותר – המשחק מסתיים כשהוא מותקף ולא יכול לברוח (מט).",
    rules: [
      "זז שדה אחד בכל כיוון: ישר, אלכסון, צד.",
      "אסור לו להיכנס לשדה שמותקף על ידי כלי יריב!",
      "אסור להקריב אותו – אם הוא מותקף = שח, חייבים לפתור.",
      "כשאי אפשר להציל אותו = מט = הפסד!",
      "במשחק הסיום הוא הופך לכלי תוקפני וחשוב.",
    ]
  },
  {
    type: "N",
    name: "סוס",
    icon: "♘",
    color: "#d35400",
    pos: [4, 3],
    desc: "הכלי המורכב והמיוחד ביותר – זז בצורת L וקופץ מעל כולם!",
    longDesc: "הסוס הוא הכלי היחיד שיכול לקפוץ מעל כלים אחרים. זה הופך אותו לכלי הכי מסובך ללמוד אבל גם לאחד החזקים בעמדות סגורות.",
    rules: [
      "תנועה ייחודית בצורת 'L': 2 שדות בכיוון אחד + 1 שדה לצד.",
      "אפשרות אחרת: 1 שדה בכיוון אחד + 2 שדות לצד.",
      "מכל מיקום במרכז הלוח – לסוס יש 8 אפשרויות תנועה!",
      "קופץ מעל כלים אחרים – ככה הוא מגיע למקום ה-L.",
      "תמיד מחליף צבע שדה: משדה לבן הוא קופץ לשדה שחור ולהפך.",
      "הוא הכלי היחיד שיכול לתת שח שאי אפשר לחסום!",
      "חזק במיוחד בעמדות סגורות עם הרבה רגלים על הלוח.",
      "טיפ: סוס בקצה הלוח – שווה רק חצי מסוס במרכז!",
    ],
    examples: [
      { pos: [4, 3], label: "במרכז: 8 אפשרויות תנועה" },
      { pos: [4, 0], label: "בקצה: רק 4 אפשרויות" },
      { pos: [0, 0], label: "בפינה: רק 2 אפשרויות!" },
    ]
  },
];

function PieceDemo({ demo }) {
  const [exIdx, setExIdx] = useState(0);
  const examples = demo.examples;
  const currentPos = examples ? examples[exIdx].pos : demo.pos;

  let board = emptyBoard();
  if (demo.setup) board = demo.setup(board);
  board = placePiece(board, currentPos[0], currentPos[1], demo.type);

  return (
    <div style={{background:"#fff", borderRadius:16, padding:16, marginBottom:14, border:`2px solid ${demo.color}30`, boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
      <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:10, paddingBottom:10, borderBottom:`2px solid ${demo.color}20`}}>
        <div style={{background:demo.color, color:"#fff", width:42, height:42, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26}}>
          {demo.icon}
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize:18, fontWeight:800, color:"#1a1a2e"}}>{demo.name}</div>
          <div style={{fontSize:12, color:"#666"}}>{demo.desc}</div>
        </div>
      </div>

      <div style={{display:"flex", justifyContent:"center", marginBottom:10, marginTop:6}}>
        <Board board={board} squareSize={34} restrictColor="w" disabled={false} />
      </div>

      <div style={{fontSize:12, color:"#888", textAlign:"center", marginBottom:10}}>
        💡 לחץ על הכלי בלוח כדי לראות לאן הוא יכול לזוז
      </div>

      {examples && (
        <div style={{display:"flex", gap:6, marginBottom:10, flexWrap:"wrap"}}>
          {examples.map((ex, i) => (
            <button key={i} onClick={() => setExIdx(i)} style={{
              flex:"1 1 auto", minWidth:0, padding:"8px 6px", borderRadius:8,
              border:`2px solid ${exIdx===i ? demo.color : "#e0e0e0"}`,
              background: exIdx===i ? `${demo.color}15` : "#fff",
              cursor:"pointer", fontSize:11, fontWeight:600,
              color: exIdx===i ? demo.color : "#666"
            }}>
              {ex.label}
            </button>
          ))}
        </div>
      )}

      {demo.longDesc && (
        <div style={{background:`${demo.color}10`, borderRadius:10, padding:"10px 12px", marginBottom:10, fontSize:13, color:"#333", lineHeight:1.6}}>
          {demo.longDesc}
        </div>
      )}

      <div style={{fontSize:13, fontWeight:700, color:"#1a1a2e", marginBottom:6}}>החוקים:</div>
      <ul style={{margin:0, paddingRight:18, fontSize:13, color:"#333", lineHeight:1.7}}>
        {demo.rules.map((r, i) => <li key={i} style={{marginBottom:3}}>{r}</li>)}
      </ul>
    </div>
  );
}

// =====================================================
// PUZZLES
// =====================================================
const PUZZLES = [
  {
    id: 1,
    title: "אכילת מלכה",
    desc: "המלכה השחורה חשופה. הצריח הלבן יכול לתפוס אותה. בצע את המהלך!",
    setup: (b) => {
      b = placePiece(b, 0, 4, "k");   // black king e8
      b = placePiece(b, 4, 3, "q");   // black queen d4
      b = placePiece(b, 7, 4, "K");   // white king e1
      b = placePiece(b, 7, 3, "R");   // white rook d1
      return b;
    },
    answer: { from: [7, 3], to: [4, 3] },  // Rd1xd4
    answerText: "צריח אוכל מלכה (Rxd4)",
    hint: "הצריח על d1, המלכה על d4 – שניהם באותו טור!"
  },
  {
    id: 2,
    title: "מזלג של סוס",
    desc: "הסוס יכול להתקיף את המלך והמלכה בו זמנית! מצא את המהלך.",
    setup: (b) => {
      b = placePiece(b, 0, 4, "k");   // black king e8
      b = placePiece(b, 3, 7, "q");   // black queen h5
      b = placePiece(b, 6, 2, "K");   // white king c2
      b = placePiece(b, 3, 3, "N");   // white knight d5
      return b;
    },
    answer: { from: [3, 3], to: [2, 5] }, // Nd5-f6
    answerText: "סוס ל-f6: מתקיף מלך ומלכה במזלג!",
    hint: "הסוס זז ב-L. מאיפה הוא מתקיף גם את e8 וגם את h5?"
  },
  {
    id: 3,
    title: "מט בשורה האחורית",
    desc: "המלך השחור כלוא מאחורי הרגלים שלו. בצע את המט!",
    setup: (b) => {
      b = placePiece(b, 0, 6, "k");   // black king g8
      b = placePiece(b, 1, 5, "p");   // f7
      b = placePiece(b, 1, 6, "p");   // g7
      b = placePiece(b, 1, 7, "p");   // h7
      b = placePiece(b, 7, 4, "K");   // white king e1
      b = placePiece(b, 7, 0, "R");   // white rook a1
      return b;
    },
    answer: { from: [7, 0], to: [0, 0] }, // Ra1-a8#
    answerText: "צריח ל-a8 שח-מט! המלך לא יכול לברוח.",
    hint: "תזיז את הצריח עד לשורה העליונה – המלך לא יכול לברוח כי הרגלים חוסמות אותו!"
  },
];

function PuzzleView({ puzzle, onSolved, onSkip }) {
  const [board, setBoard] = useState(() => puzzle.setup(emptyBoard()));
  const [status, setStatus] = useState("playing"); // playing | wrong | solved
  const [showHint, setShowHint] = useState(false);
  const [lastMove, setLastMove] = useState(null);
  const [attempts, setAttempts] = useState(0);

  const handleMove = (from, to) => {
    if (status === "solved") return;
    const correct = from[0] === puzzle.answer.from[0] && from[1] === puzzle.answer.from[1]
                 && to[0] === puzzle.answer.to[0] && to[1] === puzzle.answer.to[1];
    if (correct) {
      setBoard(makeMove(board, from, to));
      setLastMove([from, to]);
      setStatus("solved");
    } else {
      setAttempts(a => a + 1);
      setStatus("wrong");
      setTimeout(() => setStatus("playing"), 1500);
    }
  };

  return (
    <div style={{background:"#fff", borderRadius:18, padding:18, marginBottom:14, border:"2px solid #e8e0d4"}}>
      <div style={{fontSize:17, fontWeight:800, color:"#1a1a2e", marginBottom:4}}>פאזל {puzzle.id}: {puzzle.title}</div>
      <div style={{fontSize:13, color:"#666", marginBottom:12, lineHeight:1.6}}>{puzzle.desc}</div>
      <div style={{display:"flex", justifyContent:"center", marginBottom:12}}>
        <Board board={board} onMove={handleMove} restrictColor="w" lastMove={lastMove} disabled={status==="solved"} squareSize={36}/>
      </div>
      <div style={{fontSize:12, color:"#888", textAlign:"center", marginBottom:10}}>
        🤍 לבן זז | לחץ על כלי לבן ואז על שדה היעד
      </div>

      {status === "wrong" && (
        <div style={{background:"#fdf0ef", border:"2px solid #e74c3c", borderRadius:10, padding:"10px 12px", marginBottom:10, fontSize:13, color:"#c0392b"}}>
          ❌ לא בדיוק. נסה שוב!
        </div>
      )}
      {status === "solved" && (
        <div style={{background:"#eafaf1", border:"2px solid #27ae60", borderRadius:10, padding:"10px 12px", marginBottom:10, fontSize:13, color:"#1e8449"}}>
          ✅ מצוין! {puzzle.answerText}
        </div>
      )}
      {showHint && status !== "solved" && (
        <div style={{background:"#fef9e7", borderRadius:10, padding:"10px 12px", marginBottom:10, fontSize:12, color:"#7d6608"}}>
          💡 {puzzle.hint}
        </div>
      )}

      <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
        {status !== "solved" && (
          <button onClick={() => setShowHint(!showHint)} style={{background:"transparent", border:"2px solid #e8e0d4", borderRadius:10, padding:"9px 14px", fontSize:13, color:"#888", cursor:"pointer"}}>
            💡 רמז
          </button>
        )}
        {status !== "solved" && attempts >= 2 && (
          <button onClick={onSkip} style={{background:"transparent", border:"2px solid #e8e0d4", borderRadius:10, padding:"9px 14px", fontSize:13, color:"#888", cursor:"pointer"}}>
            דלג
          </button>
        )}
        {status === "solved" && (
          <button onClick={onSolved} style={{flex:1, background:"#1a1a2e", color:"#fff", border:"none", borderRadius:10, padding:"10px 16px", fontSize:14, fontWeight:700, cursor:"pointer"}}>
            הבא ←
          </button>
        )}
      </div>
    </div>
  );
}

// =====================================================
// LOGO HEADER
// =====================================================
function LogoHeader() {
  return (
    <div style={{display:"flex", justifyContent:"center", marginBottom:18}}>
      <img src={LOGO_SRC} alt="מועדון שחמט אודם" style={{
        width:"100%", maxWidth:320, height:"auto", borderRadius:18,
        boxShadow:"0 10px 30px rgba(26,26,46,0.3)", display:"block"
      }}/>
    </div>
  );
}

function Card({ children, style }) {
  return (
    <div style={{background:"#fff", borderRadius:20, padding:22, boxShadow:"0 4px 20px rgba(26,26,46,0.08)", border:"1px solid #e8e0d4", ...style}}>
      {children}
    </div>
  );
}

function Wrap({ children }) {
  return (
    <div style={{fontFamily:"'Segoe UI',sans-serif", direction:"rtl", padding:14, background:"linear-gradient(160deg,#f8f4ee,#eee8dc)", minHeight:"100vh"}}>
      <LogoHeader/>
      {children}
    </div>
  );
}

// =====================================================
// ADMIN VIEW
// =====================================================
function AdminView({ onBack }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadAll().then(d => { setList(d); setLoading(false); });
  }, []);

  const exportJSON = () => {
    const json = JSON.stringify(list, null, 2);
    navigator.clipboard?.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportCSV = () => {
    if (list.length === 0) return;
    const headers = ["timestamp","name","grade","level","chessRating","completed"];
    const rows = list.map(r => headers.map(h => JSON.stringify(r[h] ?? "")).join(","));
    const csv = headers.join(",") + "\n" + rows.join("\n");
    navigator.clipboard?.writeText(csv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = async () => {
    if (confirm("למחוק את כל הנתונים? פעולה זו בלתי הפיכה.")) {
      await saveAll([]);
      setList([]);
    }
  };

  return (
    <div style={{fontFamily:"'Segoe UI',sans-serif", direction:"rtl", padding:14, background:"linear-gradient(160deg,#f8f4ee,#eee8dc)", minHeight:"100vh"}}>
      <LogoHeader/>
      <Card>
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16}}>
          <div style={{fontSize:20, fontWeight:800, color:"#1a1a2e"}}>📊 מנהל המועדון</div>
          <button onClick={onBack} style={{background:"transparent", border:"none", fontSize:14, color:"#888", cursor:"pointer"}}>✕ סגור</button>
        </div>
        <div style={{background:"#f5f0e8", borderRadius:12, padding:"10px 14px", marginBottom:16, fontSize:14, color:"#555"}}>
          סך הכל חניכים רשומים: <b style={{color:"#c0392b", fontSize:18}}>{list.length}</b>
        </div>

        {loading ? <div style={{textAlign:"center", color:"#888"}}>טוען...</div> :
         list.length === 0 ? <div style={{textAlign:"center", color:"#888", padding:20}}>עדיין אין רישומים</div> :
          <div style={{maxHeight:400, overflowY:"auto", marginBottom:16}}>
            {list.map((r, i) => (
              <div key={i} style={{background:"#f9f5ee", border:"1px solid #e8e0d4", borderRadius:10, padding:"10px 12px", marginBottom:8, fontSize:13}}>
                <div style={{fontWeight:700, color:"#1a1a2e", marginBottom:3}}>
                  {r.name} <span style={{color:"#888", fontWeight:400}}>(כיתה {r.grade}')</span>
                </div>
                <div style={{color:"#555", fontSize:12}}>
                  רמה: {r.level === "beginner" ? "מתחיל 🌱" : r.level === "intermediate" ? "בינוני ⚡" : `דירוג ${r.chessRating} 🏆`}
                </div>
                <div style={{color:"#aaa", fontSize:11, marginTop:3}}>
                  {new Date(r.timestamp).toLocaleString("he-IL")}
                </div>
              </div>
            ))}
          </div>
        }

        <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
          <button onClick={exportJSON} disabled={list.length === 0} style={{flex:"1 1 100px", background:"#1a1a2e", color:"#fff", border:"none", borderRadius:10, padding:"10px", fontSize:13, fontWeight:700, cursor:list.length?"pointer":"not-allowed", opacity:list.length?1:0.5}}>📋 העתק JSON</button>
          <button onClick={exportCSV} disabled={list.length === 0} style={{flex:"1 1 100px", background:"#1a1a2e", color:"#fff", border:"none", borderRadius:10, padding:"10px", fontSize:13, fontWeight:700, cursor:list.length?"pointer":"not-allowed", opacity:list.length?1:0.5}}>📊 העתק CSV</button>
          <button onClick={clearAll} disabled={list.length === 0} style={{flex:"1 1 100px", background:"transparent", color:"#c0392b", border:"2px solid #c0392b", borderRadius:10, padding:"9px", fontSize:13, fontWeight:700, cursor:list.length?"pointer":"not-allowed", opacity:list.length?1:0.5}}>🗑 מחק הכל</button>
        </div>
        {copied && <div style={{textAlign:"center", color:"#27ae60", marginTop:10, fontSize:13, fontWeight:700}}>✓ הועתק ללוח!</div>}
      </Card>
    </div>
  );
}

// =====================================================
// MAIN APP
// =====================================================
export default function App() {
  const [step, setStep] = useState("welcome");
  const [form, setForm] = useState({ name: "", grade: "" });
  const [level, setLevel] = useState(null);
  const [rating, setRating] = useState("");
  const [puzzleIdx, setPuzzleIdx] = useState(0);

  const submitResponse = async (data) => {
    const entry = { ...data, timestamp: new Date().toISOString() };
    // Send to Google Sheets (fire and forget; won't block UI if offline)
    sendToSheet(entry);
    // Also keep a local backup
    const all = await loadAll();
    all.push(entry);
    await saveAll(all);
  };

  if (step === "admin") return <AdminView onBack={() => setStep("welcome")}/>;

  if (step === "welcome") return (
    <Wrap>
      <Card>
        <div style={{fontSize:22, fontWeight:800, color:"#1a1a2e", marginBottom:8}}>ברוכים הבאים!</div>
        <div style={{fontSize:14, color:"#555", marginBottom:18, lineHeight:1.7}}>
          לפני שנתחיל נשמח להכיר אותך ולהבין מה הרמה שלך, כדי להתאים לך תוכן.
        </div>
        <div style={{fontSize:15, fontWeight:700, color:"#1a1a2e", marginBottom:10}}>תרצה להצטרף לחוג השחמט?</div>
        <div style={{display:"flex", gap:10, marginBottom:8}}>
          <button onClick={() => setStep("form")} style={{flex:1, background:"#c0392b", color:"#fff", border:"none", borderRadius:12, padding:"13px", fontSize:15, fontWeight:700, cursor:"pointer"}}>כן, אני רוצה! ♟</button>
          <button onClick={() => setStep("no")} style={{flex:1, background:"#f5f0e8", color:"#888", border:"2px solid #e8e0d4", borderRadius:12, padding:"13px", fontSize:14, cursor:"pointer"}}>לא תודה</button>
        </div>
      </Card>
      <div style={{textAlign:"center", marginTop:18}}>
        <button onClick={() => setStep("admin")} style={{background:"transparent", border:"none", color:"#aaa", fontSize:11, cursor:"pointer"}}>
          👁 מנהל
        </button>
      </div>
    </Wrap>
  );

  if (step === "no") return (
    <Wrap>
      <Card style={{textAlign:"center"}}>
        <div style={{fontSize:40, marginBottom:12}}>😊</div>
        <div style={{fontSize:17, fontWeight:700, color:"#1a1a2e", marginBottom:6}}>אין בעיה!</div>
        <div style={{fontSize:13, color:"#666", lineHeight:1.7}}>אם תשנה דעתך תמיד אפשר לחזור.<br/>השחמט יחכה לך ♟</div>
        <button onClick={() => setStep("welcome")} style={{marginTop:14, background:"transparent", border:"none", color:"#c0392b", fontSize:13, cursor:"pointer", textDecoration:"underline"}}>חזרה</button>
      </Card>
    </Wrap>
  );

  if (step === "form") return (
    <Wrap>
      <Card>
        <div style={{fontSize:19, fontWeight:800, color:"#1a1a2e", marginBottom:14}}>קצת עליך</div>
        <div style={{marginBottom:14}}>
          <label style={{fontSize:13, fontWeight:600, color:"#555", display:"block", marginBottom:5}}>שם מלא</label>
          <input value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="שם פרטי ושם משפחה" style={{width:"100%", padding:"12px 14px", borderRadius:10, border:"2px solid #e8e0d4", fontSize:15, boxSizing:"border-box", direction:"rtl", outline:"none", fontFamily:"inherit"}}/>
        </div>
        <div style={{marginBottom:18}}>
          <label style={{fontSize:13, fontWeight:600, color:"#555", display:"block", marginBottom:5}}>כיתה</label>
          <div style={{display:"flex", gap:8}}>
            {["י","יא","יב"].map(g => (
              <button key={g} onClick={() => setForm({...form, grade:g})} style={{
                flex:1, padding:"12px", borderRadius:10,
                border:`2px solid ${form.grade===g?"#c0392b":"#e8e0d4"}`,
                background: form.grade===g ? "#fdf0ef" : "#fff",
                color: form.grade===g ? "#c0392b" : "#1a1a2e",
                fontSize:15, fontWeight:700, cursor:"pointer"
              }}>{g}'</button>
            ))}
          </div>
        </div>
        <button disabled={!form.name || !form.grade} onClick={() => setStep("level")} style={{
          width:"100%", background: form.name && form.grade ? "#c0392b" : "#ccc",
          color:"#fff", border:"none", borderRadius:12, padding:13, fontSize:15, fontWeight:700,
          cursor: form.name && form.grade ? "pointer" : "not-allowed"
        }}>המשך ←</button>
      </Card>
    </Wrap>
  );

  if (step === "level") return (
    <Wrap>
      <Card>
        <div style={{fontSize:19, fontWeight:800, color:"#1a1a2e", marginBottom:5}}>היי {form.name}! 👋</div>
        <div style={{fontSize:14, color:"#555", marginBottom:18}}>מה רמת השחמט שלך?</div>
        <div style={{display:"flex", flexDirection:"column", gap:10}}>
          {[
            { id:"beginner", icon:"🌱", title:"לא יודע איך זזים הכלים", sub:"אני מתחיל לגמרי" },
            { id:"intermediate", icon:"⚡", title:"יודע לשחק אבל לא מחשב מהלכים", sub:"אני מכיר את הכלים" },
            { id:"rated", icon:"🏆", title:"יש לי דירוג בchess.com", sub:"שחקן מנוסה" },
          ].map(o => (
            <button key={o.id} onClick={() => {
              setLevel(o.id);
              if (o.id === "beginner") setStep("learn");
              else if (o.id === "intermediate") setStep("puzzles");
              else setStep("rating");
            }} style={{
              background:"#fff", border:"2px solid #e8e0d4", borderRadius:14,
              padding:"13px 14px", cursor:"pointer", textAlign:"right",
              display:"flex", alignItems:"center", gap:12, transition:"all 0.15s"
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor="#c0392b"}
              onMouseLeave={e => e.currentTarget.style.borderColor="#e8e0d4"}>
              <span style={{fontSize:26}}>{o.icon}</span>
              <div style={{flex:1}}>
                <div style={{fontWeight:700, fontSize:14, color:"#1a1a2e"}}>{o.title}</div>
                <div style={{fontSize:11, color:"#888"}}>{o.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </Card>
    </Wrap>
  );

  if (step === "learn") return (
    <Wrap>
      <div style={{background:"#fff", borderRadius:18, padding:18, marginBottom:14, border:"1px solid #e8e0d4"}}>
        <div style={{fontSize:20, fontWeight:800, color:"#1a1a2e", marginBottom:4}}>📚 מדריך כלי השחמט</div>
        <div style={{fontSize:13, color:"#666", lineHeight:1.6}}>בכל כלי – לחץ על הכלי בלוח כדי לראות לאן הוא יכול לזוז. מתחילים מהקל לקשה.</div>
      </div>

      {PIECE_DEMOS.map((d, i) => <PieceDemo key={i} demo={d}/>)}

      <div style={{background:"#fff", borderRadius:18, padding:18, marginBottom:14, border:"1px solid #e8e0d4"}}>
        <div style={{fontSize:18, fontWeight:800, color:"#1a1a2e", marginBottom:10}}>🏰 הצרחה (Castling)</div>
        <div style={{fontSize:13, color:"#333", lineHeight:1.8}}>
          הצרחה היא מהלך מיוחד שבו <b>המלך והצריח מחליפים מקומות</b>. זוהי הדרך הבטוחה ביותר להגן על המלך בתחילת המשחק.<br/><br/>
          <b>תנאים:</b><br/>
          ✓ המלך והצריח לא זזו מתחילת המשחק<br/>
          ✓ אין כלים ביניהם<br/>
          ✓ המלך לא בשח כרגע<br/>
          ✓ המלך לא עובר דרך שדה מותקף<br/>
          ✓ המלך לא מגיע לשדה מותקף<br/><br/>
          יש שתי צרחות: <b>קצרה</b> (לצד המלך) – מהירה ובטוחה יותר, ו<b>ארוכה</b> (לצד המלכה).
        </div>
      </div>

      <div style={{background:"#fff", borderRadius:18, padding:18, marginBottom:14, border:"1px solid #e8e0d4"}}>
        <div style={{fontSize:18, fontWeight:800, color:"#1a1a2e", marginBottom:10}}>⚠️ שח (Check)</div>
        <div style={{fontSize:13, color:"#333", lineHeight:1.8}}>
          <b>שח</b> = המלך מותקף ע"י כלי יריב.<br/><br/>
          כשהמלך שלך בשח, אתה <b>חייב</b> להגיב מיד באחת מ-3 דרכים:<br/>
          1️⃣ להזיז את המלך לשדה בטוח<br/>
          2️⃣ לחסום את ההתקפה בכלי שלך<br/>
          3️⃣ לאכול את הכלי המתקיף<br/><br/>
          ⚠️ <b>אסור לדלג על שח</b> ולעשות מהלך אחר. אם אין דרך לפתור – זה מט.
        </div>
      </div>

      <div style={{background:"linear-gradient(135deg,#1a1a2e,#16213e)", borderRadius:18, padding:18, marginBottom:14}}>
        <div style={{fontSize:18, fontWeight:800, color:"#fff", marginBottom:10}}>♚ מט (Checkmate)</div>
        <div style={{fontSize:13, color:"#d4c5a8", lineHeight:1.8}}>
          <b style={{color:"#e8c96e"}}>מט = סוף המשחק = ניצחון!</b><br/><br/>
          מט קורה כשהמלך בשח <b>ואין שום מהלך חוקי</b> שיציל אותו:<br/>
          ✓ אי אפשר להזיז את המלך לשום שדה<br/>
          ✓ אי אפשר לחסום את ההתקפה<br/>
          ✓ אי אפשר לאכול את הכלי המתקיף<br/><br/>
          <span style={{color:"#e8c96e"}}>זה מה שמנסים להשיג בכל משחק שחמט!</span>
        </div>
      </div>

      <button onClick={async () => {
        await submitResponse({ ...form, level:"beginner", completed:"learn" });
        setStep("done");
      }} style={{width:"100%", background:"#c0392b", color:"#fff", border:"none", borderRadius:12, padding:15, fontSize:15, fontWeight:700, cursor:"pointer", marginBottom:14}}>
        סיימתי ללמוד! ✓
      </button>
    </Wrap>
  );

  if (step === "puzzles") return (
    <Wrap>
      <div style={{background:"#fff", borderRadius:14, padding:"12px 14px", marginBottom:14, border:"1px solid #e8e0d4", display:"flex", alignItems:"center", gap:10}}>
        <div style={{background:"#c0392b", borderRadius:8, padding:"4px 9px", color:"#fff", fontSize:12, fontWeight:700}}>פאזל {puzzleIdx+1}/{PUZZLES.length}</div>
        <div style={{flex:1, height:6, background:"#e8e0d4", borderRadius:3, overflow:"hidden"}}>
          <div style={{height:6, width:`${((puzzleIdx+1)/PUZZLES.length)*100}%`, background:"#c0392b", transition:"width 0.3s"}}/>
        </div>
      </div>
      {puzzleIdx < PUZZLES.length && (
        <PuzzleView
          key={puzzleIdx}
          puzzle={PUZZLES[puzzleIdx]}
          onSolved={async () => {
            if (puzzleIdx < PUZZLES.length - 1) setPuzzleIdx(puzzleIdx + 1);
            else { await submitResponse({...form, level:"intermediate", completed:"puzzles"}); setStep("done"); }
          }}
          onSkip={async () => {
            if (puzzleIdx < PUZZLES.length - 1) setPuzzleIdx(puzzleIdx + 1);
            else { await submitResponse({...form, level:"intermediate", completed:"puzzles_partial"}); setStep("done"); }
          }}
        />
      )}
    </Wrap>
  );

  if (step === "rating") return (
    <Wrap>
      <Card>
        <div style={{fontSize:19, fontWeight:800, color:"#1a1a2e", marginBottom:6}}>🏆 מה הדירוג שלך?</div>
        <div style={{fontSize:13, color:"#666", marginBottom:18}}>תוכל למצוא את הדירוג בפרופיל chess.com שלך</div>
        <input value={rating} onChange={e => setRating(e.target.value.replace(/[^0-9]/g,""))} placeholder="850" type="text" inputMode="numeric" style={{width:"100%", padding:14, borderRadius:10, border:"2px solid #e8e0d4", fontSize:24, fontWeight:700, textAlign:"center", boxSizing:"border-box", marginBottom:6, outline:"none", direction:"ltr", fontFamily:"inherit"}}/>
        <div style={{fontSize:12, color:"#888", marginBottom:18, textAlign:"center", minHeight:18}}>
          {!rating ? "השאר ריק אם אין דירוג" :
           +rating < 600 ? "מתחיל 🌱" :
           +rating < 1000 ? "שחקן מתפתח ⚡" :
           +rating < 1400 ? "שחקן טוב 🎯" :
           +rating < 1800 ? "שחקן מתקדם 💎" :
           "שחקן ברמה גבוהה! 🏆"}
        </div>
        <button onClick={async () => {
          await submitResponse({...form, level:"rated", chessRating: rating || "לא ידוע", completed:"rating"});
          setStep("done");
        }} style={{width:"100%", background:"#c0392b", color:"#fff", border:"none", borderRadius:12, padding:13, fontSize:15, fontWeight:700, cursor:"pointer"}}>
          שמור ←
        </button>
      </Card>
    </Wrap>
  );

  if (step === "done") return (
    <Wrap>
      <Card style={{textAlign:"center"}}>
        <div style={{fontSize:48, marginBottom:12}}>🎉</div>
        <div style={{fontSize:22, fontWeight:800, color:"#1a1a2e", marginBottom:6}}>תודה, {form.name}!</div>
        <div style={{fontSize:14, color:"#555", lineHeight:1.7, marginBottom:18}}>
          הרישום שלך נשמר במערכת.<br/>
          נשמח לראות אותך ב<b style={{color:"#c0392b"}}>מועדון שחמט אודם</b> ♟
        </div>
        <div style={{background:"#f5f0e8", borderRadius:12, padding:14, fontSize:13, color:"#555", marginBottom:18, textAlign:"right"}}>
          <div style={{marginBottom:4}}><b>שם:</b> {form.name}</div>
          <div style={{marginBottom:4}}><b>כיתה:</b> {form.grade}'</div>
          <div><b>רמה:</b> {level === "beginner" ? "מתחיל 🌱" : level === "intermediate" ? "בינוני ⚡" : `דירוג ${rating || "לא ידוע"} 🏆`}</div>
        </div>
        <button onClick={() => {
          setStep("welcome"); setForm({name:"", grade:""}); setLevel(null); setRating(""); setPuzzleIdx(0);
        }} style={{background:"#1a1a2e", color:"#fff", border:"none", borderRadius:12, padding:"12px 22px", fontSize:14, fontWeight:700, cursor:"pointer"}}>
          חניך חדש ↺
        </button>
      </Card>
    </Wrap>
  );

  return null;
}
