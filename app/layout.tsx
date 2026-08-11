import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://focus-smma-playbook.vercel.app/"),
  applicationName: "BS IA",
  title: "BS IA — SMMA Masterbook 2026",
  description: "Le guide SMMA premium de BS IA : 22 modules pour choisir un service, prospecter, vendre, livrer et structurer une agence depuis zéro.",
  icons: { icon: "./bs-ia-logo.webp", shortcut: "./bs-ia-logo.webp" },
  openGraph: {
    siteName: "BS IA",
    title: "BS IA — SMMA Masterbook 2026",
    description: "22 modules, 9 services, scripts de vente, modèles copiables, calculateur et système complet pour lancer une agence SMMA.",
    type: "website",
    images: [{ url: "/og.png", width: 1672, height: 939, alt: "BS IA — SMMA Masterbook 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BS IA — SMMA Masterbook 2026",
    description: "Le guide premium pour construire une agence SMMA, de la première offre au système de livraison.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}
