import { useState, useId } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

function Item({ faq, isOpen, onToggle }) {
  const reduce = useReducedMotion();
  const id = useId();
  return (
    <div className="border-b border-mid">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`${id}-panel`}
          id={`${id}-btn`}
          className="flex w-full items-center justify-between gap-4 py-5 text-start text-base font-medium text-ink transition-colors hover:text-teal"
        >
          <span>{faq.q}</span>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-teal transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-btn`}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-gray-light">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ({ faqs }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="mx-auto max-w-prose">
      {faqs.map((faq, i) => (
        <Item key={faq.q} faq={faq} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />
      ))}
    </div>
  );
}
