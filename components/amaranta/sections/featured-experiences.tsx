"use client"

import * as React from "react"
import Image from "next/image"
import { useUIStore } from "@/store/use-ui-store"
import { type Excursion } from "@/types"
import { Calendar, Clock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const EXCURSIONES_MOCK: Excursion[] = [
  {
    id: "coche-premium",
    slug: "coche-premium",
    titulo: "Full Day Isla de Coche Premium",
    precioDesde: 85,
    duracion: "8 horas",
    tipoViaje: "familiar",
    imagenUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600&auto=format&fit=crop",
    beneficios: ["Traslado en Catamarán", "Almuerzo Buffet", "Open Bar nacional", "Actividades recreativas"]
  },
  {
    id: "cubagua-vip",
    slug: "cubagua-vip",
    titulo: "Aventura VIP Isla de Cubagua",
    precioDesde: 95,
    duracion: "9 horas",
    tipoViaje: "pareja",
    imagenUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
    beneficios: ["Catamarán exclusivo", "Paseo de barro medicinal", "Snorkeling guiado", "Club de playa VIP"]
  },
  {
    id: "jeep-safari",
    slug: "jeep-safari",
    titulo: "Jeep Safari 4x4 Extremo",
    precioDesde: 65,
    duracion: "7 horas",
    tipoViaje: "solo",
    imagenUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600&auto=format&fit=crop",
    beneficios: ["Vehículo 4x4 abierto", "Guía bilingüe certificado", "Almuerzo criollo en la playa", "Atardecer en Macanao"]
  },
  {
    id: "yate-privado-grupos",
    slug: "yate-privado-grupos",
    titulo: "Día de Yate Privado en Margarita",
    precioDesde: 150,
    duracion: "8 horas",
    tipoViaje: "grupos",
    imagenUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=600&auto=format&fit=crop",
    beneficios: ["Yate de lujo exclusivo", "Chef a bordo", "Deportes acuáticos", "Barra libre Premium"]
  }
]

export default function FeaturedExperiences() {
  const { selectedTravelType, setWhatsAppModalOpen } = useUIStore()

  const filteredExcursiones = React.useMemo(() => {
    if (!selectedTravelType) return EXCURSIONES_MOCK
    return EXCURSIONES_MOCK.filter((exc) => exc.tipoViaje === selectedTravelType)
  }, [selectedTravelType])

  return (
    <section
      id="excursiones"
      className="py-16 bg-[#F5F5F3] scroll-mt-28"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#044C9C] text-xs font-black uppercase tracking-widest bg-[#449CFC]/10 px-3 py-1 rounded-full">
            Nuestras Experiencias
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 mt-3 tracking-tight">
            Los Destinos Más Deseados del Caribe
          </h2>
          <p className="text-sm text-slate-700 mt-2">
            Operados localmente con atención exclusiva de principio a fin. Sin sorpresas al reservar.
          </p>
        </div>

        {/* Excursions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredExcursiones.map((excursion) => (
            <div
              key={excursion.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-slate-200/60 transition-all duration-300 flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative h-48 w-full overflow-hidden shrink-0">
                <Image
                  src={excursion.imagenUrl}
                  alt={excursion.titulo}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10 bg-[#044C9C] text-white text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                  {excursion.tipoViaje}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-grow justify-between bg-white space-y-4">
                <div>
                  <h3 className="font-black text-base md:text-lg text-slate-900 leading-snug mb-2">
                    {excursion.titulo}
                  </h3>

                  {/* Duration & Availability */}
                  <div className="flex gap-4 text-xs text-slate-600 font-bold border-b border-slate-100 pb-3 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-[#044C9C]" /> {excursion.duracion}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-[#044C9C]" /> Diarios
                    </span>
                  </div>

                  {/* Benefit List */}
                  <ul className="space-y-2">
                    {excursion.beneficios.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <Sparkles className="h-3 w-3 text-[#044C9C] shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Pricing & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] uppercase text-slate-500 block font-bold">Desde</span>
                    <span className="text-xl font-black text-[#044C9C]">${excursion.precioDesde}</span>
                    <span className="text-[10px] text-slate-500 font-bold"> / p.p.</span>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setWhatsAppModalOpen(true)}
                    className="font-bold text-xs rounded-full bg-[#044C9C] text-white hover:bg-[#033a78] shadow-md px-4 h-9"
                  >
                    Cotizar VIP
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
