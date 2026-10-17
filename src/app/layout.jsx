import '../index.css';
import '../styles/whatsapp-widget.css';
import WhatsAppWidget from '../components/common/WhatsAppWidget';
import '../styles/support-chat.css';
import SupportChatWidget from '../components/common/SupportChatWidget';

export const metadata = {
  title: 'Algofort | AI, Custom Software & Digital Transformation',
  description:
    'Algofort is a technology and digital solutions agency engineering custom software, intelligent AI solutions, and high-performance digital platforms.',
  icons: {
    icon: [
      { url: '/fav-icon.png', type: 'image/png' },
    ],
    shortcut: '/fav-icon.png',
    apple: '/fav-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Preconnect to Cloudinary CDN for instant image fetching */}
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        {/* Favicon */}
        <link rel="icon" href="/fav-icon.png" type="image/png" />
        <link rel="shortcut icon" href="/fav-icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/fav-icon.png" />
      </head>
      <body className="bg-[#f4f4f2] text-[#05080C] antialiased selection:bg-[#6366F1] selection:text-white" suppressHydrationWarning>
        {/* Custom Follower Cursor Container */}
        <div className="cb-cursor"></div>
        {children}
        <WhatsAppWidget />
        <SupportChatWidget />
      </body>
    </html>
  );
}
