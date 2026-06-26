/**
 * Deep-overlay translated text onto the English structural data.
 *
 * The English data files remain the single source of truth for everything
 * (prices, ids, icons, AND the English copy). A language "override" object
 * contains ONLY the translatable strings, mirroring the English shape. We
 * overlay field-by-field so:
 *   - numbers/ids/icons always come from the English data (no price drift),
 *   - any field missing from the override falls back to English (never blank),
 *   - arrays merge by index (override arrays mirror the English order).
 */

function isPlainObject(v) {
  return v && typeof v === 'object' && !Array.isArray(v);
}

export function mergeItem(base, over) {
  if (over === undefined || over === null) return base;
  // primitive override (string/number) replaces the base value
  if (!isPlainObject(over) && !Array.isArray(over)) return over;

  if (Array.isArray(base) && Array.isArray(over)) {
    return base.map((b, i) => mergeItem(b, over[i]));
  }
  if (isPlainObject(base) && isPlainObject(over)) {
    const out = { ...base };
    for (const key of Object.keys(over)) {
      out[key] = mergeItem(base[key], over[key]);
    }
    return out;
  }
  // shape mismatch — keep the override if present, else base
  return over ?? base;
}

/** Merge a whole collection (array or object) against its override. */
export function mergeCollection(base, over) {
  if (over === undefined) return base;
  return mergeItem(base, over);
}
