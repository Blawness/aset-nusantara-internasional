"use client";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef } from "react";
import { BadgeCheck, CalendarDays, Globe, ChevronDown } from "lucide-react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { COMPANY_INFO } from "@/lib/constants";

const words = COMPANY_INFO.tagline.split(" ");
// Highlight these words in heritage gold for emphasis.
const accent = new Set(["Aset", "Bangsa"]);

const trust = [
  { icon: BadgeCheck, label: "Terdaftar Resmi Kemenkumham RI" },
  { icon: CalendarDays, label: `Est. ${COMPANY_INFO.foundedYear}` },
  { icon: Globe, label: "Jangkauan Nasional" },
];

// Subtle film-grain overlay (inline SVG turbulence — no asset request).
const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function HeroSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: emblem lags behind, content drifts up and fades as you scroll past.
  const emblemY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const emblemScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Pointer parallax: layers drift with the cursor for added depth.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 120, damping: 18, mass: 0.4 };
  const emblemPX = useSpring(useTransform(px, [-0.5, 0.5], [28, -28]), spring);
  const emblemPY = useSpring(useTransform(py, [-0.5, 0.5], [28, -28]), spring);
  const spotPX = useSpring(useTransform(px, [-0.5, 0.5], [-40, 40]), spring);
  const spotPY = useSpring(useTransform(py, [-0.5, 0.5], [-40, 40]), spring);

  function onPointer(e: React.PointerEvent) {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }
  function resetPointer() {
    px.set(0);
    py.set(0);
  }

  return (
    <section
      ref={ref}
      id="beranda"
      onPointerMove={onPointer}
      onPointerLeave={resetPointer}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep via-navy-deep to-navy-elevated" />

      {/* Gold spotlight behind the headline */}
      <motion.div
        className="absolute inset-[-10%]"
        style={{
          x: reduce ? 0 : spotPX,
          y: reduce ? 0 : spotPY,
          background:
            "radial-gradient(ellipse 70% 55% at 50% 38%, rgba(201,162,75,0.13), transparent 70%)",
        }}
      />

      {/* Ghost emblem anchor */}
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { y: emblemY, scale: emblemScale }}
        className="pointer-events-none absolute left-1/2 top-1/2 w-[min(78vw,640px)] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div style={reduce ? undefined : { x: emblemPX, y: emblemPY }}>
          <motion.img
            src="/logo-ani.webp"
            alt=""
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 0.07, scale: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full select-none"
          />
        </motion.div>
      </motion.div>

      {/* Film grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-soft-light"
        style={{ backgroundImage: grain }}
      />

      {/* Edge vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 45%, transparent 55%, rgba(10,22,40,0.85))",
        }}
      />

      {/* Content */}
      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative mx-auto max-w-5xl px-6 text-center"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-7 flex items-center justify-center gap-4"
        >
          <span className="h-px w-8 bg-gold-heritage/50" />
          <span className="text-xs uppercase tracking-[0.32em] text-gold-heritage sm:text-sm">
            {COMPANY_INFO.name}
          </span>
          <span className="h-px w-8 bg-gold-heritage/50" />
        </motion.div>

        {/* Headline */}
        <h1 className="font-display text-4xl leading-[1.1] text-cream sm:text-6xl md:text-7xl">
          {words.map((w, i) => (
            <motion.span
              key={`${w}-${i}`}
              initial={{ y: 22, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className={`mr-3 inline-block ${accent.has(w) ? "text-gold-heritage" : ""}`}
            >
              {w}
            </motion.span>
          ))}
        </h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mx-auto my-8 h-px w-40 origin-center bg-gold-heritage"
        />

        {/* Mission */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mx-auto max-w-3xl text-base leading-relaxed text-cream-muted sm:text-lg"
        >
          Institusi terpercaya dalam pemulihan dan pemanfaatan aset bangsa — bergerak,
          tidak bergerak, warisan, sitaan negara, hingga collateral — dengan integritas
          dan legalitas resmi.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <MagneticButton
            href="/kontak"
            className="inline-block rounded-full bg-gold-heritage px-8 py-4 font-medium text-navy-deep shadow-lg shadow-gold-heritage/20 transition-colors hover:bg-gold-bright"
          >
            Hubungi Kami
          </MagneticButton>
          <MagneticButton
            href="/layanan"
            className="inline-block rounded-full border border-gold-heritage/40 px-8 py-4 font-medium text-cream transition-colors hover:border-gold-heritage hover:text-gold-bright"
          >
            Pelajari Layanan
          </MagneticButton>
        </motion.div>

        {/* Trust strip */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-cream-muted sm:text-sm"
        >
          {trust.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-gold-heritage" />
              <span>{label}</span>
            </li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute inset-x-0 bottom-8 flex justify-center"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-gold-heritage/60"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
