# 🔵 MadTrains — Premium Fitness Brand Website

A cinematic, scroll-driven **fitness brand** website: a long-scroll homepage plus
dedicated pages, an interactive **3D gym scene** (dumbbell, plates, kettlebell,
barbell, body silhouette) that flows through as you scroll and follows your mouse,
and a high-converting **application form** as the primary goal.

Built with **React + Vite**, **React Router**, **Three.js** (`@react-three/fiber`
+ `drei`), **GSAP + ScrollTrigger** (split-text, parallax), and **Framer Motion**
(UI motion). Custom cursor, magnetic buttons, 3D tilt cards, native smooth scroll.

> **Theme:** black + deep electric-blue + clean white. Apple-clean type, Nike energy.

---

## ⭐ Where to edit everything (quick reference)

| You want to change… | Edit this |
|--------|----------------|
| **Brand name / logo** | `brand.name`, `brand.nameFirst`, `brand.nameAccent` in [`src/content.js`](src/content.js) (+ `<title>` in `index.html`) |
| **Colors / theme** | `theme` in `content.js` (accent, accent2, bg, panel, text, muted) |
| **Photos / videos** | The `image`/`before`/`after`/`avatar` URL fields in `content.js` (or drop files in `/public` and use `"/my-file.jpg"`) |
| **Programs / prices** | `programs.plans` in `content.js` (name, price, features, `featured`, `buyUrl`) |
| **Contact / application form** | `contact` in `content.js` (email, `formspreeId`, dropdown options) |
| **Section text** | Each section's object in `content.js` (`about`, `method`, `philosophy`, `resources`, `results`, `faq`, `blog`…) |
| **Animation intensity** | [`src/motionConfig.js`](src/motionConfig.js) (reveals, parallax, cursor, tilt, magnetic, pins) |
| **3D objects / scene** | [`src/components/DumbbellScene.jsx`](src/components/DumbbellScene.jsx) (object list in `Rig`, geometry components, lighting) |
| **Pages / nav** | `nav` + `pages` in `content.js`; routes in [`src/App.jsx`](src/App.jsx) |

## ✏️ Content lives in one file: `src/content.js`

| Key | What you edit |
|--------|----------------|
| `theme` | Colors for the whole site |
| `brand` | Name, two-tone logo, hero headline, tagline, CTAs |
| `socialProof` | Trust band metrics (animated counters) |
| `about` | Coach story, **photo** (`image`), stats |
| `programs` | Plans, prices, features, `buyUrl` (direct-buy link), apply/buy labels |
| `method` | The 6-step coaching process |
| `philosophy` | Training principles |
| `resources` | "Beyond coaching" pillars (nutrition, challenges, app…) |
| `transformations` | Before/after slider photos |
| `results` | Testimonials + avatars |
| `faq` | Expandable Q&A |
| `blog` | Journal articles (`body` = paragraphs shown in the popup) |
| `contact` | Email, socials, `formspreeId`, form dropdown options |
| `nav` / `pages` | Top-menu section links / dedicated page routes |

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
vercel.json             SPA routing rewrite (for deploy)
src/
  content.js            ← EDIT THIS: all your text, prices, colors, media
  motionConfig.js       ← tune animation intensity (reveals, cursor, tilt, pins)
  index.css             Design system / styles (rarely need to touch)
  App.jsx               Router + persistent layout (nav, footer, 3D, cursor)
  main.jsx              App entry point
  lib/gsap.js           Central GSAP plugin registration
  providers/
    SmoothScroll.jsx    Native scroll + scroll-progress tracking for the 3D
  pages/                One file per route:
    Home.jsx (long scroll) AboutPage ProgramsPage TransformationsPage
    JournalPage ApplyPage PhilosophyPage
  components/
    DumbbellScene.jsx   The 3D gym scene (lazy-loaded): dumbbell, plates,
                        kettlebell, barbell, body silhouette
    Hero.jsx SocialProof.jsx About.jsx Services.jsx Method.jsx
    Transformations.jsx Results.jsx Philosophy.jsx Resources.jsx
    Blog.jsx Faq.jsx Contact.jsx  Navbar.jsx Footer.jsx PageShell.jsx
    Img.jsx Counter.jsx BeforeAfter.jsx Reveal.jsx RouteScroll.jsx
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
