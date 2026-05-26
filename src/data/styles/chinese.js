import { asFullPreset } from "./compact.js";

export const chinese = asFullPreset({
  id: "chinese",
  name: "Chinese Editorial",
  tag: "宋体 · serif · 资讯",
  desc: "Serif Chinese (宋体) editorial. Dense feature article + classification nav. 端傳媒 / 财新 / 知乎日报 / 看理想 register.",

  feel: "Reading a long-form feature on 端傳媒 about a labor dispute — dense, considered, serif Chinese commands respect — not a Western news template with Chinese text dropped in.",

  references: "theinitium.com (端傳媒), caixin.com (财新), nytimes.com/zh-hans, sixthtone.com, 看理想 vistopia.com.cn, 单读 ono.cn, 澎湃 thepaper.cn",

  boldFactor: [
    "Songti (宋体 — Source Han Serif, Noto Serif SC) for headlines and body — never sans-only",
    "Dense multi-column feature layouts (8-12 column grid) with editorial sidebars",
    "Topic / classification nav: 政治 / 經濟 / 文化 / 國際 / 評論 — visible top bar",
    "Author byline with credentials + city + read-time + 分享 share count",
    "Pull quotes in larger serif with vertical-RL writing mode option",
    "Mix of Traditional + Simplified handled — language toggle if cross-region",
    "Restrained color: ink black + paper cream + one editorial red (#A6242C) accent",
  ],

  tokens: {
    "bg":      { value: "#FCFAF4", usage: "Rice-paper cream" },
    "bg-alt":  { value: "#F4F0E4", usage: "Section alt — warm" },
    "fg":      { value: "#1A1A1A", usage: "Sumi ink body" },
    "muted":   { value: "#5A5A5A", usage: "Caption, byline" },
    "accent":  { value: "#A6242C", usage: "Editorial 中国红 — used 1-2x per article" },
    "rule":    { value: "#CFCAB7", usage: "Hairline rule" },
  },

  typography: {
    display: '"Source Han Serif SC", "Noto Serif SC", "Songti SC", "SimSun", "Source Serif 4", serif',
    body:    '"Source Han Serif SC", "Noto Serif SC", "Songti SC", "Source Serif 4", Georgia, serif',
    mono:    '"Source Han Mono", "JetBrains Mono", monospace',
    scale:   "12/14/16/18/22/28/40/56",
    weight:  "display 500-700 · body 400 · italic-equivalent rare in Chinese",
    tracking: "Chinese tight (-0.01em) · Latin normal · 行高 line-height generous 1.7+",
  },

  antiPatterns: [
    { name: "Sans-only Chinese",  dont: "use system Hei (黑体) for body text", why: "Songti (宋体) IS the editorial register; Hei reads as commercial" },
    { name: "Tight line-height",  dont: "use 1.4 line-height for Chinese body", why: "Chinese characters need 1.7-1.85 line-height to read comfortably" },
    { name: "Western Times-italic", dont: "fake italic on Chinese characters", why: "Chinese typography has no native italic; emphasize with bold or color" },
    { name: "Marketing CTA",      dont: "use '马上购买!' marketing exclamation", why: "Editorial voice: '繼續閱讀' / '查看全文' / '訂閱' — measured" },
    { name: "Hidden topic nav",   dont: "tuck 板块 (sections) behind a hamburger", why: "Topic-based browsing is the convention; show 政治/经济/文化/etc. up top" },
  ],

  responsive: [
    { element: "Section padding", mobile: "24px",  tablet: "64px",  desktop: "96px" },
    { element: "Body type",       mobile: "16px",  tablet: "18px",  desktop: "18px" },
    { element: "Article measure", mobile: "100%",  tablet: "32em",  desktop: "36em" },
    { element: "Chinese line-height", mobile: "1.75", tablet: "1.8", desktop: "1.85" },
  ],

  snippets: [
    `/* Chinese article body */
.zh-article { max-width: 36em; margin: 0 auto; padding: 64px 24px; font-family: "Source Han Serif SC", "Noto Serif SC", "Songti SC", serif; font-size: 18px; line-height: 1.85; color: #1A1A1A; }
.zh-article h1 { font-size: 40px; font-weight: 700; line-height: 1.3; margin: 0 0 8px; letter-spacing: -0.01em; }
.zh-article .deck { font-size: 18px; line-height: 1.6; color: #5A5A5A; margin-bottom: 32px; }
.zh-article p { margin: 1.2em 0; text-indent: 2em; /* 中文段首缩进 */ }
.zh-article p:first-of-type { text-indent: 0; }`,
    `/* Pull quote — vertical-RL option */
.zh-pull { font-family: "Source Han Serif SC", serif; font-weight: 500; font-size: 24px; line-height: 1.7; color: #A6242C; max-width: 22em; margin: 32px 0; padding: 16px 24px; border-left: 3px solid #A6242C; background: #F4F0E4; }`,
    `/* Topic nav strip */
.zh-topnav { display: flex; gap: 0; padding: 8px 24px; background: #1A1A1A; color: #FCFAF4; font-family: "Source Han Serif SC", serif; font-weight: 500; font-size: 15px; }
.zh-topnav a { color: #FCFAF4; padding: 6px 16px; text-decoration: none; letter-spacing: 0.05em; }
.zh-topnav a:hover { color: #A6242C; }
.zh-topnav a.active { background: #A6242C; }`,
  ],

  successLooksLike: [
    "端傳媒 (theinitium.com) feature article page",
    "财新 (caixin.com) long-form report",
    "纽约时报中文网 long-read",
  ],

  failureLooksLike: [
    "Western news template with Google Translate Chinese pasted in",
    "Sans-only (Hei body) used for a serious editorial publication",
    "Western italics faked on Chinese characters",
  ],

  overrideGlobalRules: [
    "Songti (宋体) display + body is the editorial register — overrides any 'avoid serif body' guidance.",
    "Chinese line-height 1.75-1.85 is required for legibility — overrides tighter Latin defaults.",
  ],

  tile: "tile-chinese",
  tileHTML: `
    <div class="nav">政治 · 經濟 · 文化 · 國際</div>
    <div class="head">在十字路口的<br/>城市與工人</div>
    <div class="by">記者 王 莉 · 香港 · 12分鐘</div>
    <div class="body">深秋的傍晚，工廠的燈光依舊亮着。一場關於勞動權益的爭議正在悄然展開……</div>
  `,
});
