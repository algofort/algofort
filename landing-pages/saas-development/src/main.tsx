import { initSupportChat } from '../../../src/lib/supportChatWidget.js';
import '../../../src/styles/support-chat.css';
initSupportChat();
import { initWhatsAppWidget } from '../../../src/lib/whatsappWidget.js';
import '../../../src/styles/whatsapp-widget.css';

initWhatsAppWidget();

import React from 'react'
import { createRoot } from 'react-dom/client'
import { SaaSLandingPage } from './components/SaaSLandingPage'
import { saasLandingConfig } from './config/saas'
import { SmoothScroll } from './components/SmoothScroll'
import BackToTop from '../../shared/BackToTop.jsx'
import './app/globals.css'
import './integration.css'

createRoot(document.getElementById('root')!).render(<><SmoothScroll/><SaaSLandingPage config={saasLandingConfig}/><BackToTop/></>)
