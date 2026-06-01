import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { WHY_US } from "@/lib/constants";
import { icons } from "lucide-react";

export function WhyUsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <p className="text-sm uppercase tracking-[0.25em] text-gold-heritage">Mengapa Memilih Kami</p>
        <h2 className="mt-4 font-display text-3xl text-cream md:text-4xl">Keunggulan yang Kami Tawarkan</h2>
      </Reveal>

      <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {WHY_US.map((w) => {
          const Icon = icons[w.icon as keyof typeof icons];
          return (
            <StaggerItem key={w.id}>
              <div className="h-full rounded-lg border border-gold-heritage/20 bg-navy-elevated p-7">
                <div className="mb-4 text-gold-heritage">{Icon ? <Icon className="h-7 w-7" /> : null}</div>
                {w.stat && (
                  <p className="font-display text-3xl text-gold-bright">
                    <Counter value={w.stat.value} suffix={w.stat.suffix} />
                  </p>
                )}
                <h3 className="mt-2 font-display text-lg text-cream">{w.title}</h3>
                <p className="mt-2 text-sm text-cream-muted">{w.description}</p>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
