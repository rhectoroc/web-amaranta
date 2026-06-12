"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useUIStore } from "@/store/use-ui-store"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const { isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen, setWhatsAppModalOpen } = useUIStore()
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Paquetes", href: "/#paquetes" },
    { label: "Excursiones", href: "/#excursiones" },
    { label: "Blog", href: "#" },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#044C9C]/95 backdrop-blur-md shadow-lg border-b border-[#3C9CFC]/20 py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          {/* LOGO */}
          <Link href="/" className="relative h-20 w-56 md:h-24 md:w-72 block shrink-0">
            <Image
              src="/LogoAmaranta.png"
              alt="AMARANTA Logo"
              fill
              priority
              sizes="(max-width: 768px) 224px, 288px"
              className="object-contain"
            />
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/90 hover:text-[#449CFC] transition-colors font-medium text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* DESKTOP CTA */}
          <div className="hidden md:block">
            <Button variant="secondary" size="sm" onClick={() => setWhatsAppModalOpen(true)}>
              <span className="flex items-center gap-1">
                Cotización VIP <ArrowRight className="h-4 w-4" />
              </span>
            </Button>
          </div>

          {/* HAMBURGER TRIGGER */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white p-3 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* MOBILE NAV PANEL (Framer Motion Drawer) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-[#021830] border-l border-[#3C9CFC]/30 z-50 md:hidden flex flex-col p-6 shadow-2xl"
            >
              {/* Drawer Header with Close Button */}
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-white font-bold text-lg">Menú</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white p-2 focus:outline-none"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex flex-col gap-6 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white text-lg font-semibold hover:text-[#449CFC] border-b border-white/10 pb-3 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button variant="secondary" size="lg" className="w-full mt-4" onClick={() => { setMobileMenuOpen(false); setWhatsAppModalOpen(true); }}>
                  Cotización VIP
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
