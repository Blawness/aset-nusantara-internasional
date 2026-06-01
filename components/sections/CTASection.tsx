import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export function CTASection({
  title = "Siap bekerja sama dengan kami?",
  buttonLabel = "Hubungi Kami",
  href = "/kontak",
}: {
  title?: string;
  buttonLabel?: string;
  href?: string;
}) {
  return (
    <section className="bg-navy-deep py-24">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <div className="rounded-2xl border border-gold-heritage/30 bg-gradient-to-br from-navy-elevated to-navy-deep p-10 text-center md:p-14">
            <h2 className="font-display text-3xl text-cream md:text-4xl">{title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-cream-muted">
              Sampaikan kebutuhan Anda terkait pemulihan dan pemanfaatan aset. Tim kami siap membantu.
            </p>
            <Link
              href={href}
              className="mt-8 inline-block rounded-full bg-gold-heritage px-8 py-4 font-medium text-navy-deep transition-colors hover:bg-gold-bright"
            >
              {buttonLabel}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
