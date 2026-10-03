import '../index.css';

export const metadata = {
  title: 'Algofort | AI, Custom Software & Digital Transformation',
  description:
    'Algofort is a technology and digital solutions agency engineering custom software, intelligent AI solutions, and high-performance digital platforms.',
  icons: {
    icon: [
      { url: '/assets/fav-icon.png', type: 'image/png' },
      { url: '/fav-icon.png', type: 'image/png' },
    ],
    shortcut: '/assets/fav-icon.png',
    apple: '/assets/fav-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/assets/fav-icon.png" type="image/png" />
        <link rel="shortcut icon" href="/assets/fav-icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/fav-icon.png" />
      </head>
      <body className="bg-[#f4f4f2] text-[#05080C] antialiased selection:bg-[#6366F1] selection:text-white" suppressHydrationWarning>
        {/* Custom Follower Cursor Container */}
        <div className="cb-cursor"></div>
        {children}
      </body>
    </html>
  );
}