import { Header } from '../../components/common/Header';
import { Footer } from '../../components/common/Footer';
import { PageBanner } from '../../components/common/PageBanner';
import { Cursor } from '../../components/common/Cursor';
import { BackToTop } from '../../components/common/BackToTop';
import { SmoothScroll } from '../../components/common/SmoothScroll';
import { PortfolioHeroSection } from '../../components/sections/portfolio/PortfolioHeroSection';
import { PortfolioBentoSection } from '../../components/sections/portfolio/PortfolioBentoSection';
import { PortfolioShowcaseSection } from '../../components/sections/portfolio/PortfolioShowcaseSection';
import '../../styles/portfolio-page.css';

export const metadata = {
  title: 'Our Portfolio | Algofort - Shaping Bold Digital Experiences',
  description:
    'Explore Algofort’s portfolio of cutting-edge digital platforms, high-performance agency websites, and custom software engineered for scalability and modern brand impact.',
};

export default function PortfolioPage() {
  return (
    <SmoothScroll>
      <div className="page-wrapper min-h-screen bg-[#f4f4f2] text-[#05080C]" id="top">
        <Cursor />
        <Header />
        <BackToTop />
        <main id="main-content">
          <PageBanner
            title="Our Portfolio"
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'Portfolio', active: true },
            ]}
          />
          <PortfolioHeroSection />
          <PortfolioBentoSection />
          <PortfolioShowcaseSection />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
