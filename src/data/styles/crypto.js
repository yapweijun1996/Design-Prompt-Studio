import { asFullPreset } from "./compact.js";

export const crypto = asFullPreset({
  id: "crypto",
  name: "Crypto / Web3",
  tag: "Dark · gradient · numbers",
  desc: "Dark glassy backgrounds. Vibrant gradients. Big numbers + on-chain stats. Uniswap / Phantom / OpenSea / Blur register.",

  feel: "Connecting a wallet on Uniswap to swap tokens — dark, kinetic, the chain stats pulse live — not a SaaS landing with a 'crypto' theme bolted on.",

  references: "uniswap.org, phantom.app, opensea.io, blur.io, magiceden.io, friend.tech, base.org, optimism.io, arbitrum.io",

  boldFactor: [
    "Dark base (#0E0E1A or #07061B) with vibrant gradient washes (purple → pink, cyan → indigo)",
    "Connect-wallet CTA persistent in the top-right",
    "Live numbers: TVL, volume, gas price, ETH/USD, floor price — pulse / animate on update",
    "Token / NFT cards with chain badge (ETH, SOL, BASE) + price + change %",
    "Glow effects on primary actions (gradient borders, accent shadow halos)",
    "Animated background: subtle particle field, gradient mesh, or floating geometric shapes",
    "Disclaimer text: 'DYOR · not financial advice' — small, footer",
  ],

  tokens: {
    "bg":      { value: "#0E0E1A", usage: "Deep cosmos bg" },
    "surface": { value: "rgba(255,255,255,0.04)", usage: "Glass card surface" },
    "fg":      { value: "#F5F5FA", usage: "Primary text" },
    "muted":   { value: "#9095B5", usage: "Secondary" },
    "brand":   { value: "#FF007A", usage: "Uniswap pink / web3 accent" },
    "brand-2": { value: "#7B61FF", usage: "Purple gradient stop" },
    "ok":      { value: "#26C281", usage: "Up / positive change" },
    "danger":  { value: "#FF4757", usage: "Down / negative" },
    "border":  { value: "rgba(255,255,255,0.08)", usage: "Glass border" },
  },

  typography: {
    display: '"Inter Display", "Söhne", system-ui',
    body:    '"Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", "Fira Code", monospace',
    scale:   "11/12/14/16/20/28/40/56",
    weight:  "display 600-800 · body 400-500 · numbers tabular",
    tracking: "display tight (-0.025em) · numbers mono tabular",
  },

  antiPatterns: [
    { name: "Light background",  dont: "use white bg for a defi app", why: "Dark is the web3 native register; light fights the data viz" },
    { name: "Proportional numbers", dont: "use default font-variant-numeric", why: "Token amounts MUST be tabular-nums — alignment is non-negotiable" },
    { name: "Marketing illustration", dont: "use stock crypto-coin illustration", why: "Live on-chain data IS the illustration; everything else is filler" },
    { name: "Hidden chain badge",  dont: "show tokens without chain context", why: "ETH ≠ ETH on Optimism — chain badge is critical info" },
    { name: "No connect-wallet",  dont: "rely solely on form-input wallet address", why: "Connect-wallet (MetaMask, Phantom, WalletConnect) is the entry point" },
  ],

  responsive: [
    { element: "Hero type",       mobile: "40px",  tablet: "52px",  desktop: "72px" },
    { element: "Stat cards",      mobile: "1col",  tablet: "2col",  desktop: "4col" },
    { element: "Section padding", mobile: "48px",  tablet: "80px",  desktop: "120px" },
  ],

  snippets: [
    `/* Glass card */
.glass-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(24px);
  color: #F5F5FA;
}
.glass-card .stat-num { font-family: "Inter Display", system-ui; font-weight: 700; font-size: 32px; font-variant-numeric: tabular-nums; letter-spacing: -0.02em; }`,
    `/* Gradient CTA — Uniswap pink */
.btn-swap {
  background: linear-gradient(135deg, #FF007A 0%, #7B61FF 100%);
  color: #FFFFFF; border: 0; border-radius: 999px;
  padding: 14px 28px; font-weight: 700; font-size: 16px;
  box-shadow: 0 0 32px rgba(255,0,122,0.35);
  cursor: pointer;
}
.btn-swap:hover { transform: translateY(-1px); box-shadow: 0 0 48px rgba(255,0,122,0.5); }`,
    `/* Animated bg gradient mesh */
.crypto-bg {
  background:
    radial-gradient(ellipse 800px 600px at 20% 10%, rgba(255,0,122,0.18), transparent),
    radial-gradient(ellipse 600px 500px at 80% 70%, rgba(123,97,255,0.18), transparent),
    radial-gradient(ellipse 500px 400px at 50% 100%, rgba(38,194,129,0.12), transparent),
    #0E0E1A;
  animation: mesh-drift 30s ease-in-out infinite;
}
@keyframes mesh-drift {
  0%, 100% { background-position: 0% 0%, 0% 0%, 0% 0%; }
  50% { background-position: 5% 10%, -5% -10%, 10% -5%; }
}`,
  ],

  successLooksLike: [
    "uniswap.org swap interface with live ETH price",
    "opensea.io NFT collection grid",
    "blur.io trading view with chain stats",
  ],

  failureLooksLike: [
    "SaaS-style light landing with 'Web3 services' marketing",
    "Crypto-coin stock illustration as hero",
    "Proportional-number token balances (lost alignment)",
  ],

  tile: "tile-crypto",
  tileHTML: `
    <div class="row"><span class="chain">ETH</span><span class="tok">UNI</span><span class="pr">$11.42</span><span class="ch">+4.8%</span></div>
    <div class="row"><span class="chain">SOL</span><span class="tok">JTO</span><span class="pr">$3.21</span><span class="ch dn">−1.2%</span></div>
    <div class="cta">Swap →</div>
  `,
});
