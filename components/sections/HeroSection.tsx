"use client";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { TigerWatermark } from "@/components/motion/TigerWatermark";
import { COMPANY_INFO } from "@/lib/constants";

const words = COMPANY_INFO.tagline.split(" ");

export function HeroSection() {
  return (
    <section id="beranda" className="relative flex min-h-screen items-center overflow-hidden">
      <TigerWatermark className="absolute inset-0 flex items-center justify-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep via-navy-deep/95 to-navy-elevated" />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-sm uppercase tracking-[0.3em] text-gold-heritage"
        >
          {COMPANY_INFO.name}
        </motion.p>

        <h1 className="font-display text-4xl leading-tight text-cream sm:text-6xl md:text-7xl">
          {words.map((w, i) => (
            <motion.span
              key={`${w}-${i}`}
              initial={{ y: 18 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.07 }}
              className="mr-3 inline-block"
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto my-8 h-px w-40 origin-center bg-gold-heritage"
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <MagneticButton
            href="#kontak"
            className="inline-block rounded-full bg-gold-heritage px-8 py-4 font-medium text-navy-deep transition-colors hover:bg-gold-bright"
          >
            Hubungi Kami
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
