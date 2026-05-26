import { asFullPreset } from "./compact.js";

export const delivery = asFullPreset({
  id: "delivery",
  name: "Food Delivery",
  tag: "Restaurant · cart · ETA",
  desc: "Restaurant grid + menu + cart + order tracking. DoorDash / Foodpanda / Deliveroo / Uber Eats register.",

  feel: "Browsing DoorDash for dinner at 7pm — restaurant cards with hero photo + ETA, tap into menu, add to cart, track driver — not a generic grocery list pretending to be food delivery.",

  references: "DoorDash, Uber Eats, Foodpanda, Deliveroo, Grubhub, Just Eat, Grab Food, Zomato",

  boldFactor: [
    "Restaurant card: hero food photo + name + cuisine + rating + ETA + delivery fee",
    "Menu page: category nav left, item cards with photo + name + price + add button",
    "Sticky cart drawer: items + subtotal + delivery fee + 'Checkout (3)' CTA",
    "Order tracking screen: timeline (Confirmed → Preparing → Picked up → Delivered) + driver map",
    "Promo strip: 'Free delivery over $20', '20% off your first order'",
    "Reviews + photos from real customers shown per restaurant + per item",
  ],

  tokens: {
    "bg":      { value: "#FFFFFF", usage: "Page white" },
    "fg":      { value: "#191919", usage: "Body" },
    "muted":   { value: "#767676", usage: "Secondary" },
    "brand":   { value: "#EB1700", usage: "DoorDash red (or pink #D70F64 Foodpanda)" },
    "ok":      { value: "#00A862", usage: "Free delivery / promo green" },
    "rating":  { value: "#F5A623", usage: "Star rating" },
    "border":  { value: "#E0E0E0", usage: "Card border" },
  },

  typography: {
    display: '"TT Norms Pro", "Söhne", "Inter Display", system-ui',
    body:    '"Inter", system-ui, sans-serif',
    mono:    '"JetBrains Mono", monospace',
    scale:   "11/12/14/16/20/28/40",
    weight:  "display 700 · body 400-500 · price 600 tabular",
  },

  antiPatterns: [
    { name: "Tiny food photos", dont: "use 60px thumbnails", why: "Food photography sells; show big appetizing images on every card" },
    { name: "No ETA",          dont: "omit estimated delivery time", why: "ETA is the #1 decision factor — visible on every card" },
    { name: "Hidden delivery fee", dont: "reveal fee only at checkout", why: "Upfront fees build trust; hidden fees create rage-cancels" },
    { name: "Stock chef photo", dont: "use generic Shutterstock restaurant imagery", why: "Real food photos + real menu items drive conversion" },
  ],

  responsive: [
    { element: "Restaurant grid", mobile: "1col", tablet: "2col", desktop: "3-4col" },
    { element: "Cart drawer", mobile: "full sheet", tablet: "right 320px", desktop: "right 360px" },
  ],

  snippets: [
    `/* Restaurant card */
.rest-card { background: #FFFFFF; border-radius: 12px; overflow: hidden; cursor: pointer; }
.rest-card .img { aspect-ratio: 16/9; background: #F4F4F4; }
.rest-card .body { padding: 8px 4px; }
.rest-card .name { font-weight: 700; font-size: 16px; color: #191919; }
.rest-card .meta { display: flex; gap: 8px; font-size: 13px; color: #767676; align-items: center; }
.rest-card .rating { color: #F5A623; font-weight: 600; }
.rest-card .eta { background: #F4F4F4; padding: 1px 6px; border-radius: 4px; font-size: 12px; font-weight: 600; }
.rest-card .promo { color: #00A862; font-size: 12px; font-weight: 600; }`,
    `/* Add-to-cart button */
.btn-add { background: #EB1700; color: #FFFFFF; border: 0; border-radius: 999px; width: 32px; height: 32px; font-size: 18px; font-weight: 700; cursor: pointer; display: grid; place-items: center; }
.btn-add--qty { width: auto; padding: 0 12px; gap: 8px; display: inline-flex; align-items: center; }`,
  ],

  successLooksLike: [
    "DoorDash restaurant grid with food hero + ETA",
    "Uber Eats menu screen with category nav + cart drawer",
  ],

  failureLooksLike: [
    "Marketing landing without restaurant grid",
    "Hidden delivery fees revealed only at checkout",
  ],

  tile: "tile-delivery",
  tileHTML: `
    <div class="card">
      <div class="img"></div>
      <div class="nm">Sushi Hana</div>
      <div class="row"><span class="r">★ 4.8</span><span class="eta">25 min</span><span class="pm">Free delivery</span></div>
    </div>
    <div class="cart">Cart (3) · $24.80 · Checkout →</div>
  `,
});
