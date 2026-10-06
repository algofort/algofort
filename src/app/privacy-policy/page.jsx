import { Header } from '../../components/common/Header';
import { Footer } from '../../components/common/Footer';
import { PageBanner } from '../../components/common/PageBanner';
import { Cursor } from '../../components/common/Cursor';
import { BackToTop } from '../../components/common/BackToTop';
import { SmoothScroll } from '../../components/common/SmoothScroll';
import { PrivacyPolicySection } from '../../components/sections/privacy/PrivacyPolicySection';
import '../../styles/privacy-page.css';

export const metadata = {
  title: 'Privacy Policy | Algofort - Shaping Bold Digital Experiences',
  description:
    'Read the Algofort Privacy Policy. Learn how we collect, use, store, and protect your information across our website, contact forms, and digital technology services.',
};

export default function PrivacyPolicyPage() {
  return (
    <SmoothScroll>
      <div className="page-wrapper min-h-screen bg-[#f4f4f2] text-[#05080C]" id="top">
        <Cursor />
        <Header />
        <BackToTop />
        <main id="main-content">
          <PageBanner
            title="Privacy Policy"
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'Privacy Policy', active: true },
            ]}
          />
          <PrivacyPolicySection />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
