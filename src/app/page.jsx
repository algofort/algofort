import { Header } from '../components/common/Header';
import { BannerSection } from '../components/sections/BannerSection';
import { AboutSection } from '../components/sections/AboutSection';
import { ShowreelSection } from '../components/sections/ShowreelSection';
import { ServicesSection } from '../components/sections/ServicesSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { ProcessSection } from '../components/sections/ProcessSection';
import { FaqSection } from '../components/sections/FaqSection';
import { CtaSection } from '../components/sections/CtaSection';
import { Footer } from '../components/common/Footer';
import { Cursor } from '../components/common/Cursor';
import { BackToTop } from '../components/common/BackToTop';
import { SmoothScroll } from '../components/common/SmoothScroll';

export default function Home() {
  return (
    <SmoothScroll>
      <div className="page-wrapper min-h-screen bg-[#f4f4f2] text-[#05080C]" id="top">
        <Cursor />
        <Header />
        <BackToTop />
        <main id="main-content">
          <BannerSection />
          <AboutSection />
          <ServicesSection />
          <ProcessSection />
          <ShowreelSection />
          <TestimonialsSection />
          <FaqSection />
          <CtaSection />
          <Footer />
        </main>
      </div>
    </SmoothScroll>
  );
}

