import { motion } from "framer-motion";

// A small wrapper that fades + slides its children in when they scroll
// into view. Reused by every section so the whole site feels cohesive.
export default function Reveal({ children, delay = 0, y = 40, className, style, as = "div" }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
