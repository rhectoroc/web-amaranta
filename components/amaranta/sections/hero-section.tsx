"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUIStore } from "@/store/use-ui-store"
import ExpressQuoteForm from "@/components/amaranta/express-quote-form"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

export default function HeroSection() {
  const { setWhatsAppModalOpen } = useUIStore()
  const containerRef = React.useRef<HTMLElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".hero-title", {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
    .from(".hero-subtitle", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.6")
    .from(".hero-cta", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out",
    }, "-=0.4")
    .from(".hero-form", {
      y: 35,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.3");
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-slate-950">

      {/* ── VIDEO DE FONDO ── */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/Hero Amaranta.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop"
      />

      {/* ── OVERLAY: oscurece el video para legibilidad del texto ── */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-slate-950/60 via-slate-950/50 to-slate-950/80" />

      {/* ── DESTELLOS DECORATIVOS (encima del overlay, debajo del contenido) ── */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#449CFC]/10 rounded-full blur-3xl z-[2]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FBB343]/5 rounded-full blur-3xl z-[2]" />

      {/* ── CONTENIDO ── */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col gap-10">

          {/* COPYWRITING WRAPPER */}
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            {/* Main Title — uppercase, thin & elegant */}
            <h1 className="hero-title text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight tracking-[0.12em] uppercase">
              Experiencias Premium en el Caribe
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-xs md:text-sm text-slate-300 font-light tracking-widest uppercase leading-relaxed">
              Planifiquemos hoy tu escape VIP en Venezuela y el Caribe
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => setWhatsAppModalOpen(true)}
                className="hero-cta w-full sm:w-auto h-13 px-8 font-black text-base flex justify-center items-center gap-2"
              >
                Planificar en WhatsApp <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="hero-cta w-full sm:w-auto h-13 px-8 border-white/20 hover:bg-white/10 text-white"
              >
                <Link href="#excursiones">
                  Ver Excursiones
                </Link>
              </Button>
            </div>


          </div>

          {/* FORM WRAPPER */}
          <div className="hero-form w-full">
            <ExpressQuoteForm />
          </div>

        </div>
      </div>
    </section>
  )
}
