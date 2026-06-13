# 🏋️ IRON FORGE — Scroll-Motion Training Website

A bold, modern, scroll-driven website for a bodybuilding / personal-training
business, featuring an **interactive 3D dumbbell** that spins and drifts across
the screen as you scroll.

Built with **React + Vite**, **Three.js** (`@react-three/fiber` + `drei` +
`postprocessing`), **GSAP + ScrollTrigger** (scroll storytelling, pins, parallax,
split-text), **Lenis** (smooth scrolling) and **Framer Motion** (UI motion).
Includes a custom cursor, magnetic buttons, 3D tilt cards and a cinematic,
scroll-choreographed 3D dumbbell.

---

## ✏️ How to edit your content (the important part)

**You only need to edit one file:** [`src/content.js`](src/content.js).

Open it and change the placeholder text, prices, testimonials, contact details
and colors. Everything is clearly labelled with comments. Save the file and the
website updates instantly while it's running.

What you can change there:

| Section | What you edit |
|--------|----------------|
| `theme` | Colors for the whole site (accent, background, text…) |
| `brand` | Business name, your name, hero headline, tagline, buttons |
| `about` | Your bio, **coach photo** (`image`) + the stats that count up on scroll |
| `programs` | Coaching plans, prices and features (`featured: true` highlights one) |
| `transformations` | **Before/after slider** photos (`before`/`after` per client) |
| `results` | Testimonials + client **avatars** |
| `faq` | Frequently-asked questions (click to expand) |
| `blog` | **Journal articles** — `excerpt` for the card, `body` (array of paragraphs) for the popup |
| `contact` | Email, phone, location, socials + **`formspreeId`** (see below) |
| `nav` | The top menu links |

### Photos
Every photo is just a URL in `content.js`. The defaults pull real stock photos
(Lorem Picsum) so it looks complete out of the box — **swap them for your own
gym/client photos**. You can paste any image URL, or drop a file into the
`public/` folder and reference it like `"/my-photo.jpg"`. If an image ever fails
to load, an on-brand placeholder shows automatically (never a broken image).

### Contact form → your inbox (Formspree)
By default the form opens the visitor's email app. To receive messages straight
to your inbox instead, create a free form at [formspree.io](https://formspree.io),
copy the id (the part after `/f/`) and paste it into `contact.formspreeId`.
Full steps are in **[DEPLOY.md](DEPLOY.md)**.

> Page title & SEO description live in [`index.html`](index.html) — update those
> to match your business too.

---

## 🎚️ Tuning the animations (intensity)

All the motion (smooth-scroll feel, scroll reveals, parallax depth, pinned
sections, custom cursor, tilt, magnetic buttons, 3D bloom/particles) is tuned
from one file: [`src/motionConfig.js`](src/motionConfig.js). It's separate from
your content, so you can dial the experience without touching anything else.

A few common tweaks:

- **Calmer overall:** lower `reveal` durations, set `parallax.depth` toward `0`.
- **Turn off the pinned scenes:** `pins.hero = false` and/or `pins.transformations = false`.
- **No custom cursor:** `cursor.enabled = false`.
- **Lighter 3D:** `scene.bloom = false`, `scene.particles = false`.
- **Kill all scripted motion:** `enabled = false`.

Good to know — these are automatic and need no config:
- Visitors with **"reduce motion"** enabled get a calm, static, fully-readable site.
- **Phones / touch devices** skip the custom cursor, tilt, magnetic and the pinned
  scrolls, and run a lighter 3D scene, so mobile stays smooth.

---

## ▶️ Run it on your computer (see it today)

You need [Node.js](https://nodejs.org) 18 or newer installed. Then, in this
folder:

```bash
npm install      # first time only — downloads the libraries
npm run dev      # starts the site
```

Open the URL it prints (usually **http://localhost:5173**) in your browser.
Edit `src/content.js` and the page refreshes automatically.

---

## 🚀 Deploy it (get a live link)

**👉 Step-by-step instructions are in [DEPLOY.md](DEPLOY.md).** The recommended
path is **Vercel**: connect your GitHub once and every push auto-deploys a live
URL — no servers, no config.

Prefer to do it by hand? Build a static copy and host the `dist/` folder anywhere:

```bash
npm run build    # creates a "dist/" folder
npm run preview  # (optional) preview the built site locally
```

The project uses a relative base path, so the built site works on Vercel,
Netlify, or even a subfolder. No server or database is required.

---

## 🧱 Project structure

```
index.html              Page shell + SEO tags + fonts
src/
  content.js            ← EDIT THIS: all your text, prices, colors
  motionConfig.js       ← tune animation intensity (durations, pins, effects)
  index.css             Design system / styles (rarely need to touch)
  App.jsx               Ties everything together
  main.jsx              App entry point
  lib/gsap.js           Central GSAP plugin registration
  providers/
    SmoothScroll.jsx    Lenis smooth scroll synced to GSAP ScrollTrigger
  components/
    DumbbellScene.jsx   The cinematic 3D dumbbell (lazy-loaded)
    Navbar.jsx  Hero.jsx  About.jsx  Services.jsx  Transformations.jsx
    Results.jsx  Faq.jsx  Blog.jsx  Contact.jsx  Footer.jsx
    Img.jsx  BeforeAfter.jsx  Reveal.jsx
    motion/             Reusable motion primitives:
      SplitHeading.jsx  MagneticButton.jsx  TiltCard.jsx
      CustomCursor.jsx  Parallax.jsx  usePin.js
```

## ♿ Accessibility & performance

- Respects `prefers-reduced-motion` (no smooth scroll, reveals, cursor, tilt or
  pins; the 3D dumbbell holds a static pose; content is fully visible).
- The 3D scene is **lazy-loaded** in its own chunk, so the page paints fast
  (initial JS ≈ 110 KB gzipped) and the heavy three.js code only loads after.
- Phones/touch devices auto-skip the custom cursor, tilt, magnetic buttons and
  pinned scenes, and run a lighter 3D scene (no bloom/particles) to stay smooth.
- Falls back gracefully if a device can't run WebGL (the page still works).
- Fully responsive — looks great on phones, tablets and desktops.
