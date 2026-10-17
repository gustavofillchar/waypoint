import type { Metadata, Viewport } from "next";
import { Figtree, Gloock, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const gloock = Gloock({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-gloock",
});

const figtree = Figtree({
  subsets: ["latin", "latin-ext"],
  variable: "--font-figtree",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "Eurotrip de Natal · Paris, Londres e Lisboa",
  description:
    "Roteiro de Gustavo Lima, Mylena Lima e Paloma Ribeiro: Natal em Paris, pré-réveillon em Londres e despedida do ano em Lisboa, de 18 a 31 de dezembro de 2026.",
};

export const viewport: Viewport = {
  themeColor: "#0e1830",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${gloock.variable} ${figtree.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
