// Mood presets — named combinations of density + drama + motion.
// Each base style × each mood produces a distinct style-variant the user can pick.
// 9 moods × 10 base styles = 90 visible style presets.

export const MOOD_PRESETS = [
  {
    id: "default",
    name: "Default",
    desc: "Style as designed",
    density: "default",
    drama: "confident",
    motion: "default",
  },
  {
    id: "whisper",
    name: "Whisper",
    desc: "Subtle · spacious · still",
    density: "sparse",
    drama: "subtle",
    motion: "minimal",
  },
  {
    id: "monument",
    name: "Monument",
    desc: "Spacious · confident · stilled motion",
    density: "sparse",
    drama: "confident",
    motion: "minimal",
  },
  {
    id: "compose",
    name: "Compose",
    desc: "Spacious · confident · default motion",
    density: "sparse",
    drama: "confident",
    motion: "default",
  },
  {
    id: "cover",
    name: "Cover Story",
    desc: "Balanced · loud · playful",
    density: "balanced",
    drama: "loud",
    motion: "playful",
  },
  {
    id: "broadcast",
    name: "Broadcast",
    desc: "Balanced · loud · default",
    density: "balanced",
    drama: "loud",
    motion: "default",
  },
  {
    id: "library",
    name: "Library",
    desc: "Dense · subtle · minimal motion",
    density: "dense",
    drama: "subtle",
    motion: "minimal",
  },
  {
    id: "magazine",
    name: "Magazine",
    desc: "Dense · confident · default",
    density: "dense",
    drama: "confident",
    motion: "default",
  },
  {
    id: "frenzy",
    name: "Frenzy",
    desc: "Dense · loud · playful",
    density: "dense",
    drama: "loud",
    motion: "playful",
  },
];

export const MOOD_BY_ID = Object.fromEntries(MOOD_PRESETS.map((m) => [m.id, m]));

export function getMood(id) {
  return MOOD_BY_ID[id] || MOOD_PRESETS[0];
}
