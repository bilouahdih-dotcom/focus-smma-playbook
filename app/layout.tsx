import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://focus-smma-playbook.vercel.app/"),
  applicationName: "BS IA",
  title: "BS IA — SMMA Masterbook 2026",
  description: "Le guide SMMA premium de BS IA : 27 modules pour choisir un service, prospecter, vendre, livrer et structurer une agence depuis zéro.",
  alternates: { canonical: "/" },
  authors: [{ name: "BS IA" }, { name: "Biloux" }],
  category: "business",
  keywords: ["guide SMMA", "agence SMMA", "prospection B2B", "cold call", "services digitaux", "BS IA"],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    siteName: "BS IA",
    title: "BS IA — SMMA Masterbook 2026",
    description: "27 modules, 15 services, scripts de vente, modèles copiables, calculateur et système complet pour lancer une agence SMMA.",
    type: "website",
    locale: "fr_FR",
    url: "/",
    images: [{ url: "/og.png", width: 1672, height: 939, alt: "BS IA — SMMA Masterbook 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BS IA — SMMA Masterbook 2026",
    description: "Le guide premium pour construire une agence SMMA, de la première offre au système de livraison.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#08040e",
  width: "device-width",
  initialScale: 1,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "BS IA — SMMA Masterbook 2026",
  description: "Guide pour débutants consacré au choix d’un service SMMA, à la prospection B2B, à la vente, à la livraison et à la structuration d’une agence.",
  inLanguage: "fr",
  learningResourceType: "Guide",
  educationalLevel: "Débutant",
  isAccessibleForFree: true,
  author: { "@type": "Organization", name: "BS IA" },
  publisher: { "@type": "Organization", name: "BS IA" },
  url: "https://focus-smma-playbook.vercel.app/",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />{children}</body></html>;
}
