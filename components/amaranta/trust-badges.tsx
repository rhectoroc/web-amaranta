import { Shield, Sparkles, RefreshCw } from "lucide-react"

export default function TrustBadges() {
  const badges = [
    {
      icon: <Shield className="h-5 w-5 text-[#044C9C]" />,
      title: "Reserva Garantizada",
      desc: "Monitoreo satelital y soporte telefónico VIP 24/7 en cada excursión."
    },
    {
      icon: <Sparkles className="h-5 w-5 text-[#044C9C]" />,
      title: "Precio Transparente",
      desc: "El precio publicado es el precio final. Sin tasas ocultas ni sorpresas."
    },
    {
      icon: <RefreshCw className="h-5 w-5 text-[#044C9C]" />,
      title: "Flexibilidad Total",
      desc: "Reprogramaciones gratuitas hasta 24h antes por condiciones climáticas."
    }
  ]

  return (
    <section className="border-y border-slate-200 py-6 bg-[#F5F5F3]">
      <div className="container mx-auto px-4">
        {/* Horizontal scroll container on mobile, grid layout on desktop */}
        <div className="flex overflow-x-auto scrollbar-hide md:grid md:grid-cols-3 gap-4 pb-2 md:pb-0 snap-x snap-mandatory">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm min-w-[280px] md:min-w-0 snap-start shrink-0"
            >
              <div className="p-2 bg-[#449CFC]/10 rounded-lg shrink-0">
                {badge.icon}
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-[#044C9C]">{badge.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
