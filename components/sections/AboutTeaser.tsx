import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

export function AboutTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <p className="text-sm uppercase tracking-[0.25em] text-gold-heritage">Tentang Kami</p>
        <h2 className="mt-4 max-w-3xl font-display text-3xl text-cream md:text-4xl">
          Institusi terpercaya dalam pemulihan dan pemanfaatan aset bangsa.
        </h2>
        <p className="mt-5 max-w-2xl text-cream-muted">
          PT Aset Nusantara Internasional bergerak di bidang pemanfaatan dan pemulihan aset —
          bergerak, tidak bergerak, warisan, sitaan negara, hingga collateral bangsa — dengan
          menjunjung legalitas, transparansi, dan nilai kebangsaan.
        </p>
        <Link
          href="/tentang"
          className="mt-7 inline-flex items-center gap-2 rounded-full border border-gold-heritage px-6 py-3 text-sm text-gold-heritage transition-colors hover:bg-gold-heritage hover:text-navy-deep"
        >
          Selengkapnya tentang kami
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </section>
  );
}
