import { Header } from '../../../components/common/Header';
import { Footer } from '../../../components/common/Footer';
import { PageBanner } from '../../../components/common/PageBanner';
import { Cursor } from '../../../components/common/Cursor';
import { BackToTop } from '../../../components/common/BackToTop';
import { SmoothScroll } from '../../../components/common/SmoothScroll';
import { SaasServiceAboutSection } from '../../../components/sections/services/single/SaasServiceAboutSection';
import { SaasServiceOffersSection } from '../../../components/sections/services/single/SaasServiceOffersSection';
import { SaasServiceProcessSection } from '../../../components/sections/services/single/SaasServiceProcessSection';
import { SaasServiceWhyUsSection } from '../../../components/sections/services/single/SaasServiceWhyUsSection';
import { TestimonialsSection } from '../../../components/sections/TestimonialsSection';
import { SaasServiceFaqSection } from '../../../components/sections/services/single/SaasServiceFaqSection';
import { CtaSection } from '../../../components/sections/CtaSection';
import '../../../styles/single-service-page.css';

export const metadata = {
  title: 'SaaS App Development Services | Algofort - Scalable Cloud Platforms',
  description:
    'Full-cycle SaaS application development by Algofort. We engineer multi-tenant cloud architectures, subscription platforms, and high-performance digital products.',
};

export default function SaasAppDevelopmentPage() {
  return (
    <SmoothScroll>
      <div className="page-wrapper page-single-service min-h-screen bg-[#f4f4f2] text-[#05080C]" id="top">
        <Cursor />
        <Header />
        <BackToTop />
        <main id="main-content">
          <PageBanner
            title="SaaS App Development"
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: 'SaaS App Development', active: true },
            ]}
          />
          <SaasServiceAboutSection />
          <SaasServiceOffersSection />
          <SaasServiceProcessSection />
          <SaasServiceWhyUsSection />
          <TestimonialsSection />
          <SaasServiceFaqSection />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
