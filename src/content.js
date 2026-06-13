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
// 5d) BLOG / JOURNAL  — articles. The full text lives in `body` (an array of
//     paragraphs) and opens in a popup. Add a post by copying a { ... } block.
// ---------------------------------------------------------------------------
export const blog = {
  kicker: "Journal",
  title: "Training notes & nutrition breakdowns.",
  subtitle: "No fluff — just what actually moves the needle.",
  posts: [
    {
      slug: "progressive-overload",
      title: "Progressive Overload, Explained",
      date: "2026-05-18",
      readingTime: "4 min read",
      image: "https://picsum.photos/seed/blog-overload/1200/675",
      imageAlt: "Barbell loaded with weight plates",
      excerpt: "The one principle every good program is secretly built on.",
      body: [
        "If your training isn't getting harder over time, your body has no reason to change. Progressive overload simply means gradually increasing the demand on your muscles — more weight, more reps, more sets, or better control.",
        "The mistake most people make is chasing soreness or novelty instead of progression. Variety feels productive, but the magic is in beating last week's numbers, even by a little.",
        "Pick a handful of key lifts, log them, and aim to add reps or weight each week. Small, consistent jumps compound into a completely different physique over a year.",
      ],
    },
    {
      slug: "protein-myths",
      title: "How Much Protein Do You Actually Need?",
      date: "2026-04-30",
      readingTime: "5 min read",
      image: "https://picsum.photos/seed/blog-protein/1200/675",
      imageAlt: "Healthy high-protein meal",
      excerpt: "Cutting through the noise on the most over-debated macro.",
      body: [
        "For most people building muscle, somewhere around 0.7–1g of protein per pound of bodyweight per day is plenty. More than that rarely helps, and far less will quietly stall your progress.",
        "Spread it across 3–4 meals so you're hitting a solid dose each time. Whole foods first, supplements only to fill gaps.",
        "Consistency beats perfection. Hitting your protein target most days for months matters far more than nailing it exactly every single day.",
      ],
    },
    {
      slug: "first-12-weeks",
      title: "What to Expect in Your First 12 Weeks",
      date: "2026-04-08",
      readingTime: "6 min read",
      image: "https://picsum.photos/seed/blog-12weeks/1200/675",
      imageAlt: "Athlete training in the gym",
      excerpt: "A realistic timeline of what changes — and when.",
      body: [
        "Weeks 1–4 are about learning the lifts and building a routine. You'll feel stronger fast — most of that early jump is your nervous system, not muscle, and that's exactly how it should go.",
        "Weeks 5–8, the habits stick and the scale and mirror start moving. This is where accountability matters most, because motivation always dips here.",
        "By week 12, the changes are obvious — to you and everyone around you. The goal was never a quick fix; it's a system you can run for life.",
      ],
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
  // To receive form submissions straight to your inbox, create a free form at
  // formspree.io and paste the id here (the part after /f/, e.g. "mwkgabcd").
  // Leave it "" and the form will open the visitor's email app instead.
  formspreeId: "",
  email: "coach@ironforge.com", // shown as a contact link + used by the email-app fallback
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
  { label: "Results", href: "#transformations" },
  { label: "FAQ", href: "#faq" },
  { label: "Journal", href: "#blog" },
  { label: "Contact", href: "#contact" },
];
