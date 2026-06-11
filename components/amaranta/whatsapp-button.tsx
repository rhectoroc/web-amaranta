"use client"

import * as React from "react"
import { MessageSquare, Heart, Users, Briefcase, HelpCircle } from "lucide-react"
import { useUIStore } from "@/store/use-ui-store"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function WhatsAppButton() {
  const { isWhatsAppModalOpen, setWhatsAppModalOpen } = useUIStore()

  const contactOptions = [
    {
      icon: <Heart className="h-5 w-5 text-pink-500" />,
      title: "Viaje en Pareja o Luna de Miel",
      desc: "Planes románticos y exclusividad en Margarita, Coche y Cubagua.",
      text: "¡Hola! Quisiera información y tarifas especiales para planificar un viaje en pareja de ensueño. ❤️",
    },
    {
      icon: <Users className="h-5 w-5 text-blue-500" />,
      title: "Viaje Familiar",
      desc: "Paquetes con todo incluido ideales para el disfrute de niños y adultos.",
      text: "¡Hola! Estoy organizando unas vacaciones familiares y me gustaría conocer los paquetes recomendados. 👨‍👩‍👧‍👦",
    },
    {
      icon: <Briefcase className="h-5 w-5 text-amber-500" />,
      title: "Corporativos y Eventos",
      desc: "Servicios VIP para empresas, congresos, y celebraciones grupales.",
      text: "¡Hola! Requiero cotización formal para un grupo corporativo o evento corporativo en Margarita. 💼",
    },
    {
      icon: <HelpCircle className="h-5 w-5 text-slate-500" />,
      title: "Soporte y Reservas Existentes",
      desc: "Consultas generales sobre tu itinerario, reprogramaciones o pagos.",
      text: "¡Hola! Necesito soporte o información acerca de una reserva existente con ustedes. ℹ️",
    },
  ]

  const handleOptionClick = (optionText: string) => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "584140000000"
    const encodedText = encodeURIComponent(optionText)
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedText}`
    
    setWhatsAppModalOpen(false)
    window.open(whatsappUrl, "_blank")
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setWhatsAppModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 group flex items-center justify-center"
        aria-label="Contactar por WhatsApp"
      >
        <MessageSquare className="h-6 w-6 fill-current" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 font-bold text-sm whitespace-nowrap transition-all duration-300">
          Chatea con nosotros
        </span>
      </button>

      {/* Segmented Dialog Modal */}
      <Dialog open={isWhatsAppModalOpen} onOpenChange={setWhatsAppModalOpen}>
        <DialogContent className="max-w-md w-[95%] p-5 md:p-6 bg-slate-900 border border-slate-800 text-white rounded-2xl">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-bold text-[#FBB343]">¿Cómo podemos ayudarte hoy?</DialogTitle>
            <DialogDescription className="text-slate-400 text-xs">
              Elige el motivo de tu consulta para conectarte con el asesor experto indicado.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3">
            {contactOptions.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionClick(opt.text)}
                className="flex items-start gap-4 p-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-800 hover:border-[#3C9CFC]/30 rounded-xl transition-all duration-200 text-left w-full group"
              >
                <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg group-hover:border-[#3C9CFC]/20 shrink-0">
                  {opt.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-slate-100 group-hover:text-[#449CFC] transition-colors">
                    {opt.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-normal">{opt.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
