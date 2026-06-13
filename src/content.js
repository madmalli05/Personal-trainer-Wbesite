// ============================================================================
//  ✏️  EDIT YOUR WEBSITE HERE  —  THIS IS THE ONLY FILE YOU NEED TO CHANGE
// ----------------------------------------------------------------------------
//  Everything below is placeholder content. Swap in your own brand name, bio,
//  programs, prices, testimonials, contact details and colors. Save the file
//  and the site updates instantly (while running `npm run dev`).
//
//  Tips:
//   • Keep the quotes "" around text.
//   • Items inside [ ] are lists — copy/paste a { ... } block to add more.
//   • Colors accept any CSS color (hex like "#e8ff3a" or "rgb(...)").
// ============================================================================

// ---------------------------------------------------------------------------
// 1) COLORS / THEME  — change the look of the whole site from here
// ---------------------------------------------------------------------------
export const theme = {
  accent: "#e8ff3a", // main energy color (buttons, highlights, dumbbell rim)
  accent2: "#ff4d2e", // secondary accent (gradients, glow)
  bg: "#0a0a0c", // page background
  panel: "rgba(16, 16, 20, 0.82)", // section panels (keep some transparency!)
  text: "#f5f5f7", // main text color
  muted: "#9b9ba3", // secondary / muted text
};

// ---------------------------------------------------------------------------
// 2) BRAND / HERO
// ---------------------------------------------------------------------------
export const brand = {
  name: "IRON FORGE", // shown in the navbar & footer
  coach: "Alex Stone", // your name
  // Hero headline — split into lines for the big animated title:
  headlineLines: ["FORGE", "YOUR", "STRENGTH"],
  tagline: "Online & in-person bodybuilding coaching that builds the body you were made for.",
  // The two hero buttons:
  primaryCta: { label: "Start Coaching", href: "#contact" },
  secondaryCta: { label: "View Programs", href: "#programs" },
};

// ---------------------------------------------------------------------------
// 3) ABOUT  — your story + the headline stats that count up on scroll
// ---------------------------------------------------------------------------
export const about = {
  kicker: "About the Coach",
  title: "I help everyday people build extraordinary physiques.",
  // Coach photo. Swap this URL for your own (or drop a file in /public and use
  // "/my-photo.jpg"). If the image ever fails to load, an on-brand placeholder shows.
  image: "https://picsum.photos/seed/ironforge-coach/900/1100",
  imageAlt: "Coach Alex Stone in the gym",
  paragraphs: [
    "I'm Alex — a certified strength & physique coach with over a decade in the trenches. I've competed, I've failed, I've rebuilt, and I've coached hundreds of clients to do the same.",
    "My approach is simple: smart programming, sustainable nutrition, and relentless accountability. No gimmicks, no crash diets — just a plan built around your body, your schedule and your goals.",
  ],
  // These numbers animate from 0 when they scroll into view.
  stats: [
    { value: 12, suffix: "+", label: "Years Coaching" },
    { value: 480, suffix: "+", label: "Clients Transformed" },
    { value: 9, suffix: "", label: "Pro Shows Prepped" },
    { value: 100, suffix: "%", label: "Custom Programs" },
  ],
};

// ---------------------------------------------------------------------------
// 4) PROGRAMS / SERVICES  — your coaching tiers & prices
//    Set "featured: true" on the plan you want highlighted.
// ---------------------------------------------------------------------------
export const programs = {
  kicker: "Programs",
  title: "Choose your path to the platform.",
  subtitle: "Every plan is fully customized to your body, goals and experience level.",
  plans: [
    {
      name: "Foundation",
      price: "$99",
      period: "/ month",
      blurb: "For beginners ready to build real strength and habits.",
      featured: false,
      features: [
        "Custom 4-day training program",
        "Beginner nutrition guidelines",
        "Form-check video reviews",
        "Monthly check-in & adjustments",
      ],
      cta: "Get Started",
    },
    {
      name: "Hypertrophy",
      price: "$199",
      period: "/ month",
      blurb: "Serious muscle building with weekly accountability.",
      featured: true,
      features: [
        "Fully periodized training plan",
        "Custom macros & meal structure",
        "Weekly 1:1 check-ins",
        "24/7 messaging support",
        "Supplement protocol",
      ],
      cta: "Most Popular",
    },
    {
      name: "Stage Ready",
      price: "$349",
      period: "/ month",
      blurb: "Full competition prep from off-season to peak week.",
      featured: false,
      features: [
        "Contest prep periodization",
        "Peak week & water manipulation",
        "Posing & presentation coaching",
        "Daily check-ins as you near the show",
        "Off-season reverse diet plan",
      ],
      cta: "Apply Now",
    },
  ],
};

