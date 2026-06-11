import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white border-t border-white/5 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Slogan */}
          <div className="space-y-4">
            <div className="relative h-12 w-44">
              <Image
                src="/LogoAmaranta.png"
                alt="AMARANTA Logo"
                fill
                sizes="176px"
                className="object-contain"
              />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Experiencias premium que no se marchitan en tu memoria. Operación local directa con flota propia y atención VIP en Margarita.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#FBB343]">Explorar</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/" className="hover:text-[#449CFC] transition-colors">Home</Link></li>
              <li><Link href="/#paquetes" className="hover:text-[#449CFC] transition-colors">Paquetes</Link></li>
              <li><Link href="/#excursiones" className="hover:text-[#449CFC] transition-colors">Excursiones</Link></li>
              <li><Link href="#" className="hover:text-[#449CFC] transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Travel Niches */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#FBB343]">Estilo de Viaje</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/#paquetes" className="hover:text-[#449CFC] transition-colors">En Pareja</Link></li>
              <li><Link href="/#paquetes" className="hover:text-[#449CFC] transition-colors">En Familia</Link></li>
              <li><Link href="/#paquetes" className="hover:text-[#449CFC] transition-colors">Aventura / Solo</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#FBB343]">Contacto VIP</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Isla de Margarita, Venezuela</li>
              <li>Soporte VIP 24/7</li>
              <li>contacto@amaranta.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} AMARANTA. Todos los derechos reservados.</p>
          <p>Lujo accesible sin sorpresas.</p>
        </div>
      </div>
    </footer>
  )
}
