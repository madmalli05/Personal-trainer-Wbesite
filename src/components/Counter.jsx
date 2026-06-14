import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

// Counts up from 0 → value when scrolled into view (supports decimals).
export default function Counter({ value, suffix = "", decimals = 0, className = "num" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const duration = 1400;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setN(eased * value);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className={className}>
      {n.toFixed(decimals)}
      {suffix}
    </span>
  );
}
