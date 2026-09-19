import '../index.css';

export const metadata = {
  title: 'Algofort | AI, Custom Software & Digital Transformation',
  description:
    'Algofort is a technology and digital solutions agency engineering custom software, intelligent AI solutions, and high-performance digital platforms.',
  icons: {
    icon: '/assets/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Google Fonts: Mona Sans */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Mona+Sans:ital,wght,wdth@0,200..900,75..125;1,200..900,75..125&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#f4f4f2] text-[#05080C] antialiased selection:bg-[#6366F1] selection:text-white" suppressHydrationWarning>
        {/* Custom Follower Cursor Container */}
        <div className="cb-cursor"></div>
        {children}
      </body>
    </html>
  );
}
