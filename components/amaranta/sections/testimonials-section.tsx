"use client"

import * as React from "react"
import { type Testimonio } from "@/types"
import { Star } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const TESTIMONIOS_MOCK: Testimonio[] = [
  {
    id: "1",
    nombre: "Alejandra Gómez",
    edad: 34,
    tipoViaje: "Familiar",
    avatarUrl: "/assets/avatar1.jpg",
    calificacion: 5,
    comentario: "El viaje a Isla de Coche fue impecable. Mis hijos disfrutaron la recreación a bordo y el almuerzo estuvo exquisito. ¡Recomendados con los ojos cerrados!"
  },
  {
    id: "2",
    nombre: "Roberto & María",
    edad: 29,
    tipoViaje: "En Pareja",
    avatarUrl: "/assets/avatar2.jpg",
    calificacion: 5,
    comentario: "Cubagua VIP superó las expectativas. Muy exclusivo, el snorkeling fue increíble y la atención personalizada de la tripulación te hace sentir VIP."
  },
  {
    id: "3",
    nombre: "Carlos Mendoza",
    edad: 42,
    tipoViaje: "Solo / Aventura",
    avatarUrl: "/assets/avatar3.jpg",
    calificacion: 5,
    comentario: "El Jeep Safari a Macanao es una aventura obligatoria. Guías super preparados que conocen de historia y geografía. Atardecer espectacular."
  }
]

export default function TestimonialsSection() {
  return (
    <section
      className="py-16 bg-[#F5F5F3]"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#044C9C] text-xs font-black uppercase tracking-widest bg-[#449CFC]/10 px-3 py-1 rounded-full">
            Testimonios
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 mt-3 tracking-tight">
            Opiniones de Nuestros Viajeros
          </h2>
          <p className="text-sm text-slate-700 mt-2">
            La mejor garantía son los miles de turistas que viajan con nosotros cada temporada.
          </p>
        </div>

        {/* Carousel Wrapper */}
        <div className="max-w-4xl mx-auto px-4 md:px-12 relative">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent>
              {TESTIMONIOS_MOCK.map((t) => (
                <CarouselItem key={t.id} className="md:basis-1/2 lg:basis-1/2 p-2">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4 flex flex-col justify-between h-full">
                    
                    {/* Stars */}
                    <div className="flex gap-1 text-[#FBB343]">
                      {Array.from({ length: t.calificacion }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>

                    {/* Commentary */}
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed italic flex-1">
                      &ldquo;{t.comentario}&rdquo;
                    </p>

                    {/* Reviewer Details */}
                    <div className="flex items-center gap-3 pt-3 border-t border-slate-200/50">
                      <div className="h-10 w-10 bg-[#044C9C]/10 rounded-full flex items-center justify-center font-bold text-[#044C9C] text-sm shrink-0">
                        {t.nombre[0]}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-xs text-slate-900">{t.nombre}</h4>
                        <span className="text-[10px] text-slate-400 font-bold block">
                          Viaje: {t.tipoViaje}
                        </span>
                      </div>
                    </div>

                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Buttons hidden on mobile, visible on desktop */}
            <div className="hidden md:block">
              <CarouselPrevious className="border-[#044C9C] text-[#044C9C]" />
              <CarouselNext className="border-[#044C9C] text-[#044C9C]" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
