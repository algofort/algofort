import { Header } from '../../../components/common/Header';
import { Footer } from '../../../components/common/Footer';
import { PageBanner } from '../../../components/common/PageBanner';
import { Cursor } from '../../../components/common/Cursor';
import { BackToTop } from '../../../components/common/BackToTop';
import { SmoothScroll } from '../../../components/common/SmoothScroll';
import { WebServiceAboutSection } from '../../../components/sections/services/single/WebServiceAboutSection';
import { WebServiceOffersSection } from '../../../components/sections/services/single/WebServiceOffersSection';
import { WebServiceProcessSection } from '../../../components/sections/services/single/WebServiceProcessSection';
import { WebServiceWhyUsSection } from '../../../components/sections/services/single/WebServiceWhyUsSection';
import { TestimonialsSection } from '../../../components/sections/TestimonialsSection';
import { WebServiceFaqSection } from '../../../components/sections/services/single/WebServiceFaqSection';
import { CtaSection } from '../../../components/sections/CtaSection';
import '../../../styles/single-service-page.css';

export const metadata = {
  title: 'Web Development Services | Algofort - Fast, Scalable Digital Platforms',
  description:
    'Custom web development services by Algofort. We engineer high-performance websites, scalable web applications, and intuitive front-end/back-end digital solutions.',
};

export default function WebDevelopmentPage() {
  return (
    <SmoothScroll>
      <div className="page-wrapper page-single-service min-h-screen bg-[#f4f4f2] text-[#05080C]" id="top">
        <Cursor />
        <Header />
        <BackToTop />
        <main id="main-content">
          <PageBanner
            title="Web Development"
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'Our Services', href: '/services' },
              { label: 'Web Development', active: true },
            ]}
          />
          <WebServiceAboutSection />
          <WebServiceOffersSection />
          <WebServiceProcessSection />
          <WebServiceWhyUsSection />
          <TestimonialsSection />
          <WebServiceFaqSection />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
