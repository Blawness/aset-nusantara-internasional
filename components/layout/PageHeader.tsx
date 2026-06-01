import { Reveal } from "@/components/motion/Reveal";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-gold-heritage/15 bg-navy-elevated pb-12 pt-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          {eyebrow && (
            <p className="text-sm uppercase tracking-[0.25em] text-gold-heritage">{eyebrow}</p>
          )}
          <h1 className="mt-3 font-display text-4xl text-cream md:text-5xl">{title}</h1>
          <div className="mt-5 h-px w-24 bg-gold-heritage" />
          {description && <p className="mt-5 max-w-2xl text-cream-muted">{description}</p>}
        </Reveal>
      </div>
    </section>
  );
}
