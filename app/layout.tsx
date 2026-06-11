import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/amaranta/header";
import Footer from "@/components/amaranta/footer";
import WhatsAppButton from "@/components/amaranta/whatsapp-button";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "700", "900"] });

export const metadata: Metadata = {
  title: "AMARANTA | Excursiones y Viajes Premium en Margarita, Coche y Cubagua",
  description: "Disfruta de las mejores excursiones y paquetes VIP a la Isla de Margarita, Isla de Coche y Cubagua con operación local directa, flota propia y tarifas garantizadas. Reserva hoy.",
  keywords: ["Margarita", "Isla de Coche", "Cubagua", "Turismo de lujo", "Catamaran Margarita", "Excursiones Margarita", "Full Day Coche"],
  authors: [{ name: "AMARANTA Travel Group" }],
  openGraph: {
    title: "AMARANTA | Viajes Premium al Caribe sin sorpresas",
    description: "Operación local directa con barcos propios y traslados VIP. Reserva con flexibilidad total.",
    type: "website",
    locale: "es_VE",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${outfit.className} bg-white text-slate-900 min-h-screen flex flex-col justify-between`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
