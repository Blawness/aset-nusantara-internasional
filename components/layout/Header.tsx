"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, COMPANY_INFO } from "@/lib/constants";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-deep/85 py-3 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a href="#beranda" className="flex items-center gap-3">
          <img src="/logo-ani.svg" alt={COMPANY_INFO.name} className="h-10 w-auto" />
          <span className="hidden font-display text-base leading-tight text-cream sm:block md:text-lg">
            {COMPANY_INFO.name}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-cream-muted transition-colors hover:text-gold-heritage">
              {l.label}
            </a>
          ))}
          <a href="#kontak" className="rounded-full border border-gold-heritage px-5 py-2 text-sm text-gold-heritage transition-colors hover:bg-gold-heritage hover:text-navy-deep">
            Hubungi Kami
          </a>
        </nav>

        <button className="text-cream md:hidden" onClick={() => setOpen(true)} aria-label="Buka menu">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-navy-deep/98 backdrop-blur md:hidden">
          <div className="flex justify-end p-6">
            <button onClick={() => setOpen(false)} aria-label="Tutup menu" className="text-cream">
              <X className="h-7 w-7" />
            </button>
          </div>
          <nav className="flex flex-col items-center gap-8 pt-12">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="font-display text-2xl text-cream">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
