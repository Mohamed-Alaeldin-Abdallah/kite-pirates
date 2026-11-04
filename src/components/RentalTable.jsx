/** Clean equipment-rental pricing list. Duration left, price right, hairlines. */
export default function RentalTable({ rentals, labelDuration = 'Duration', labelPrice = 'Price' }) {
  return (
    <div className="mx-auto max-w-2xl overflow-hidden rounded-lg border border-mid">
      <div className="flex items-center justify-between border-b border-mid bg-dark-3 px-5 py-3 sm:px-6">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray">{labelDuration}</span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gray">{labelPrice}</span>
      </div>
      <ul className="divide-y divide-mid">
        {rentals.map((r) => (
          <li key={r.label} className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5">
            <span className="text-base text-ink">{r.label}</span>
            <span className="font-display text-2xl text-ocean sm:text-3xl">€{r.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
