// Market / Region axis — the SECOND localization axis, orthogonal BY KIND to the
// Locale/Culture (heritage) axis in locales.js:
//   • heritage (locales.js) = what it LOOKS like — script, type, colour, motif.
//   • market  (this file)   = WHERE it operates — languages shown, currency,
//                             payment methods, festival calendar, civic/regulatory tone.
//
// Because the axes control different things, EVERY combination is meaningful and no
// validity matrix is needed: heritage=Chinese × market=Malaysia = a Songti/中国红 look
// operating in Ringgit/FPX/BM-EN-中文/CNY; heritage=Peranakan × market=US = a Nyonya
// brand selling to the US. The market block deliberately carries NO fonts/colours/motifs
// (that is heritage's job) — only operating context.
//
// `override`        → emitted as a <market-context> block in the assembled prompt.
// `defaultHeritage` → when a market is chosen and no heritage is set yet, the UI may
//                     pre-select this heritage (overridable) so "pick a country" gives
//                     a whole coherent look without hard-coupling the two axes.

export const MARKET_PRESETS = [
  {
    id: "none",
    name: "None / Global",
    tag: "No market context",
    desc: "No market layer — global/default. Today's behavior.",
    defaultHeritage: null,
    override: "",
  },

  {
    id: "us",
    name: "United States",
    tag: "USD · English · Stripe",
    desc: "US market — USD, English, US payment & trust norms.",
    defaultHeritage: "default",
    override: `**MARKET CONTEXT — UNITED STATES (where this operates)**
- Language: US English. Currency: US Dollar ($1,234.56), MM/DD/YYYY dates.
- Payments to surface: cards, Apple Pay, Google Pay, PayPal, Shop Pay; "Buy now, pay later" (Affirm/Klarna) for retail.
- Calendar: Black Friday / Cyber Monday, Thanksgiving, July 4th, winter holidays.
- Trust/legal cues: clear pricing, privacy policy + CCPA notice, accessibility (ADA/WCAG), free-returns/shipping messaging for e-commerce.
- Tone: confident, benefit-led, direct.`,
  },

  {
    id: "uk",
    name: "United Kingdom",
    tag: "GBP · English · GDPR",
    desc: "UK market — GBP, British English, GDPR.",
    defaultHeritage: "english-trad",
    override: `**MARKET CONTEXT — UNITED KINGDOM (where this operates)**
- Language: British English (colour, -ise, "VAT included"). Currency: Pound (£1,234.56), DD/MM/YYYY.
- Payments to surface: cards, Apple/Google Pay, PayPal; bank transfer (Faster Payments) for B2B.
- Calendar: Boxing Day, bank holidays, Wimbledon/summer, Christmas.
- Trust/legal cues: UK GDPR + cookie consent, prices inc. VAT, Companies House reg no. in footer, Royal Mail delivery estimates.
- Tone: understated, precise, polite.`,
  },

  {
    id: "my",
    name: "Malaysia",
    tag: "RM · BM/EN/中文/தமிழ் · FPX",
    desc: "Malaysian market — Ringgit, multilingual, FPX/DuitNow, halal-aware.",
    defaultHeritage: "malay",
    override: `**MARKET CONTEXT — MALAYSIA (where this operates)**
- Languages: Bahasa Melayu + English primary; offer 中文 / தமிழ் toggle for consumer/public-facing.
- Currency: Ringgit (RM / MYR), format RM1,234.50.
- Payments to surface: FPX (online banking), DuitNow QR, Touch 'n Go eWallet, GrabPay, Boost; cards.
- Calendar: Hari Raya Aidilfitri, Chinese New Year, Deepavali, Merdeka Day (31 Aug), Malaysia Day (16 Sep).
- Trust/regulatory cues: PDPA notice; Halal (JAKIM) certification where F&B/cosmetics; SSM business reg. no. in footer.
- Tone: warm, multilingual, community-oriented.`,
  },

  {
    id: "sg",
    name: "Singapore",
    tag: "S$ · EN/中文/Melayu/தமிழ் · PayNow",
    desc: "Singapore market — SGD, CMIO multilingual, PayNow/GovTech.",
    defaultHeritage: "singapore",
    override: `**MARKET CONTEXT — SINGAPORE (where this operates)**
- Languages: English primary; offer 中文 / Melayu / தமிழ் toggle (CMIO) for public-facing.
- Currency: Singapore Dollar (S$1,234.56).
- Payments to surface: PayNow (QR), cards, Apple/Google Pay, GrabPay; Singpass for gov/finance identity.
- Calendar: Chinese New Year, Hari Raya, Deepavali, National Day (9 Aug), Great Singapore Sale.
- Trust/regulatory cues: PDPA; Singpass/Myinfo for KYC; clear, civic, no-nonsense tone for gov services.
- Tone: clean, efficient, multicultural, trustworthy.`,
  },

  {
    id: "vn",
    name: "Vietnam",
    tag: "₫ · Vietnamese · Momo/VNPay",
    desc: "Vietnamese market — Dong, Vietnamese, Momo/VNPay/ZaloPay.",
    defaultHeritage: "vietnam",
    override: `**MARKET CONTEXT — VIETNAM (where this operates)**
- Language: Vietnamese (correct diacritics throughout); English secondary for cross-border.
- Currency: Vietnamese Dong (₫ / VND), format 1.234.000₫ (dot thousands, symbol after).
- Payments to surface: Momo, VNPay QR, ZaloPay, bank transfer; cards; COD common for e-commerce.
- Calendar: Tết (Lunar New Year — the major one), Mid-Autumn, 30 Apr / 1 May holidays.
- Trust cues: COD + easy returns build trust; Zalo as a support/contact channel.
- Tone: friendly, modern, value-aware.`,
  },

  {
    id: "id",
    name: "Indonesia",
    tag: "Rp · Bahasa · GoPay/OVO",
    desc: "Indonesian market — Rupiah, Bahasa Indonesia, GoPay/OVO/QRIS.",
    defaultHeritage: "indonesia",
    override: `**MARKET CONTEXT — INDONESIA (where this operates)**
- Language: Bahasa Indonesia (English secondary). Currency: Rupiah (Rp1.234.000, dot thousands).
- Payments to surface: GoPay, OVO, DANA, ShopeePay, QRIS, bank transfer (Virtual Account); COD common.
- Calendar: Idul Fitri / Lebaran (peak), Ramadan, Independence Day (17 Aug), Harbolnas (online shopping days 11.11/12.12).
- Trust cues: free-ongkir (free shipping) messaging, COD, WhatsApp support, mobile-first low-bandwidth.
- Tone: friendly, inclusive, value-led.`,
  },

  {
    id: "th",
    name: "Thailand",
    tag: "฿ · Thai · PromptPay",
    desc: "Thai market — Baht, Thai language, PromptPay/TrueMoney.",
    defaultHeritage: "thai",
    override: `**MARKET CONTEXT — THAILAND (where this operates)**
- Language: Thai (correct tone/vowel marks); English secondary. Currency: Baht (฿1,234.50).
- Payments to surface: PromptPay (QR), TrueMoney Wallet, cards, bank transfer; COD common.
- Calendar: Songkran (Thai New Year, Apr), Loy Krathong, King's/Queen's birthdays, 11.11/12.12 sales.
- Trust cues: LINE as the primary support/chat + LINE Official Account; mobile-first.
- Tone: polite, warm, modern.`,
  },

  {
    id: "jp",
    name: "Japan",
    tag: "¥ · Japanese · konbini/PayPay",
    desc: "Japanese market — Yen, Japanese, konbini/PayPay, precise.",
    defaultHeritage: "japanese-modern",
    override: `**MARKET CONTEXT — JAPAN (where this operates)**
- Language: Japanese (polite/keigo register); English secondary. Currency: Yen (¥1,234, no decimals), YYYY年MM月DD日.
- Payments to surface: cards, PayPay, konbini (convenience-store) payment, bank transfer, Rakuten Pay; カード on delivery.
- Calendar: Golden Week, Obon, New Year (お正月), seasonal (桜/紅葉) campaigns.
- Trust cues: precise specs, detailed FAQ, 特定商取引法 (Act on Specified Commercial Transactions) page, careful delivery dates.
- Tone: precise, polite, detail-rich.`,
  },

  {
    id: "kr",
    name: "South Korea",
    tag: "₩ · Korean · KakaoPay/Toss",
    desc: "Korean market — Won, Korean, KakaoPay/Naver Pay/Toss.",
    defaultHeritage: "korean-modern",
    override: `**MARKET CONTEXT — SOUTH KOREA (where this operates)**
- Language: Korean (Hangul); English secondary. Currency: Won (₩1,234, no decimals).
- Payments to surface: KakaoPay, Naver Pay, Toss, cards, 무통장입금 (bank transfer); fast same-day delivery expectations.
- Calendar: Seollal (Lunar New Year), Chuseok, year-end; 11.11 and shopping-festival energy.
- Trust cues: KakaoTalk channel for support, reviews/ratings prominent, slick mobile UX expected.
- Tone: bright, confident, polished.`,
  },

  {
    id: "in",
    name: "India",
    tag: "₹ · EN/हिन्दी/தமிழ் · UPI",
    desc: "Indian market — Rupee, multilingual, UPI, mobile-first.",
    defaultHeritage: "tamil",
    override: `**MARKET CONTEXT — INDIA (where this operates)**
- Languages: English + Hindi widely; regional (தமிழ் / తెలుగు / বাংলা …) toggle for consumer reach.
- Currency: Indian Rupee (₹1,23,456.00 — lakh/crore grouping).
- Payments to surface: UPI (GPay/PhonePe/Paytm), cards, net-banking, COD common; EMI for high-ticket.
- Calendar: Diwali (peak), Holi, Eid, regional new years; Big Billion / Great Indian Sale events.
- Trust cues: COD + easy returns, WhatsApp support, mobile-first low-bandwidth, GST invoice.
- Tone: warm, value-led, festive.`,
  },
];

export const MARKET_IDS = MARKET_PRESETS.map((m) => m.id);

export const MARKET_BY_ID = Object.fromEntries(MARKET_PRESETS.map((m) => [m.id, m]));

export function getMarket(id) {
  return MARKET_BY_ID[id] || MARKET_PRESETS[0];
}

export function marketCount() {
  return MARKET_PRESETS.length;
}
