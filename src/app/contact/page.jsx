import { Header } from '../../components/common/Header';
import { Footer } from '../../components/common/Footer';
import { PageBanner } from '../../components/common/PageBanner';
import { ContactSection } from '../../components/sections/ContactSection';
import { Cursor } from '../../components/common/Cursor';
import { BackToTop } from '../../components/common/BackToTop';
import { SmoothScroll } from '../../components/common/SmoothScroll';

export const metadata = {
  title: 'Contact Us | Algofort - Let’s Start a Conversation',
  description:
    'Get in touch with the Algofort team. We design and deliver AI-driven platforms, high-performance websites, and custom software that drive business growth.',
};

export default function ContactPage() {
  return (
    <SmoothScroll>
      <div className="page-wrapper min-h-screen bg-[#f4f4f2] text-[#05080C]" id="top">
        <Cursor />
        <Header />
        <BackToTop />
        <main id="main-content">
          <PageBanner
            title="Contact Us"
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'Contact Us', active: true },
            ]}
          />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}