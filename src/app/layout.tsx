import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoadingScreen from '@/components/LoadingScreen';
import Footer from '@/components/Footer';
import NavBar from '@/components/Navbar';

import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Manoa Lost & Found',
  description:
    'A platform that connects students of UH Manoa with each other to find lost and found items.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const classString = `${inter.className} wrapper`;

  return (
    <html lang="en">
      <body className={classString}>
        <Providers>
          <LoadingScreen />
          <NavBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
