import { SaaSLandingPage } from './components/SaaSLandingPage';
import { saasLandingConfig } from './config/saas';
import { SmoothScroll } from './components/SmoothScroll';
import BackToTop from '../../shared/BackToTop.jsx';
export default function Root() { return <><SmoothScroll/><SaaSLandingPage config={saasLandingConfig}/><BackToTop/></>; }
