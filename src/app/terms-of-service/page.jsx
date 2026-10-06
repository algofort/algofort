import { Header } from '../../components/common/Header';
import { Footer } from '../../components/common/Footer';
import { PageBanner } from '../../components/common/PageBanner';
import { Cursor } from '../../components/common/Cursor';
import { BackToTop } from '../../components/common/BackToTop';
import { SmoothScroll } from '../../components/common/SmoothScroll';
import { TermsOfServiceSection } from '../../components/sections/terms/TermsOfServiceSection';
import '../../styles/terms-page.css';

export const metadata = {
  title: 'Terms of Service | Algofort - Shaping Bold Digital Experiences',
  description:
    'Read the Algofort Terms of Service. Learn about our digital services, acceptable use policies, intellectual property rights, and commercial project terms.',
};

export default function TermsOfServicePage() {
  return (
    <SmoothScroll>
      <div className="page-wrapper min-h-screen bg-[#f4f4f2] text-[#05080C]" id="top">
        <Cursor />
        <Header />
        <BackToTop />
        <main id="main-content">
          <PageBanner
            title="Terms of Service"
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'Terms of Service', active: true },
            ]}
          />
          <TermsOfServiceSection />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
