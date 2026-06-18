import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { whatsappUrl, WHATSAPP_NUMBERS } from '../lib/config';

// One WhatsApp bar with three language contacts: UK, Italy, Germany.
// Each flag opens WhatsApp with that language's number and a prefilled message.
const CONTACTS = [
  { key: 'uk', flag: '🇬🇧', label: 'English', msg: "Hi Kite Pirates, I'd like to book a week" },
  { key: 'it', flag: '🇮🇹', label: 'Italiano', msg: 'Ciao Kite Pirates, vorrei prenotare una settimana' },
  { key: 'de', flag: '🇩🇪', label: 'Deutsch', msg: 'Hallo Kite Pirates, ich möchte eine Woche buchen' },
];

export default function WhatsAppButton() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 end-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className="flex flex-col items-end gap-2"
          >
            {CONTACTS.map((c) => (
              <li key={c.key}>
                <a
                  href={whatsappUrl(c.msg, WHATSAPP_NUMBERS[c.key])}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-full border border-aqua/20 bg-dark-2/95 py-2 ps-3 pe-4 text-sm font-semibold text-ink shadow-card backdrop-blur-md transition-colors hover:border-teal hover:text-teal"
                >
                  <span className="text-lg leading-none" aria-hidden="true">{c.flag}</span>
                  {c.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? t('whatsapp.close', 'Close WhatsApp menu') : t('whatsapp.aria')}
        className="relative inline-flex h-14 w-14 items-center justify-center self-end rounded-full bg-teal text-dark shadow-teal transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        {open ? <X className="h-7 w-7" aria-hidden="true" /> : <MessageCircle className="h-7 w-7" aria-hidden="true" />}
        {!open && (
          <span className="absolute end-1 top-1 h-3 w-3 animate-floatDot rounded-full border-2 border-dark bg-coral" />
        )}
      </button>
    </div>
  );
}
