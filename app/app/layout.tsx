import { Inter, Playfair_Display, DM_Mono, Cinzel_Decorative } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
});

const dmMono = DM_Mono({ 
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-dm-mono',
});

const cinzel = Cinzel_Decorative({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-cinzel',
});

export const metadata = {
  title: 'SLALOM Protocol - Be Our Guest',
  description: 'Craft your crypto feast with Lawrence AI on Hyperliquid',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${dmMono.variable} ${cinzel.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased bg-neutral-950 text-white">{children}</body>
    </html>
  )
}
