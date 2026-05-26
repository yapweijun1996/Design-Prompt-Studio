import { asFullPreset } from "./compact.js";

export const korean = asFullPreset({
  id: "korean",
  name: "Korean E-commerce",
  tag: "Hangul · soft · drop",
  desc: "Soft pastel + bold accent. Hangul typography. Drop / sneaker culture. Coupang / KREAM / Musinsa / Style Nanda register.",

  feel: "Browsing KREAM or Musinsa during a sneaker drop — Hangul + Latin mix, soft pastels with one electric accent, the product photo is hero — not a Western e-comm site dressed in Korean.",

  references: "coupang.com, kream.co.kr, musinsa.com, 29cm.co.kr, stylenanda.com, jaju.co.kr, lookfantastic Korea, oliveyoung",

  boldFactor: [
    "Hangul (Pretendard, Spoqa Han Sans, Noto Sans KR) is primary, Latin secondary",
    "Soft cream / off-white base with one bold accent (KREAM black-yellow, Musinsa magenta)",
    "Product card: hero photo + brand name (Latin) + product name (Hangul) + 시세 (resale price)",
    "Drop / 한정판 (limited edition) badges with countdown timers",
    "Editorial 'lookbook' sections — model + fit notes + styling tips",
    "Trending / 인기 ranking sidebars — '실시간 TOP 10' real-time top-10",
    "Hangul + Latin co-typography: bilingual labels stack cleanly",
  ],

  tokens: {
    "bg":      { value: "#FBFAF6", usage: "Warm cream" },
    "bg-alt":  { value: "#F4F1EA", usage: "Section alt — beige" },
    "fg":      { value: "#191919", usage: "Body ink near-black" },
    "muted":   { value: "#7A7A7A", usage: "Caption grey" },
    "brand":   { value: "#FED131", usage: "KREAM yellow accent (or magenta #FF005C for Musinsa)" },
    "drop":    { value: "#DC2626", usage: "Drop / limited-edition red" },
    "border":  { value: "#E5E1D8", usage: "Hairline border" },
  },

  typography: {
    display: '"Pretendard", "Spoqa Han Sans", "Noto Sans KR", "Inter", system-ui',
    body:    '"Pretendard", "Spoqa Han Sans", "Noto Sans KR", "Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "10/11/12/13/14/16/22/32",
    weight:  "display 600-800 · body 400-500 · numbers 600 tabular",
    tracking: "Hangul tight (-0.02em) · Latin tight · numbers tabular",
  },

  antiPatterns: [
    { name: "Latin-only",         dont: "omit Hangul typography", why: "Hangul presence IS the cultural register; Latin-only reads as Western e-comm" },
    { name: "Aggressive Western reds", dont: "use Shopee-style hot orange everywhere", why: "Korean e-comm leans calmer; bold accent is one element, not the whole page" },
    { name: "Stock smiling models", dont: "use Western stock-model imagery", why: "Real-look lookbook shots + on-body fit notes is the convention" },
    { name: "No drop / ranking",  dont: "omit limited-edition badges or top-10 rails", why: "Drop culture + real-time rankings are core conversion mechanics" },
    { name: "Heavy chrome UI",    dont: "use dense ERP-style chrome", why: "Soft pastel + bold accent is the friendly e-comm register" },
  ],

  responsive: [
    { element: "Product grid", mobile: "2",  tablet: "3",  desktop: "4" },
    { element: "Hero type",    mobile: "22px", tablet: "28px", desktop: "32px" },
    { element: "Hangul tracking", mobile: "-0.02em", tablet: "-0.02em", desktop: "-0.025em" },
  ],

  snippets: [
    `/* Product card with Hangul + Latin */
.kr-card { background: #FFFFFF; border: 1px solid #E5E1D8; border-radius: 6px; overflow: hidden; position: relative; }
.kr-card .img { aspect-ratio: 1/1; background: #F4F1EA; }
.kr-card .brand { font-family: "Pretendard", "Inter", sans-serif; font-weight: 700; font-size: 12px; letter-spacing: -0.01em; color: #191919; padding: 8px 10px 0; text-transform: uppercase; }
.kr-card .name-kr { font-family: "Pretendard", "Spoqa Han Sans", sans-serif; font-weight: 400; font-size: 12px; color: #7A7A7A; padding: 0 10px; line-height: 1.4; }
.kr-card .price { padding: 4px 10px 10px; font-weight: 700; font-size: 14px; color: #191919; font-variant-numeric: tabular-nums; }
.kr-card .drop { position: absolute; top: 8px; left: 8px; background: #FED131; color: #191919; font-weight: 700; font-size: 10px; padding: 2px 6px; border-radius: 2px; letter-spacing: -0.01em; }`,
    `/* Real-time top-10 list */
.kr-rank { display: grid; grid-template-columns: 24px 32px 1fr auto; gap: 8px; align-items: center; padding: 6px 0; border-bottom: 1px solid #E5E1D8; }
.kr-rank .num { font-family: "Pretendard", sans-serif; font-weight: 800; font-size: 14px; color: #FED131; text-align: center; }
.kr-rank .thumb { width: 32px; height: 32px; background: #F4F1EA; border-radius: 3px; }
.kr-rank .ttl { font-size: 12px; color: #191919; font-weight: 500; line-height: 1.3; }
.kr-rank .pct { font-size: 11px; color: #DC2626; font-weight: 600; font-variant-numeric: tabular-nums; }`,
    `/* Drop countdown */
.kr-drop { background: #191919; color: #FED131; padding: 8px 16px; display: flex; justify-content: space-between; align-items: center; font-family: "Pretendard", sans-serif; }
.kr-drop .label { font-weight: 700; font-size: 13px; letter-spacing: -0.01em; }
.kr-drop .time { font-family: "JetBrains Mono", monospace; font-weight: 700; font-size: 14px; font-variant-numeric: tabular-nums; }`,
  ],

  successLooksLike: [
    "KREAM product detail page with bid / ask",
    "Musinsa lookbook + product rail",
    "29cm editorial story with Hangul + Latin co-typography",
  ],

  failureLooksLike: [
    "Western e-comm template translated to Korean (no Hangul typography care)",
    "Latin-only sneaker drop site",
    "Stock model + bright vibrant Western palette",
  ],

  overrideGlobalRules: [
    "Hangul typography (Pretendard / Spoqa) is required — overrides any single-font-family guidance.",
  ],

  tile: "tile-korean",
  tileHTML: `
    <div class="drop">⏰ 한정 DROP · 02:14:07</div>
    <div class="row">
      <div class="card"><div class="img"></div><div class="br">NIKE</div><div class="nm">덩크 로우 패ル</div><div class="pr">₩ 248,000</div></div>
      <div class="card hl"><div class="img"></div><div class="br">JORDAN</div><div class="nm">에어 조던 1</div><div class="pr">₩ 540,000</div></div>
    </div>
  `,
});
