import { Header } from '../../../components/common/Header';
import { Footer } from '../../../components/common/Footer';
import { PageBanner } from '../../../components/common/PageBanner';
import { Cursor } from '../../../components/common/Cursor';
import { BackToTop } from '../../../components/common/BackToTop';
import { SmoothScroll } from '../../../components/common/SmoothScroll';
import { BrandServiceAboutSection } from '../../../components/sections/services/single/BrandServiceAboutSection';
import { BrandServiceOffersSection } from '../../../components/sections/services/single/BrandServiceOffersSection';
import { BrandServiceProcessSection } from '../../../components/sections/services/single/BrandServiceProcessSection';
import { BrandServiceWhyUsSection } from '../../../components/sections/services/single/BrandServiceWhyUsSection';
import { TestimonialsSection } from '../../../components/sections/TestimonialsSection';
import { BrandServiceFaqSection } from '../../../components/sections/services/single/BrandServiceFaqSection';
import { CtaSection } from '../../../components/sections/CtaSection';
import '../../../styles/single-service-page.css';

export const metadata = {
  title: 'Brand Identity Design Services | Algofort - Distinctive Visual Systems',
  description:
    'Strategic brand identity and visual systems by Algofort. We create memorable logos, typography systems, and cohesive visual guidelines that help modern brands stand out.',
};

export default function BrandIdentityPage() {
  return (
    <SmoothScroll>
      <div className="page-wrapper page-single-service min-h-screen bg-[#f4f4f2] text-[#05080C]" id="top">
        <Cursor />
        <Header />
        <BackToTop />
        <main id="main-content">
          <PageBanner
            title="Brand Identity"
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: 'Brand Identity', active: true },
            ]}
          />
          <BrandServiceAboutSection />
          <BrandServiceOffersSection />
          <BrandServiceProcessSection />
          <BrandServiceWhyUsSection />
          <TestimonialsSection />
          <BrandServiceFaqSection />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
