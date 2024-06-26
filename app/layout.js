import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/app/components/header';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Euro 2024 Group Stages',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Suspense>
          <Header />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
