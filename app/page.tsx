import HeroSection from "@/components/amaranta/sections/hero-section";
import TrustBadges from "@/components/amaranta/trust-badges";
import TravelStyleFilters from "@/components/amaranta/sections/travel-style-filters";
import FeaturedExperiences from "@/components/amaranta/sections/featured-experiences";
import WhyAmaranta from "@/components/amaranta/sections/why-amaranta";
import TestimonialsSection from "@/components/amaranta/sections/testimonials-section";
import FAQSection from "@/components/amaranta/sections/faq-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBadges />
      <TravelStyleFilters />
      <FeaturedExperiences />
      <WhyAmaranta />
      <TestimonialsSection />
      <FAQSection />
    </>
  );
}
