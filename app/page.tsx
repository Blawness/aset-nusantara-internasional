import { HeroSection } from "@/components/sections/HeroSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { FeaturedArticles } from "@/components/sections/FeaturedArticles";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustBar />
      <AboutTeaser />
      <ServicesSection />
      <WhyUsSection />
      <FeaturedArticles />
      <CTASection />
    </main>
  );
}
