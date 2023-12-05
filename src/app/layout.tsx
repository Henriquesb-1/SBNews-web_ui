import './globals.scss';
import type { Metadata } from 'next';
import Providers from './Providers';
import { ToastContainer } from 'react-toastify';

import "react-toastify/ReactToastify.min.css";

export const metadata: Metadata = {
  title: 'SBNews',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <Providers>
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  )
}
