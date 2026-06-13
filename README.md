# 🏋️ IRON FORGE — Scroll-Motion Training Website

A bold, modern, scroll-driven website for a bodybuilding / personal-training
business, featuring an **interactive 3D dumbbell** that spins and drifts across
the screen as you scroll.

Built with **React + Vite**, **Three.js** (`@react-three/fiber` + `drei`),
**Framer Motion** (scroll animations) and **Lenis** (smooth scrolling).

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
| `about` | Your bio + the stats that count up on scroll |
| `programs` | Coaching plans, prices and features (`featured: true` highlights one) |
| `results` | Client transformations & testimonials |
| `contact` | Email, phone, location, social links |
| `nav` | The top menu links |

> Page title & SEO description live in [`index.html`](index.html) — update those
> to match your business too.

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

## 🚀 Deploy it (put it online)

Build the production version:

```bash
npm run build    # creates a "dist/" folder
npm run preview  # (optional) preview the built site locally
```

The `dist/` folder is a plain static website you can host anywhere. Easiest
options:

- **Netlify / Vercel:** drag-and-drop the `dist` folder, or connect this repo
  and use build command `npm run build` and publish directory `dist`.
- **GitHub Pages:** push the repo, then serve the `dist` folder (the project is
  already configured with a relative base path, so it works in subfolders).

No server or database is required — the contact form opens the visitor's email
app addressed to you. To collect submissions automatically instead, swap the
`onSubmit` handler in `src/components/Contact.jsx` for a form service such as
[Formspree](https://formspree.io).

---

## 🧱 Project structure

```
index.html              Page shell + SEO tags + fonts
src/
  content.js            ← EDIT THIS: all your text, prices, colors
  index.css             Design system / styles (rarely need to touch)
  App.jsx               Ties everything together (smooth scroll + theme)
  main.jsx              App entry point
  hooks/
    useScrollProgress.js  Tracks scroll 0→1 for the 3D dumbbell
  components/
    DumbbellScene.jsx   The interactive 3D dumbbell
    Navbar.jsx  Hero.jsx  About.jsx  Services.jsx
    Results.jsx  Contact.jsx  Footer.jsx  Reveal.jsx
```

## ♿ Accessibility & performance

- Respects `prefers-reduced-motion` (disables smooth scroll + dumbbell spin).
- Falls back gracefully if a device can't run WebGL (the page still works).
- Fully responsive — looks great on phones, tablets and desktops.
