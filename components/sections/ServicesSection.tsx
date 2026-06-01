import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { Reveal } from "@/components/motion/Reveal";
import { SERVICES } from "@/lib/constants";
import { icons } from "lucide-react";

export function ServicesSection() {
  return (
    <section id="layanan" className="bg-navy-elevated py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.25em] text-gold-heritage">Layanan Kami</p>
          <h2 className="mt-4 font-display text-3xl text-cream md:text-4xl">Lima Kategori Pengelolaan Aset</h2>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const Icon = icons[s.icon as keyof typeof icons];
            return (
              <StaggerItem key={s.id}>
                <div className="group h-full rounded-lg border border-gold-heritage/20 bg-navy-deep p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold-heritage hover:shadow-lg hover:shadow-gold-heritage/10">
                  <div className="mb-5 inline-flex rounded-md border border-gold-heritage/30 p-3 text-gold-heritage transition-colors group-hover:bg-gold-heritage group-hover:text-navy-deep">
                    {Icon ? <Icon className="h-6 w-6" /> : null}
                  </div>
                  <h3 className="font-display text-xl text-cream">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream-muted">{s.description}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
