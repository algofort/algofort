import { Header } from '../../components/common/Header';
import { Footer } from '../../components/common/Footer';
import { PageBanner } from '../../components/common/PageBanner';
import { Cursor } from '../../components/common/Cursor';
import { BackToTop } from '../../components/common/BackToTop';
import { SmoothScroll } from '../../components/common/SmoothScroll';
import { ServicesListSection } from '../../components/sections/services/ServicesListSection';
import '../../styles/services-page.css';

export const metadata = {
  title: 'Our Services | Algofort - Shaping Bold Digital Experiences',
  description:
    'Discover Algofort’s core services: Web Development, UI/UX Development, Mobile Apps, Custom Software, and SEO engineered for digital growth, scalability, and high performance.',
};

export default function ServicesPage() {
  return (
    <SmoothScroll>
      <div className="page-wrapper min-h-screen bg-[#f4f4f2] text-[#05080C]" id="top">
        <Cursor />
        <Header />
        <BackToTop />
        <main id="main-content">
          <PageBanner
            title="Our Services"
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'Our Services', active: true },
            ]}
          />
          <ServicesListSection />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
