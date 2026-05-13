import { useEffect } from 'react';
import { useLenis } from '@/hooks/useLenis';
import { useLanguage } from '@/hooks/useLanguage';
import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import HeroSection from '@/sections/HeroSection';
import FeaturesSection from '@/sections/FeaturesSection';
import StatsSection from '@/sections/StatsSection';
import WhyUsSection from '@/sections/WhyUsSection';
import ContactSection from '@/sections/ContactSection';

function App() {
  useLenis();
  const { init } = useLanguage();

  useEffect(() => {
    init();
  }, [init]);

  return (
    <>
      <Topbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <WhyUsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

export default App;
