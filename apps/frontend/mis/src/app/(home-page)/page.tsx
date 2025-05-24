import HeroSection from "@/components/home/hero-section";
import NewsSection from "@/components/home/news-section";
import ProgramsSection from "@/components/home/program-section";
import StatsSection from "@/components/home/stats-section";

export default function Home() {
  return (
    <main className="flex-grow">
      <HeroSection />
      <ProgramsSection />
      <StatsSection />
      <NewsSection />
    </main>
  );
}
