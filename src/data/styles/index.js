// Style registry — single import surface for all style presets.

import { monochrome } from "./monochrome.js";
import { brutalist } from "./brutalist.js";
import { editorial } from "./editorial.js";
import { y2k } from "./y2k.js";
import { glass } from "./glass.js";

// Compact-format additions (synthesized md via asFullPreset)
import { linear } from "./linear.js";
import { swiss } from "./swiss.js";
import { cyberpunk } from "./cyberpunk.js";
import { newspaper } from "./newspaper.js";
import { memphis } from "./memphis.js";

// Compact-format additions, batch 2 (2026-05-26 expansion to 20 base styles)
import { sketch } from "./sketch.js";
import { vaporwave } from "./vaporwave.js";
import { cottagecore } from "./cottagecore.js";
import { solarpunk } from "./solarpunk.js";
import { bauhaus } from "./bauhaus.js";
import { industrial } from "./industrial.js";
import { pixel } from "./pixel.js";
import { tropical } from "./tropical.js";
import { constructivist } from "./constructivist.js";
import { zine } from "./zine.js";

// Compact-format, batch 3 — corporate / business / SaaS / dashboards / e-commerce
// (2026-05-26 expansion to 40 base styles, targeting real-world page types:
//  ERP, admin, marketplace, government, school, F&B, healthcare, etc.)
import { corporate } from "./corporate.js";
import { saas } from "./saas.js";
import { enterprise } from "./enterprise.js";
import { consulting } from "./consulting.js";
import { fintech } from "./fintech.js";
import { admin } from "./admin.js";
import { darkboard } from "./darkboard.js";
import { crm } from "./crm.js";
import { devtool } from "./devtool.js";
import { internal } from "./internal.js";
import { marketplace } from "./marketplace.js";
import { utility } from "./utility.js";
import { boutique } from "./boutique.js";
import { flash } from "./flash.js";
import { story } from "./story.js";
import { government } from "./government.js";
import { academic } from "./academic.js";
import { restaurant } from "./restaurant.js";
import { cafe } from "./cafe.js";
import { medical } from "./medical.js";

// Compact-format, batch 4 — portfolio / content / booking / specialized
// (2026-05-26 expansion to 60 base styles: portfolio + creator economy +
//  media + booking services + crypto/gaming/nonprofit/event/faith/museum)
import { portfolio } from "./portfolio.js";
import { agency } from "./agency.js";
import { creator } from "./creator.js";
import { resume } from "./resume.js";
import { blog } from "./blog.js";
import { news } from "./news.js";
import { podcast } from "./podcast.js";
import { video } from "./video.js";
import { docs } from "./docs.js";
import { hotel } from "./hotel.js";
import { airline } from "./airline.js";
import { realestate } from "./realestate.js";
import { legal } from "./legal.js";
import { salon } from "./salon.js";
import { crypto } from "./crypto.js";
import { gaming } from "./gaming.js";
import { nonprofit } from "./nonprofit.js";
import { event } from "./event.js";
import { church } from "./church.js";
import { museum } from "./museum.js";

// Compact-format, batch 5 — B2B SaaS subsegments (HR / CMS / analytics / email)
// (2026-05-26 expansion to 64 base styles)
import { hr } from "./hr.js";
import { cms } from "./cms.js";
import { analytics } from "./analytics.js";
import { email } from "./email.js";

// Compact-format, batch 6 — regional / cultural (JP / KR / ZH / AR)
// (2026-05-26 expansion to 68 base styles)
import { japanese } from "./japanese.js";
import { korean } from "./korean.js";
import { chinese } from "./chinese.js";
import { arabic } from "./arabic.js";

// Compact-format, batch 7 — consumer apps / experimental / verticals
// (2026-05-26 expansion to 80 base styles)
import { dating } from "./dating.js";
import { fitness } from "./fitness.js";
import { music } from "./music.js";
import { maps } from "./maps.js";
import { riso } from "./riso.js";
import { antidesign } from "./antidesign.js";
import { maximalist } from "./maximalist.js";
import { geocities } from "./geocities.js";
import { lms } from "./lms.js";
import { jobs } from "./jobs.js";
import { bank } from "./bank.js";
import { bto } from "./bto.js";

