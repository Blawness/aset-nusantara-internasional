"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { COMPANY_INFO } from "@/lib/constants";

type Status = "idle" | "loading" | "success" | "error";

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactInput) {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputCls =
    "w-full rounded-md border border-gold-heritage/30 bg-navy-deep px-4 py-3 text-cream placeholder:text-cream-muted/60 focus:border-gold-heritage focus:outline-none";

  return (
    <section id="kontak" className="bg-navy-elevated py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.25em] text-gold-heritage">Kontak</p>
          <h2 className="mt-4 font-display text-3xl text-cream md:text-4xl">Hubungi Kami</h2>
          <p className="mt-4 text-cream-muted">
            Sampaikan kebutuhan Anda terkait pengelolaan dan pemulihan aset. Tim kami akan merespons
            secepatnya.
          </p>
          <div className="mt-8 space-y-5">
            <div className="flex gap-4">
              <MapPin className="h-5 w-5 shrink-0 text-gold-heritage" />
              <span className="text-cream-muted">{COMPANY_INFO.address}</span>
            </div>
            <div className="flex gap-4">
              <Phone className="h-5 w-5 shrink-0 text-gold-heritage" />
              <span className="text-cream-muted">{COMPANY_INFO.phone}</span>
            </div>
            <div className="flex gap-4">
              <Mail className="h-5 w-5 shrink-0 text-gold-heritage" />
              <span className="text-cream-muted">{COMPANY_INFO.email}</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input className={inputCls} placeholder="Nama lengkap" aria-label="Nama lengkap" {...register("name")} />
              {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
            </div>
            <div>
              <input className={inputCls} placeholder="Email" aria-label="Email" {...register("email")} />
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
            </div>
            <div>
              <input className={inputCls} placeholder="Nomor WA / Telepon (opsional)" aria-label="Nomor WA atau Telepon" {...register("phone")} />
            </div>
            <div>
              <textarea rows={5} className={inputCls} placeholder="Pesan / kebutuhan Anda" aria-label="Pesan" {...register("message")} />
              {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>}
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-full bg-gold-heritage px-8 py-4 font-medium text-navy-deep transition-colors hover:bg-gold-bright disabled:opacity-60"
            >
              {status === "loading" ? "Mengirim..." : "Kirim Pesan"}
            </button>
            {status === "success" && (
              <p className="text-center text-sm text-gold-heritage">
                Terima kasih, pesan Anda telah terkirim. Kami akan segera menghubungi Anda.
              </p>
            )}
            {status === "error" && (
              <p className="text-center text-sm text-red-400">
                Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi kami via email.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
