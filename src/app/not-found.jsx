import { Cursor } from '../components/common/Cursor';
import { SmoothScroll } from '../components/common/SmoothScroll';
import { NotFoundSection } from '../components/sections/NotFoundSection';

export const metadata = {
  title: '404 - Page Not Found | Algofort',
  description:
    'You are here because you entered the address of a page that no longer exists or has been moved to a different address.',
};

export default function NotFound() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#f4f4f2] text-white overflow-hidden" id="top">
        <Cursor />
        <main id="main-content">
          <NotFoundSection />
        </main>
      </div>
    </SmoothScroll>
  );
}