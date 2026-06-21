import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Share2, Send, Link2, Check } from 'lucide-react';
import { WhatsAppIcon, XIcon } from './BrandIcons';
import { Facebook } from 'lucide-react';

/**
 * Share the CURRENT page. Reads window.location at click time, so it always
 * shares the page the visitor is on (Home, Courses, Experience, …).
 * Includes a native share button (covers Instagram, Messages, etc. on mobile)
 * plus direct WhatsApp / X / Facebook / Telegram links and copy-to-clipboard.
 */
export default function ShareBar({ className = '' }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && !!navigator.share);
  }, []);

  const url = () => window.location.href;
  const title = () => document.title;
  const open = (href) => window.open(href, '_blank', 'noopener,noreferrer');

  const nativeShare = async () => {
    try {
      await navigator.share({ title: title(), url: url() });
    } catch {
      /* user cancelled — ignore */
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — ignore */
    }
  };

  const btn =
    'inline-flex h-10 w-10 items-center justify-center rounded-full border border-mid bg-dark-2 text-gray-light transition-colors hover:border-teal hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal';

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
        {t('share.title', 'Share')}
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {canNativeShare && (
          <button type="button" onClick={nativeShare} aria-label={t('share.title', 'Share')} className={btn}>
            <Share2 className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
        <button
          type="button"
          onClick={() => open(`https://wa.me/?text=${encodeURIComponent(`${title()} ${url()}`)}`)}
          aria-label="Share on WhatsApp"
          className={btn}
        >
          <WhatsAppIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url())}&text=${encodeURIComponent(title())}`)}
          aria-label="Share on X"
          className={btn}
        >
          <XIcon className="h-[18px] w-[18px]" />
        </button>
        <button
          type="button"
          onClick={() => open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url())}`)}
          aria-label="Share on Facebook"
          className={btn}
        >
          <Facebook className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => open(`https://t.me/share/url?url=${encodeURIComponent(url())}&text=${encodeURIComponent(title())}`)}
          aria-label="Share on Telegram"
          className={btn}
        >
          <Send className="h-5 w-5" aria-hidden="true" />
        </button>
        <button type="button" onClick={copy} aria-label={t('share.copy', 'Copy link')} className={btn}>
          {copied ? <Check className="h-5 w-5 text-teal" aria-hidden="true" /> : <Link2 className="h-5 w-5" aria-hidden="true" />}
        </button>
        {copied && <span className="text-xs text-teal">{t('share.copied', 'Copied!')}</span>}
      </div>
    </div>
  );
}
