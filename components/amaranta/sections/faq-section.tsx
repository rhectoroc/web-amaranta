"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQSection() {
  const faqs = [
    {
      q: "¿Cuáles son los métodos de pago aceptados?",
      a: "Aceptamos transferencias bancarias en bolívares, divisas en efectivo, pagos por Zelle y tarjetas de crédito internacionales. Toda cotización se bloquea con un abono inicial y el saldo se cancela antes de abordar."
    },
    {
      q: "¿Qué sucede en caso de mal clima?",
      a: "Nuestra política de flexibilidad garantiza la reprogramación sin costo alguno en caso de que las autoridades marítimas suspendan zarpes por razones climáticas. Tu seguridad es nuestra prioridad."
    },
    {
      q: "¿Las excursiones incluyen traslados desde el hotel?",
      a: "Sí, todos nuestros paquetes premium (Coche y Cubagua) ofrecen la opción de incluir el traslado de ida y vuelta en unidades con aire acondicionado desde los principales hoteles de Margarita."
    },
    {
      q: "¿Hay opciones de comida para vegetarianos o alérgicos?",
      a: "Por supuesto. Al momento de realizar tu cotización exprés o confirmar con tu asesor, puedes indicarnos cualquier restricción alimentaria para coordinar un menú especial personalizado sin cargos adicionales."
    }
  ]

  return (
    <section className="py-16 bg-[#F5F5F3] border-t border-slate-200/50">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-[#044C9C] text-xs font-black uppercase tracking-widest bg-[#449CFC]/10 px-3 py-1 rounded-full">
            Preguntas Frecuentes
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-3 tracking-tight">
            Resuelve Tus Dudas al Instante
          </h2>
        </div>

        {/* Accordion List */}
        <Accordion type="single" collapsible className="w-full bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`} className="border-b border-slate-100 last:border-0">
              <AccordionTrigger className="text-left font-bold text-sm text-[#044C9C] hover:text-[#115092] py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-xs md:text-sm text-slate-700 leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
