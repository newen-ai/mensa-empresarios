import type { Metadata } from "next";
import { Sora, Spectral } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Mensa Empresarios Argentina | Red Profesional",
  description:
    "Red profesional de Mensa Argentina para construir perfiles y mostrar experiencia laboral.",
  icons: {
    icon: "/mensa-empresarios-logo.svg",
    shortcut: "/mensa-empresarios-logo.svg",
    apple: "/mensa-empresarios-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${sora.variable} ${spectral.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
