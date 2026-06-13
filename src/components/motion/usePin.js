import { gsap, ScrollTrigger, useGSAP } from "../../lib/gsap";
import { motion as cfg, allowHeavyFx } from "../../motionConfig";

// Pins a section while a scrubbed timeline plays, for "the page stops and a
// scene animates" moments. Builds the timeline via `buildTimeline(scope)`.
// Disabled (renders normally) on mobile / reduced-motion, so there are no
// pin-traps on touch devices.
export function usePin(ref, buildTimeline, { enabled = true, start = "top top", end = "+=100%" } = {}) {
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !enabled || !allowHeavyFx()) return;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start, end, scrub: true, pin: true, anticipatePin: 1 },
      });
      buildTimeline?.(tl, el);
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: ref, dependencies: [enabled] }
  );
}

export { cfg };
