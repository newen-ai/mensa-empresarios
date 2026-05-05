import type { Metadata } from "next";
import { Sora, Spectral } from "next/font/google";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const withBasePath = (path: string) => `${basePath}${path}`;

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
    icon: withBasePath("/mensa-empresarios-logo.svg"),
    shortcut: withBasePath("/mensa-empresarios-logo.svg"),
    apple: withBasePath("/mensa-empresarios-logo.svg"),
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
