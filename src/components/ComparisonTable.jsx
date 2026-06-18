import { Check, X } from 'lucide-react';
import { comparisonRows } from '../data/packages';

function Cell({ value }) {
  if (value === true)
    return <Check className="mx-auto h-5 w-5 text-teal" aria-label="Included" />;
  if (value === false)
    return <X className="mx-auto h-5 w-5 text-gray/60" aria-label="Not included" />;
  return <span className="text-sm font-medium text-yellow">{value}</span>;
}

export default function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-mid">
      <table className="w-full min-w-[560px] border-collapse text-center">
        <caption className="sr-only">Package comparison across Mate, Pirate and Captain</caption>
        <thead>
          <tr className="bg-dark-3">
            <th scope="col" className="p-4 text-start font-body text-xs uppercase tracking-wide text-gray">
              Feature
            </th>
            <th scope="col" className="p-4 font-display text-xl uppercase text-ink">Mate</th>
            <th scope="col" className="p-4 font-display text-xl uppercase text-teal">
              Pirate
            </th>
            <th scope="col" className="p-4 font-display text-xl uppercase text-ink">Captain</th>
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map((row, i) => (
            <tr key={row.label} className={i % 2 ? 'bg-dark-2' : 'bg-dark'}>
              <th scope="row" className="p-3 text-start text-sm font-normal text-gray-light">
                {row.label}
              </th>
              <td className="p-3"><Cell value={row.mate} /></td>
              <td className="bg-teal/5 p-3"><Cell value={row.pirate} /></td>
              <td className="p-3"><Cell value={row.captain} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
