import Link from "next/link";
import { COMPANY_INFO } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-gold-heritage/20 bg-navy-elevated">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-4">
        <div>
          <h3 className="font-display text-xl text-cream">{COMPANY_INFO.name}</h3>
          <p className="mt-3 text-sm text-cream-muted">{COMPANY_INFO.address}</p>
        </div>
        <div className="text-sm text-cream-muted">
          <p className="text-gold-heritage">Navigasi</p>
          <ul className="mt-2 space-y-1">
            <li><Link href="/tentang" className="hover:text-gold-heritage">Tentang</Link></li>
            <li><Link href="/layanan" className="hover:text-gold-heritage">Layanan</Link></li>
            <li><Link href="/artikel" className="hover:text-gold-heritage">Artikel</Link></li>
            <li><Link href="/kontak" className="hover:text-gold-heritage">Kontak</Link></li>
          </ul>
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
