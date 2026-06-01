"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function TigerWatermark({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <motion.img
        src="/tiger-silhouette.svg"
        alt=""
        style={{ y }}
        className="pointer-events-none select-none opacity-[0.06]"
      />
    </div>
  );
}
