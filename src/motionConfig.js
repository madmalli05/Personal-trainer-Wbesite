// ============================================================================
//  🎚️  ANIMATION INTENSITY KNOBS  —  tune the whole site's motion from here
// ----------------------------------------------------------------------------
//  This is the *technical* tuning file (separate from content.js). Dial these
//  to soften or amplify the cinematic effects. Touch devices and visitors who
//  enable "reduce motion" automatically get the safe/off behavior regardless
//  of what's set here.
// ============================================================================

export const motion = {
  enabled: true, // master switch for all scripted motion
  reducedMotionRespect: true, // honor the OS "reduce motion" setting

  smooth: { duration: 1.1 }, // Lenis smooth-scroll easing (higher = floatier)

  // Scroll-reveal of sections/cards
  reveal: { y: 48, duration: 0.8, stagger: 0.1, ease: "power3.out" },

  parallax: { depth: 0.14 }, // 0 = off, ~0.2 = strong

  pins: { hero: true, transformations: true }, // pinned cinematic moments

  cursor: { enabled: true }, // custom cursor (desktop / fine-pointer only)
  tilt: { enabled: true, max: 10 }, // 3D card tilt, max degrees
  magnetic: { enabled: true, strength: 0.45 }, // button magnetism (0–1)

  // 3D dumbbell scene
  scene: {
    bloom: true, // glow on the accent rims (desktop only)
    particles: true, // floating atmosphere particles (desktop only)
    cameraDolly: 0.8, // how much the camera pushes in on scroll
  },
};

// ----- Runtime capability checks (used to auto-disable effects) -------------
const mq = (q) => typeof window !== "undefined" && window.matchMedia(q).matches;

export const prefersReducedMotion = () => mq("(prefers-reduced-motion: reduce)");
export const isFinePointer = () => mq("(hover: hover) and (pointer: fine)");
export const isDesktopWidth = () => typeof window !== "undefined" && window.innerWidth > 820;

// True when scripted motion is allowed at all.
export const allowMotion = () =>
  motion.enabled && !(motion.reducedMotionRespect && prefersReducedMotion());

// True when "premium pointer" effects (cursor/tilt/magnetic) should run.
export const allowPointerFx = () => allowMotion() && isFinePointer();

// True when the heavier 3D extras (bloom/particles/pins) should run.
export const allowHeavyFx = () => allowMotion() && isDesktopWidth();
