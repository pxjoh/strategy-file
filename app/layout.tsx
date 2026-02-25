import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ProphetX — Q1 2026 Strategy',
  description: 'Q1 2026 Growth Strategy & Content Roadmap',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
