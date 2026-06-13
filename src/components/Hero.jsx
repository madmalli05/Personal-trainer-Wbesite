import { motion } from "framer-motion";
import { brand } from "../content";

const lineVariant = {
  hidden: { y: "110%" },
  show: (i) => ({
    y: "0%",
    transition: { delay: 0.15 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-inner">
        <h1 className="hero-title">
          {brand.headlineLines.map((line, i) => (
            <span className="line" key={i}>
              <motion.span
                style={{ display: "block" }}
                custom={i}
                variants={lineVariant}
                initial="hidden"
                animate="show"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          {brand.tagline}
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
        >
          <a href={brand.primaryCta.href} className="btn btn-primary">
            {brand.primaryCta.label} →
          </a>
          <a href={brand.secondaryCta.href} className="btn btn-ghost">
            {brand.secondaryCta.label}
          </a>
        </motion.div>
      </div>

      <div className="scroll-cue" aria-hidden="true">
        <span className="mouse" />
        Scroll
      </div>
    </section>
  );
}
