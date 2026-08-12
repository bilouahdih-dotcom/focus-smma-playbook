import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bilouahdih-dotcom.github.io/focus-smma-playbook/"),
  applicationName: "Focus",
  title: "Focus — Le guide SMMA complet pour débutants",
  description: "Le guide SMMA de Focus, propulsé par Biloux : services, prospection, vente, livraison et glossaire expliqués simplement depuis zéro.",
  icons: { icon: "./favicon.svg", shortcut: "./favicon.svg" },
  openGraph: {
    siteName: "Focus",
    title: "Focus — Le guide SMMA pour débutants",
    description: "La fiche complète de Focus, propulsée par Biloux. Services, prospection, vente et 40 définitions expliqués simplement aux débutants.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Focus — Le guide SMMA pour débutants",
    description: "La fiche complète de Focus, propulsée par Biloux : services, prospection, vente, glossaire et plan d’action.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}
