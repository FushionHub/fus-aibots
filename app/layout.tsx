import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fus AI Model - Multi-AI Platform',
  description: 'Comprehensive AI platform with voiceovers, image generation, music creation, and code generation powered by Fus AI Model',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body style={{ fontFamily: 'Inter, sans-serif' }}>{children}</body>
    </html>
  );
}