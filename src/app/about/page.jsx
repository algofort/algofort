import { Header } from '../../components/common/Header';
import { Footer } from '../../components/common/Footer';
import { PageBanner } from '../../components/common/PageBanner';
import { Cursor } from '../../components/common/Cursor';
import { BackToTop } from '../../components/common/BackToTop';
import { SmoothScroll } from '../../components/common/SmoothScroll';

import { AboutIntroSection } from '../../components/sections/about/AboutIntroSection';
import { AboutValuesSection } from '../../components/sections/about/AboutValuesSection';
import { AboutWhyUsSection } from '../../components/sections/about/AboutWhyUsSection';
import { AboutTeamSection } from '../../components/sections/about/AboutTeamSection';
import { AboutCtaSection } from '../../components/sections/about/AboutCtaSection';

import '../../styles/about-page.css';

export const metadata = {
  title: 'About Us | Algofort - Shaping Bold Digital Experiences',
  description:
    'Discover Algofort: our story, vision pillars, strategic work process, industry recognition, and team of visionary digital designers and engineers.',
};

export default function AboutPage() {
  return (
    <SmoothScroll>
      <div className="page-wrapper page-about min-h-screen bg-[#f4f4f2] text-[#05080C]" id="top">
        <Cursor />
        <Header />
        <BackToTop />
        <main id="main-content">
          <PageBanner
            title="About Us"
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'About Us', active: true },
            ]}
          />
          <AboutIntroSection />
          <AboutValuesSection />
          <AboutWhyUsSection />
          <AboutTeamSection />
          <AboutCtaSection />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
