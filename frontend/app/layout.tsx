import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Oras-Vanduo Akademija - Šilumos Siurblių Specialistų Platforma",
  description: "Profesionali platforma šilumos siurblių specialistams su AI FAQ botu ir žinių baze",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lt">
      <body className={`${inter.variable} antialiased bg-bg min-h-screen`}>
        {/* BlinGO Agency Header Banner */}
        <div className="bg-black py-2 px-4">
          <a
            href="http://www.blingo.lt"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-white text-sm hover:opacity-80 transition-opacity"
          >
            <span>Sukurta kartu su</span>
            <img
              src="/blingo-logo.png"
              alt="BlinGO Agency"
              className="h-7 invert"
            />
          </a>
        </div>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
