import { ShieldCheck, FileCheck, CalendarCheck } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "Terdaftar Kemenkumham RI" },
  { icon: FileCheck, label: "NPWP Resmi Terdaftar" },
  { icon: CalendarCheck, label: "Berdiri Sejak 2026" },
];

export function TrustBar() {
  return (
    <div className="border-y border-gold-heritage/20 bg-navy-elevated">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-6 px-6 py-6 sm:flex-row sm:gap-12">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3 text-cream-muted">
            <Icon className="h-5 w-5 text-gold-heritage" />
            <span className="text-sm">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
