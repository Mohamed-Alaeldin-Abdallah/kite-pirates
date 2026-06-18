import { motion, useReducedMotion } from 'framer-motion';

const offsets = {
  up: { x: 0, y: 32 },
  down: { x: 0, y: -32 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
};

/**
 * Scroll-reveal wrapper. Animates in once when 15% visible.
 * Fully respects prefers-reduced-motion (renders static when reduced).
 */
export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  as = 'div',
  className = '',
  ...rest
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  const from = offsets[direction] || offsets.up;

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
