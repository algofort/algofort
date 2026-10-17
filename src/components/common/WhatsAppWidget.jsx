'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initWhatsAppWidget } from '../../lib/whatsappWidget';

export default function WhatsAppWidget() {
  const pathname = usePathname();
  useEffect(() => initWhatsAppWidget(), [pathname]);
  return null;
}
