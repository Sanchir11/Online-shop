import Script from 'next/script';
import './globals.css';

export const metadata = {
  title: 'Secret Shop — Adult Products (18+)',
  description: 'Premium adult products with discreet delivery. Sex shop online store.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="mn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Commissioner:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#6c2699" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      </head>
      <body>
        {children}
        <Script src="/store.js" strategy="beforeInteractive" />
        <Script src="/auth.js" strategy="afterInteractive" />
        <Script src="/main.js" strategy="afterInteractive" />
        <Script src="/shop.js" strategy="afterInteractive" />
        <Script src="/mn.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
