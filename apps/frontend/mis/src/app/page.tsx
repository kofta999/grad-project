import Head from 'next/head';
import Navbar from '@/components/home/Navbar';
import HeroSection from '@/components/home/HeroSection';
import ProgramsSection from '@/components/home/ProgramsSection';
import StatsSection from '@/components/home/StatsSection';
import NewsSection from '@/components/home/NewsSection';
import Footer from '@/components/home/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>كلية الهندسة - جامعة قناة السويس</title>
        <meta name="description" content="كلية الهندسة بجامعة قناة السويس - تعليم متطور وبحث علمي متميز" />
        <link rel="icon" href="/logo_with_transparent_bg.png" />
      </Head>

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        
        <main className="flex-grow">
          <HeroSection />
          <ProgramsSection />
          <StatsSection />
          <NewsSection />
        </main>
        
        <Footer />
      </div>
    </>
  );
}