// ---------------------------------------------------------------------------
// 5) RESULTS / TESTIMONIALS  — client wins & quotes
// ---------------------------------------------------------------------------
export const results = {
  kicker: "Results",
  title: "Real people. Real transformations.",
  subtitle: "A few of the athletes who trusted the process.",
  testimonials: [
    {
      name: "Marcus T.",
      result: "+18 lbs lean mass in 6 months",
      quote:
        "Alex completely rebuilt my training. I'm bigger, stronger and finally know how to eat. Best investment I've ever made in myself.",
      rating: 5,
      avatar: "https://picsum.photos/seed/marcus-t/200/200", // client photo (swap or remove)
    },
    {
      name: "Priya N.",
      result: "First bikini show — 2nd place",
      quote:
        "From zero stage experience to placing top 3. The posing coaching and daily check-ins during prep were a game changer.",
      rating: 5,
      avatar: "https://picsum.photos/seed/priya-n/200/200",
    },
    {
      name: "Dev R.",
      result: "Lost 42 lbs, kept the muscle",
      quote:
        "I'd failed every diet before this. Sustainable nutrition plus real accountability made it click. Down 42 lbs and still lifting heavy.",
      rating: 5,
      avatar: "https://picsum.photos/seed/dev-r/200/200",
    },
  ],
};

// ---------------------------------------------------------------------------
// 5b) TRANSFORMATIONS  — drag-to-reveal before/after sliders
//     Replace before/after with your client photos (same size looks best).
// ---------------------------------------------------------------------------
export const transformations = {
  kicker: "Transformations",
  title: "Drag to reveal the results.",
  subtitle: "Real clients, real coaching blocks. Slide each photo to compare.",
  items: [
    {
      name: "Marcus — 24 week build",
      before: "https://picsum.photos/seed/marcus-before/900/1100",
      after: "https://picsum.photos/seed/marcus-after/900/1100",
      beforeAlt: "Marcus before coaching",
      afterAlt: "Marcus after 24 weeks",
    },
    {
      name: "Priya — 16 week prep",
      before: "https://picsum.photos/seed/priya-before/900/1100",
      after: "https://picsum.photos/seed/priya-after/900/1100",
      beforeAlt: "Priya before prep",
      afterAlt: "Priya on stage",
    },
    {
      name: "Dev — 30 week cut",
      before: "https://picsum.photos/seed/dev-before/900/1100",
      after: "https://picsum.photos/seed/dev-after/900/1100",
      beforeAlt: "Dev before cut",
      afterAlt: "Dev after losing 42 lbs",
    },
  ],
};

// ---------------------------------------------------------------------------
// 5c) FAQ  — common questions (click to expand)
// ---------------------------------------------------------------------------
export const faq = {
  kicker: "FAQ",
  title: "Questions, answered.",
  items: [
    {
      q: "Do I need a gym membership?",
      a: "Ideally yes — a commercial gym gives us the most options. But I also build effective home and minimal-equipment programs if that's what you've got.",
    },
    {
      q: "I'm a complete beginner. Is this for me?",
      a: "Absolutely. The Foundation plan is built specifically for beginners — we start with the basics, dial in your technique, and build real habits before pushing intensity.",
    },
    {
      q: "How does online coaching actually work?",
      a: "You get a custom training and nutrition plan in an app, send form-check videos, and we check in on a set schedule. You message me with questions any time.",
    },
    {
      q: "What if I have an injury or dietary restriction?",
      a: "Everything is tailored to you. We program around injuries and build your nutrition around your preferences, allergies and lifestyle — no cookie-cutter plans.",
    },
    {
      q: "Is there a minimum commitment?",
      a: "Coaching is month-to-month. Real change takes time, so I recommend committing to at least 12 weeks, but you're never locked into a long contract.",
    },
  ],
};

// ---------------------------------------------------------------------------
// 6) CONTACT  — how clients reach you
// ---------------------------------------------------------------------------
export const contact = {
  kicker: "Get Started",
  title: "Ready to build something serious?",
  subtitle:
    "Tell me about your goals and I'll get back to you within 24 hours with the right plan for you.",
  email: "coach@ironforge.com", // the form sends here (opens the visitor's email app)
  phone: "+1 (555) 123-4567",
  location: "Iron Forge Gym · Austin, TX",
  socials: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
    { label: "TikTok", href: "https://tiktok.com/" },
  ],
};

// ---------------------------------------------------------------------------
// 7) NAVIGATION  — the links in the top menu (must match section ids)
// ---------------------------------------------------------------------------
export const nav = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Results", href: "#results" },
  { label: "Contact", href: "#contact" },
];