// Compact-format, batch 8 — B2C subsegments + deeper creative + verticals
// (2026-05-26 expansion to 98 base styles, 2 from 100)
import { rideshare } from "./rideshare.js";
import { delivery } from "./delivery.js";
import { bizcard } from "./bizcard.js";
import { insurance } from "./insurance.js";
import { telehealth } from "./telehealth.js";
import { chat } from "./chat.js";
import { swisslate } from "./swisslate.js";
import { artdeco } from "./artdeco.js";
import { postmemphis } from "./postmemphis.js";
import { brutalmod } from "./brutalmod.js";
import { lowpoly } from "./lowpoly.js";
import { cinema } from "./cinema.js";
import { legalsaas } from "./legalsaas.js";
import { construction } from "./construction.js";
import { agtech } from "./agtech.js";
import { automotive } from "./automotive.js";
import { nonprofitgov } from "./nonprofitgov.js";
import { biotech } from "./biotech.js";

// Compact-format, batch 9 — milestone 100 🎯 (gallery + bookstore)
// (2026-05-26 expansion to 100 base styles — round number achieved)
import { gallery } from "./gallery.js";
import { bookstore } from "./bookstore.js";

export const STYLE_PRESETS = {
  // Tier 1 — original 5 with hand-written ~250-line md
  monochrome,
  brutalist,
  editorial,
  y2k,
  glass,
  // Tier 2 — compact format with synthesized md (batch 1)
  linear,
  swiss,
  cyberpunk,
  newspaper,
  memphis,
  // Tier 2 — batch 2 (creative / expressive)
  sketch,
  vaporwave,
  cottagecore,
  solarpunk,
  bauhaus,
  industrial,
  pixel,
  tropical,
  constructivist,
  zine,
  // Tier 3 — batch 3 (corporate / business / commerce / institutional)
  corporate,
  saas,
  enterprise,
  consulting,
  fintech,
  admin,
  darkboard,
  crm,
  devtool,
  internal,
  marketplace,
  utility,
  boutique,
  flash,
  story,
  government,
  academic,
  restaurant,
  cafe,
  medical,
  // Tier 4 — batch 4 (portfolio / content / booking / specialized)
  portfolio,
  agency,
  creator,
  resume,
  blog,
  news,
  podcast,
  video,
  docs,
  hotel,
  airline,
  realestate,
  legal,
  salon,
  crypto,
  gaming,
  nonprofit,
  event,
  church,
  museum,
  // Tier 5 — batch 5 (B2B SaaS subsegments)
  hr,
  cms,
  analytics,
  email,
  // Tier 6 — batch 6 (regional / cultural)
  japanese,
  korean,
  chinese,
  arabic,
  // Tier 7 — batch 7 (consumer apps / experimental / verticals)
  dating,
  fitness,
  music,
  maps,
  riso,
  antidesign,
  maximalist,
  geocities,
  lms,
  jobs,
  bank,
  bto,
  // Tier 8 — batch 8 (B2C subsegments + deeper creative + verticals)
  rideshare,
  delivery,
  bizcard,
  insurance,
  telehealth,
  chat,
  swisslate,
  artdeco,
  postmemphis,
  brutalmod,
  lowpoly,
  cinema,
  legalsaas,
  construction,
  agtech,
  automotive,
  nonprofitgov,
  biotech,
  // Tier 9 — batch 9 (milestone 100 🎯)
  gallery,
  bookstore,
};

export const STYLE_IDS = Object.keys(STYLE_PRESETS);
export const STYLE_LIST = Object.values(STYLE_PRESETS);

export function getStyle(id) {
  return STYLE_PRESETS[id] || null;
}

export function styleCount() {
  return STYLE_IDS.length;
}
