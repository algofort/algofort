import { Header } from '../../../components/common/Header';
import { Footer } from '../../../components/common/Footer';
import { PageBanner } from '../../../components/common/PageBanner';
import { Cursor } from '../../../components/common/Cursor';
import { BackToTop } from '../../../components/common/BackToTop';
import { SmoothScroll } from '../../../components/common/SmoothScroll';
import { MobileServiceAboutSection } from '../../../components/sections/services/single/MobileServiceAboutSection';
import { MobileServiceOffersSection } from '../../../components/sections/services/single/MobileServiceOffersSection';
import { MobileServiceProcessSection } from '../../../components/sections/services/single/MobileServiceProcessSection';
import { MobileServiceWhyUsSection } from '../../../components/sections/services/single/MobileServiceWhyUsSection';
import { TestimonialsSection } from '../../../components/sections/TestimonialsSection';
import { MobileServiceFaqSection } from '../../../components/sections/services/single/MobileServiceFaqSection';
import { CtaSection } from '../../../components/sections/CtaSection';
import '../../../styles/single-service-page.css';

export const metadata = {
  title: 'Mobile App Development Services | Algofort - iOS & Android Solutions',
  description:
    'Custom mobile application development by Algofort. We build high-performance iOS, Android, and cross-platform mobile apps with fluid UI and native performance.',
};

export default function MobileAppDevelopmentPage() {
  return (
    <SmoothScroll>
      <div className="page-wrapper page-single-service min-h-screen bg-[#f4f4f2] text-[#05080C]" id="top">
        <Cursor />
        <Header />
        <BackToTop />
        <main id="main-content">
          <PageBanner
            title="Mobile App Development"
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: 'Mobile App Development', active: true },
            ]}
          />
          <MobileServiceAboutSection />
          <MobileServiceOffersSection />
          <MobileServiceProcessSection />
          <MobileServiceWhyUsSection />
          <TestimonialsSection />
          <MobileServiceFaqSection />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
