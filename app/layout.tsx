import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CountryProvider } from "@/lib/CountryContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FDR Suspension Parts | Repuestos de Suspensión Ecuador & Colombia",
  description:
    "FDR Suspension Parts — líderes en distribución de repuestos de suspensión en Ecuador y Colombia. Amortiguadores, rótulas, bujes y más. Calidad garantizada y entrega rápida.",
  keywords:
    "repuestos suspensión Ecuador, repuestos suspensión Colombia, amortiguadores, rótulas, bujes, FDR suspension, autopartes",
  openGraph: {
    title: "FDR Suspension Parts | Repuestos de Suspensión Ecuador & Colombia",
    description:
      "Distribuidores líderes de repuestos de suspensión en Ecuador y Colombia. Calidad garantizada.",
    type: "website",
    locale: "es",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable}`}>
      <body className="min-h-screen antialiased" style={{ background: "#000d1a" }}>
        <CountryProvider>{children}</CountryProvider>
      </body>
    </html>
  );
}
