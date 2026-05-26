import { asFullPreset } from "./compact.js";

export const lms = asFullPreset({
  id: "lms",
  name: "Education LMS",
  tag: "Course · progress · video",
  desc: "Course catalog + lesson player + progress tracking. Khan Academy / Coursera / Udemy / edX register.",

  feel: "Logging into Coursera to continue a Python course at lunch — lesson video on the left, syllabus on the right, progress bar reassures you — not a marketing landing for an LMS.",

  references: "Khan Academy, Coursera, Udemy, edX, Skillshare, Codecademy, DataCamp, MasterClass",

  boldFactor: [
    "Course catalog: cards with thumbnail + title + instructor + rating + duration + level",
    "Lesson player: video left + sidebar with lesson list + progress checkmarks",
    "Progress tracking: course % complete, streak days, learner XP / badges",
    "Quiz / assessment UI with instant-feedback states",
    "Discussion / Q&A thread per lesson with upvote",
    "Certificate / completion artifact at end (downloadable, shareable to LinkedIn)",
    "Friendly, encouraging palette: blue + warm yellow, never harsh",
  ],

  tokens: {
    "bg":       { value: "#FFFFFF", usage: "Page white" },
    "bg-soft":  { value: "#F5F7FA", usage: "Sidebar / section alt" },
    "fg":       { value: "#1F2937", usage: "Body text" },
    "muted":    { value: "#6B7280", usage: "Secondary text" },
    "brand":    { value: "#0056D2", usage: "Coursera blue (or Khan green #14BF96)" },
    "warn":     { value: "#F5B342", usage: "Practice / warning" },
    "ok":       { value: "#10B981", usage: "Completed / correct" },
    "border":   { value: "#E5E7EB", usage: "Card border" },
  },

  typography: {
    display: '"Inter", "Söhne", system-ui',
    body:    '"Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "11/12/14/16/18/24/32/44",
    weight:  "display 600-700 · body 400-500",
    tracking: "normal",
  },

  antiPatterns: [
    { name: "Hidden progress",  dont: "show only the current lesson without progress %", why: "Progress visibility is the retention mechanic — show % + checkmarks" },
    { name: "No video player",  dont: "rely on text-only courses for a video-led platform", why: "Video player is the dominant surface; treat it as a first-class element" },
    { name: "Aggressive paywall", dont: "block lesson 2 behind a 'Subscribe' modal", why: "Preview / first lessons free; paywall belongs at certificate / advanced content" },
    { name: "Cold corporate palette", dont: "use enterprise navy + grey", why: "Learners need encouragement — friendly blue / warm yellow / sage green" },
    { name: "Stock smiling-laptop photo", dont: "use generic e-learning stock", why: "Real instructor photography + real lesson content > stock" },
  ],

  responsive: [
    { element: "Player layout",   mobile: "stack",  tablet: "video+syllabus", desktop: "video 70% + syllabus 30%" },
    { element: "Course grid",     mobile: "1",      tablet: "2",     desktop: "3-4" },
    { element: "Sidebar",         mobile: "drawer", tablet: "240px", desktop: "280px" },
  ],

  snippets: [
    `/* Course card */
.course-card { background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; overflow: hidden; cursor: pointer; }
.course-card .thumb { aspect-ratio: 16/9; background: linear-gradient(135deg, #0056D2 0%, #4A90E2 100%); }
.course-card .body { padding: 14px 16px; }
.course-card h3 { font-size: 16px; font-weight: 600; color: #1F2937; margin: 0 0 6px; line-height: 1.3; }
.course-card .instr { font-size: 13px; color: #6B7280; margin-bottom: 8px; }
.course-card .meta { display: flex; gap: 12px; font-size: 12px; color: #6B7280; }
.course-card .meta .rating { color: #F5B342; font-weight: 600; }`,
    `/* Lesson player + syllabus */
.lesson-shell { display: grid; grid-template-columns: 1fr 320px; gap: 16px; height: 100%; }
.video-player { background: #000; aspect-ratio: 16/9; border-radius: 8px; }
.syllabus { background: #F5F7FA; border-radius: 8px; padding: 16px; overflow-y: auto; }
.syllabus-item { display: flex; gap: 10px; padding: 8px 0; border-bottom: 1px solid #E5E7EB; font-size: 14px; align-items: center; cursor: pointer; }
.syllabus-item .check { width: 18px; height: 18px; border-radius: 50%; border: 2px solid #E5E7EB; display: grid; place-items: center; flex-shrink: 0; }
.syllabus-item.done .check { background: #10B981; border-color: #10B981; color: #FFFFFF; }
.syllabus-item.current { background: #FFFFFF; border-left: 3px solid #0056D2; padding-left: 8px; margin-left: -8px; }`,
    `/* Progress bar */
.progress { display: flex; align-items: center; gap: 8px; }
.progress-bar { flex: 1; height: 6px; background: #E5E7EB; border-radius: 3px; overflow: hidden; }
.progress-bar > i { display: block; height: 100%; background: #10B981; width: 38%; }
.progress-num { font-size: 12px; font-weight: 600; color: #6B7280; font-variant-numeric: tabular-nums; }`,
  ],

  successLooksLike: [
    "Coursera lesson page with video + syllabus + progress",
    "Khan Academy practice exercise with instant feedback",
    "Udemy course catalog with rating + instructor",
  ],

  failureLooksLike: [
    "Marketing landing page applied to a course UI",
    "Course without visible progress tracking",
    "Aggressive paywall on lesson 2 of free preview",
  ],

  tile: "tile-lms",
  tileHTML: `
    <div class="vp"><div class="play">▶</div></div>
    <div class="syl">
      <div class="row done">✓ Intro</div>
      <div class="row done">✓ Lists & dicts</div>
      <div class="row cur">▸ Functions</div>
      <div class="row">○ Classes</div>
    </div>
    <div class="prog"><div class="bar"><i></i></div><span>38%</span></div>
  `,
});
