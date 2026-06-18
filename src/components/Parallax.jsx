import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Wraps children and shifts them vertically as the element scrolls through the
 * viewport, creating depth for beach/island background layers.
 *
 *   speed: positive = moves slower than scroll (further away),
 *          negative = moves opposite (closer / foreground).
 * Disabled entirely under prefers-reduced-motion.
 */
export default function Parallax({ children, speed = 30, className = '' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
