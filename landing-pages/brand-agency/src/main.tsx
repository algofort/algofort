import { initSupportChat } from '../../../src/lib/supportChatWidget.js';
import '../../../src/styles/support-chat.css';
initSupportChat();
import { initWhatsAppWidget } from '../../../src/lib/whatsappWidget.js';
import '../../../src/styles/whatsapp-widget.css';

initWhatsAppWidget();

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
