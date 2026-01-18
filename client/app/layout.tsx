import type { Metadata } from "next";
import { AuthProvider } from '../context/AuthContext';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientShell from '../app/ClientShell';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tunebox",
  description: "Where your music lives",
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <html>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        <AuthProvider>
          <ClientShell>
            {children}
          </ClientShell>
        </AuthProvider>
        
        
      </body>
    </html>
  );
}

