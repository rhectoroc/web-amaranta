"use client"

import * as React from "react"
import { Anchor, ShieldAlert, Award, Star } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyAmaranta() {
  const containerRef = React.useRef<HTMLElement>(null)

  const valueProps = [
    {
      icon: <Anchor className="h-6 w-6 text-[#044C9C]" />,
      title: "Flota de Catamaranes Propios",
      desc: "Navega con seguridad y el mayor confort. Mantenimiento y personal certificado bajo estándares internacionales."
    },
    {
      icon: <Award className="h-6 w-6 text-[#044C9C]" />,
      title: "Guías VIP Locales",
      desc: "Anfitriones apasionados que conocen cada secreto histórico y natural de las islas para brindarte un viaje inmersivo."
    },
    {
      icon: <ShieldAlert className="h-6 w-6 text-[#044C9C]" />,
      title: "Reserva y Reprogramación Sin Costo",
      desc: "Entendemos que el clima o los planes cambian. Ofrecemos reprogramación flexible garantizada sin penalizaciones."
    },
    {
      icon: <Star className="h-6 w-6 text-[#044C9C]" />,
      title: "Atención Concierge 24/7",
      desc: "Desde que cotizas hasta que retornas a tu hotel, cuentas con asistencia exclusiva para cualquier requerimiento."
    }
  ]

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      }
    });

    tl.from(".why-header", {
      opacity: 0,
      x: -40,
      duration: 0.8,
      ease: "power2.out",
    })
    .from(".why-card", {
      opacity: 0,
      y: 35,
      duration: 0.7,
      stagger: 0.12,
      ease: "power2.out",
    }, "-=0.5");
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="py-16 bg-[#F5F5F3] border-t border-slate-200/50"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Header Copy */}
          <div className="why-header lg:col-span-5 space-y-6">
            <span className="text-[#044C9C] text-xs font-black uppercase tracking-widest bg-[#449CFC]/10 px-3 py-1 rounded-full">
              Diferencia Amaranta
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              ¿Por qué los viajeros exigentes eligen AMARANTA?
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed font-normal">
              Somos especialistas en el Caribe venezolano, transformando destinos icónicos como la Isla de Margarita, Coche y Cubagua en escenarios de viajes hechos a mano y adaptados a las más altas exigencias del turista actual. Cuidamos cada aspecto de la logística y el confort para que tu única ocupación sea conectar con el entorno.
            </p>
          </div>

          {/* Proposition Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {valueProps.map((prop, idx) => (
              <div
                key={idx}
                className="why-card bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-3"
              >
                <div className="p-3 bg-[#449CFC]/10 rounded-xl w-fit">
                  {prop.icon}
                </div>
                <h3 className="font-extrabold text-sm text-[#044C9C] tracking-tight">{prop.title}</h3>
                <p className="text-xs text-slate-700 leading-relaxed">{prop.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
