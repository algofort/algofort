import { withSocialMetadata } from '../../lib/seo';
import { Header } from '../../components/common/Header';
import { Footer } from '../../components/common/Footer';
import { PageBanner } from '../../components/common/PageBanner';
import { Cursor } from '../../components/common/Cursor';
import { BackToTop } from '../../components/common/BackToTop';
import { SmoothScroll } from '../../components/common/SmoothScroll';
import { PricingSection } from '../../components/sections/PricingSection';
import { FaqSection } from '../../components/sections/FaqSection';
import { CtaSection } from '../../components/sections/CtaSection';

export const metadata = withSocialMetadata({
  alternates: { canonical: '/pricing' },
  title: 'Pricing Plans | Algofort - Transparent Solutions For Growth',
  description:
    'Explore Algofort’s clear, value-driven pricing plans across Web Development, Brand Identity, SaaS App Development, and Mobile App Development.',
});

export default function PricingPage() {
  return (
    <SmoothScroll>
      <div className="page-wrapper min-h-screen bg-[#f4f4f2] text-[#05080C]" id="top">
        <Cursor />
        <Header />
        <BackToTop />
        <main id="main-content">
          <PageBanner
            title="Pricing Plans"
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'Pricing Plans', href: '/pricing', active: true },
            ]}
          />
          <PricingSection />
          <FaqSection />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}

