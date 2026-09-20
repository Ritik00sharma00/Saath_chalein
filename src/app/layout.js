import { Inter, Merriweather } from 'next/font/google';
import '../styles/global.css';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata = {
  title: 'SaathChalein — Find your travel companion',
  description:
    'Plan trips and travel together with strangers who become friends. Discover companions, share plans and explore the world with SaathChalein.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="min-h-screen antialiased">
        <Providers>
          <Navbar />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}