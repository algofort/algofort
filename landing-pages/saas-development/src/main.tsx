import { initSupportChat } from '../../../src/lib/supportChatWidget.js';
import '../../../src/styles/support-chat.css';
initSupportChat();
import { initWhatsAppWidget } from '../../../src/lib/whatsappWidget.js';
import '../../../src/styles/whatsapp-widget.css';

initWhatsAppWidget();

import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import Root from './Root'
import './app/globals.css'
import './integration.css'
const root = document.getElementById('root')!;
if (root.hasChildNodes()) hydrateRoot(root, <Root/>); else createRoot(root).render(<Root/>);
