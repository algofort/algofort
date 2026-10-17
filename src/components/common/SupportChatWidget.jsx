'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initSupportChat } from '../../lib/supportChatWidget';
export default function SupportChatWidget() {
  const pathname = usePathname();
  useEffect(() => initSupportChat(), [pathname]);
  return null;
}
