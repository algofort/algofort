import { initSupportChat } from '../../../src/lib/supportChatWidget.js';
import '../../../src/styles/support-chat.css';
initSupportChat();
import { initWhatsAppWidget } from '../../../src/lib/whatsappWidget.js';
import '../../../src/styles/whatsapp-widget.css';

initWhatsAppWidget();

import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

const root = document.getElementById('root')!;
const content = (
  <StrictMode>
    <App />
  </StrictMode>
);
if (root.hasChildNodes()) hydrateRoot(root, content); else createRoot(root).render(content);
