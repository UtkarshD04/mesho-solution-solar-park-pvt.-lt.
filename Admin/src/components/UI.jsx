const THEME = "#033e74";
const TEAL = "#20b2aa";

export function SectionHeader({ label, title }) {
  return (
    <div className="relative pl-5 mb-6">
      <div className="absolute left-0 top-0.5 h-full w-[3px] rounded-full" style={{ background: TEAL }} />
      <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-0.5" style={{ color: TEAL }}>{label}</p>
      <h2 className="text-base font-black uppercase text-gray-900 tracking-wide">{title}</h2>
    </div>
  );
}

export function PageShell({ label, title, children }) {
  return (
    <div className="space-y-6">
      <SectionHeader label={label} title={title} />
      {children}
    </div>
  );
}

export function Table({ headers, rows, renderRow }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {headers.map((h) => (
                <th key={h} className="text-left text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {rows.map((row, i) => renderRow(row, i))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ActionButton({ onClick, children, variant = "primary" }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
      style={variant === "primary"
        ? { background: `linear-gradient(135deg, ${THEME}, #0a5a9e)`, color: "#fff" }
        : { background: "#f1f5f9", color: "#475569" }
      }
    >
      {children}
    </button>
  );
}
