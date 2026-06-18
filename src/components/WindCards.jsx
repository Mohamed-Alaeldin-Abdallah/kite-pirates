import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Wind } from 'lucide-react';
import { fetchWind, REFRESH_MS, DATA_SOURCE } from '../lib/weather';

const toneClass = {
  aqua: 'text-aqua',
  teal: 'text-teal',
  coral: 'text-coral',
  gray: 'text-gray-light',
};

function Card({ label, live, children, delay = 0 }) {
  return (
    <div
      className="animate-bob rounded-xl border border-aqua/15 bg-ocean-deep/55 p-4 shadow-card backdrop-blur-md"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="mb-1.5 flex items-center gap-1.5">
        {live && <span className="h-2 w-2 animate-floatDot rounded-full bg-coral" />}
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-aqua">{label}</span>
      </div>
      {children}
    </div>
  );
}

export default function WindCards() {
  const { t } = useTranslation();
  const [w, setW] = useState(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    let timer;
    const load = () =>
      fetchWind(ctrl.signal)
        .then((data) => {
          setW(data);
          setErr(false);
        })
        .catch((e) => {
          if (e.name !== 'AbortError') setErr(true);
        });
    load();
    timer = setInterval(load, REFRESH_MS); // refresh every 5 min
    return () => {
      ctrl.abort();
      clearInterval(timer);
    };
  }, []);

  const dash = '—';
  const cond = w?.condition;

  return (
    <div className="grid grid-cols-2 gap-3 sm:max-w-md lg:max-w-none lg:grid-cols-4">
      {/* Live wind + direction */}
      <Card label={t('wind.live', 'Live')} live delay={0}>
        <p className="font-display text-4xl leading-none text-ink">
          {w ? w.kts : dash}
          <span className="ms-1 text-xs font-medium text-gray-light">kts</span>
        </p>
        <p className="mt-1 text-xs text-gray-light">
          {t('wind.wind', 'Wind')} · {w ? w.dir : dash}
        </p>
      </Card>

      {/* Gusts + bar */}
      <Card label={t('wind.gusts', 'Gusts')} delay={0.6}>
        <p className="font-display text-4xl leading-none text-ink">
          {w ? w.gust : dash}
          <span className="ms-1 text-xs font-medium text-gray-light">kts</span>
        </p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-mid/60">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal to-coral transition-[width] duration-700"
            style={{ width: `${w ? w.gustPct : 0}%` }}
          />
        </div>
        <p className="mt-1.5 text-xs text-gray-light">Hurghada</p>
      </Card>

      {/* Condition */}
      <Card label={t('wind.conditions', 'Conditions')} delay={0.3}>
        <p className={`font-display text-3xl leading-none ${cond ? toneClass[cond.tone] : 'text-gray-light'}`}>
          {cond ? cond.label : dash}
        </p>
        <p className="mt-1 text-xs text-gray-light">{cond ? cond.sub : t('wind.loading', 'Loading…')}</p>
      </Card>

      {/* Best window */}
      <Card label={t('wind.best', 'Best Window')} delay={0.9}>
        <p className="flex items-center gap-1.5 font-display text-2xl leading-none text-ink">
          <Wind className="h-5 w-5 text-teal" aria-hidden="true" />
          {w ? w.bestWindow : dash}
        </p>
        <p className="mt-1 text-xs text-gray-light">{t('wind.today', 'Today')}</p>
      </Card>

      <p className="col-span-2 text-[10px] text-gray lg:col-span-4">
        {err ? t('wind.offline', 'Live wind unavailable right now.') : `${t('wind.source', 'Source')}: ${DATA_SOURCE}`}
      </p>
    </div>
  );
}
