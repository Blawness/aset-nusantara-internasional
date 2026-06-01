import { Reveal } from "@/components/motion/Reveal";
import { COMPANY_INFO } from "@/lib/constants";

const misi = [
  "Mengelola dan memulihkan aset bergerak maupun tidak bergerak secara profesional dan sesuai hukum.",
  "Menjaga dan memanfaatkan aset peninggalan warisan serta aset negara demi kepentingan bangsa.",
  "Memberikan solusi penanganan aset sitaan, bank likuidasi, dan collateral secara akuntabel.",
  "Membangun kepercayaan klien, mitra, dan negara melalui integritas dan kepatuhan legalitas.",
];

export function AboutSection() {
  return (
    <section id="tentang" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <p className="text-sm uppercase tracking-[0.25em] text-gold-heritage">Tentang Kami</p>
        <h2 className="mt-4 max-w-3xl font-display text-3xl text-cream md:text-4xl">
          Institusi terpercaya dalam pemulihan dan pemanfaatan aset bangsa.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-12 md:grid-cols-2">
        <Reveal delay={0.1}>
          <h3 className="font-display text-2xl text-gold-heritage">Visi</h3>
          <p className="mt-4 text-cream-muted">
            Menjadi institusi terpercaya dalam pemulihan dan pemanfaatan aset nasional, yang
            menjunjung tinggi legalitas, transparansi, dan nilai kebangsaan.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <h3 className="font-display text-2xl text-gold-heritage">Misi</h3>
          <ul className="mt-4 space-y-3">
            {misi.map((m) => (
              <li key={m} className="flex gap-3 text-cream-muted">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-heritage" />
                {m}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="mt-16 grid gap-6 rounded-lg border border-gold-heritage/20 bg-navy-elevated p-8 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-cream-muted">Domisili</p>
            <p className="mt-1 text-cream">{COMPANY_INFO.address}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-cream-muted">Legalitas Kemenkumham</p>
            <p className="mt-1 text-cream">{COMPANY_INFO.kemenkumhamNo}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-cream-muted">NPWP</p>
            <p className="mt-1 text-cream">{COMPANY_INFO.npwp}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
