import { COMPANY_INFO } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-gold-heritage/20 bg-navy-elevated">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <h3 className="font-display text-xl text-cream">{COMPANY_INFO.name}</h3>
          <p className="mt-3 text-sm text-cream-muted">{COMPANY_INFO.address}</p>
        </div>
        <div className="text-sm text-cream-muted">
          <p>Telp: {COMPANY_INFO.phone}</p>
          <p>Email: {COMPANY_INFO.email}</p>
        </div>
        <div className="text-sm text-cream-muted">
          <p className="text-gold-heritage">Legalitas</p>
          <p className="mt-2">Kemenkumham: {COMPANY_INFO.kemenkumhamNo}</p>
          <p>NPWP: {COMPANY_INFO.npwp}</p>
        </div>
      </div>
      <div className="border-t border-gold-heritage/10 py-5 text-center text-xs text-cream-muted">
        © {COMPANY_INFO.foundedYear} {COMPANY_INFO.name}. Seluruh hak cipta dilindungi.
      </div>
    </footer>
  );
}
