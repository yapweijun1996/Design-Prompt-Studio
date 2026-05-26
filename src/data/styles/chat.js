import { asFullPreset } from "./compact.js";

export const chat = asFullPreset({
  id: "chat",
  name: "Real-time Chat",
  tag: "Channels · threads · presence",
  desc: "Channel sidebar + message stream + thread panel. Slack / Discord / Linear Chat / Microsoft Teams register.",

  feel: "A senior eng tabbing into Slack at 9am — channel list left, message stream middle, thread panel right, presence dots tell you who's online — not a generic messaging app pretending to be team chat.",

  references: "Slack, Discord, Microsoft Teams, Linear Chat, Mattermost, Zulip, Pumble, Twist",

  boldFactor: [
    "Three-pane: workspace + channel sidebar / message stream / thread or details panel",
    "Channel hierarchy: #general / #engineering / #design — with unread bold + count badges",
    "Presence dots: online (green), away (yellow), DND (red) on every avatar",
    "Message: avatar + name + timestamp + body; threads = inline reply count",
    "Emoji reactions and inline pickers — first-class UI primitive",
    "Slash commands surface (/poll, /giphy, /remind), notifications inbox, mentions",
  ],

  tokens: {
    "bg":       { value: "#FFFFFF", usage: "Light theme bg (Slack default)" },
    "sidebar":  { value: "#3F0E40", usage: "Slack aubergine (or #2F3136 Discord dark)" },
    "sidebar-fg": { value: "#E3D8E3", usage: "Sidebar text" },
    "fg":       { value: "#1D1C1D", usage: "Body text" },
    "muted":    { value: "#616061", usage: "Secondary" },
    "brand":    { value: "#5865F2", usage: "Discord blurple (or Slack purple #4A154B)" },
    "online":   { value: "#22C55E", usage: "Online presence dot" },
    "border":   { value: "#E1E1E1", usage: "Border" },
  },

  typography: {
    display: '"Slack Lato", "Söhne", "Inter", system-ui',
    body:    '"Lato", "Söhne", "Inter", system-ui, sans-serif',
    mono:    '"Monaco", "Menlo", "JetBrains Mono", monospace',
    scale:   "11/12/13/14/15/16/18/22",
    weight:  "display 700-900 · body 400 · channel-name 500-700",
  },

  antiPatterns: [
    { name: "Single-pane chat",  dont: "use WhatsApp-style single-pane on desktop", why: "Team chat = channels + stream + thread/details — multi-pane is the genre" },
    { name: "Hidden presence",   dont: "omit online/away/DND dots", why: "Presence drives synchronous-vs-async decisions" },
    { name: "No threads",        dont: "force flat replies in channel", why: "Threads keep channels readable — non-negotiable team-chat feature" },
    { name: "Modal-driven react", dont: "open modal to add emoji reaction", why: "Inline reactions + hover-picker is the genre primitive" },
  ],

  responsive: [
    { element: "Three-pane",    mobile: "tabs", tablet: "channels+stream", desktop: "all three" },
    { element: "Sidebar",       mobile: "drawer", tablet: "200px", desktop: "260px" },
    { element: "Thread panel",  mobile: "modal", tablet: "drawer", desktop: "right 360px" },
  ],

  snippets: [
    `/* App shell */
.chat-shell { display: grid; grid-template-columns: 260px 1fr 360px; height: 100vh; }
.chat-sidebar { background: #3F0E40; color: #E3D8E3; padding: 16px 0; overflow-y: auto; }
.chat-stream { background: #FFFFFF; overflow-y: auto; }
.chat-thread { background: #F8F8F8; border-left: 1px solid #E1E1E1; overflow-y: auto; }
.chat-channel { display: flex; align-items: center; gap: 6px; padding: 4px 16px; font-size: 14px; color: #BCB2BC; cursor: pointer; }
.chat-channel:hover { background: rgba(255,255,255,0.05); color: #FFFFFF; }
.chat-channel.active { background: #1164A3; color: #FFFFFF; }
.chat-channel.unread { color: #FFFFFF; font-weight: 700; }
.chat-channel .count { margin-left: auto; background: #E01E5A; color: #FFFFFF; font-size: 11px; padding: 1px 6px; border-radius: 10px; font-weight: 700; }`,
    `/* Message row */
.chat-msg { display: grid; grid-template-columns: 36px 1fr; gap: 10px; padding: 6px 16px; }
.chat-msg:hover { background: #F8F8F8; }
.chat-msg img { width: 36px; height: 36px; border-radius: 4px; }
.chat-msg .head { display: flex; align-items: baseline; gap: 8px; }
.chat-msg .name { font-weight: 700; font-size: 15px; color: #1D1C1D; }
.chat-msg .time { font-size: 12px; color: #616061; }
.chat-msg .body { font-size: 15px; line-height: 1.45; color: #1D1C1D; }
.chat-msg .reactions { display: flex; gap: 4px; margin-top: 4px; }
.chat-msg .react { background: #F4F4F4; border: 1px solid #E1E1E1; border-radius: 12px; padding: 1px 8px; font-size: 12px; font-weight: 600; color: #1D1C1D; cursor: pointer; }
.chat-msg .react.me { background: #E8F4FB; border-color: #1264A3; color: #1264A3; }`,
  ],

  successLooksLike: [
    "Slack workspace with channels + stream + thread",
    "Discord server with category channels + voice rooms",
  ],

  failureLooksLike: [
    "WhatsApp single-pane UI as 'team chat'",
    "No presence dots, no threads, no emoji reactions",
  ],

  tile: "tile-chat",
  tileHTML: `
    <div class="rail">
      <div class="ch">#general</div>
      <div class="ch hl">#engineering <span class="ct">3</span></div>
      <div class="ch">#design</div>
    </div>
    <div class="msg">
      <div class="row"><b>Jordan M.</b> <span class="t">9:42</span></div>
      <div class="body">just shipped the new dashboard 🚀</div>
      <div class="rx">🎉 4 &nbsp; 🚀 2</div>
    </div>
  `,
});
