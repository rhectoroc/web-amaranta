"use client"

import * as React from "react"
import { useUIStore } from "@/store/use-ui-store"
import { Users, Heart, ShieldAlert, Sparkles, UserPlus } from "lucide-react"

export default function TravelStyleFilters() {
  const { selectedTravelType, setSelectedTravelType } = useUIStore()

  const categories = [
    { id: null, label: "Todos", icon: <Sparkles className="h-4 w-4" /> },
    { id: "pareja", label: "Parejas", icon: <Heart className="h-4 w-4" /> },
    { id: "familiar", label: "Familias", icon: <Users className="h-4 w-4" /> },
    { id: "grupos", label: "Grupos", icon: <UserPlus className="h-4 w-4" /> },
    { id: "solo", label: "Solo", icon: <ShieldAlert className="h-4 w-4" /> },
  ] as const

  return (
    <section
      id="paquetes"
      className="bg-[#F5F5F3] border-b border-slate-200 scroll-mt-28"
    >
      <div className="container mx-auto flex flex-col items-center gap-10 py-20 px-4">

        {/* Bloque de texto central */}
        <div className="text-center max-w-4xl flex flex-col gap-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-slate-900 leading-tight tracking-[0.12em] uppercase">
            Cada viaje comienza con una emoción
          </h2>
          
          <div className="space-y-6 text-sm md:text-base text-slate-600 font-light leading-relaxed">
            <p>
              En Amaranta Viajes creamos experiencias de turismo premium a la medida, con itinerarios completamente personalizados; aquí no existen las plantillas ni los paquetes prefabricados. Ya seas una pareja que busca romance y desconexión, una familia que desea coleccionar momentos inolvidables o un viajero solitario en busca de una aventura extraordinaria, diseñamos cada detalle exclusivamente para ti.
            </p>

            <p className="font-light tracking-widest uppercase text-xs pt-4 text-slate-900">
              Así que, comencemos. Diseñemos juntos algo extraordinario.
            </p>
          </div>
        </div>

        {/* Categories Chips */}
        <div className="flex gap-2 max-w-full overflow-x-auto px-4 pb-2 scrollbar-hide snap-x">
          {categories.map((cat) => {
            const isActive = selectedTravelType === cat.id
            return (
              <button
                key={String(cat.id)}
                onClick={() => setSelectedTravelType(cat.id)}
                className={`flex items-center gap-2 px-4 py-3 md:py-2.5 rounded-full text-xs font-bold transition-all shrink-0 snap-start active:scale-95 border shadow-sm ${
                  isActive
                    ? "bg-[#044C9C] text-white border-[#044C9C] shadow-blue-900/20"
                    : "bg-white text-slate-800 border-slate-300 hover:border-[#044C9C] hover:text-[#044C9C]"
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
