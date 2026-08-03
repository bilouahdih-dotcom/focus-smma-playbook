import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bilouahdih-dotcom.github.io/focus-smma-playbook/"),
  title: "SMMA/OS — Le Playbook SMMA complet pour débutants",
  description: "Le guide SMMA sans prérequis : services, formation, ciblage, cold call, démarchage physique, objections, vente et livraison.",
  icons: { icon: "./favicon.svg", shortcut: "./favicon.svg" },
  openGraph: {
    title: "SMMA/OS — Le Playbook SMMA pour débutants",
    description: "Aucun prérequis. Une offre, une cible et une méthode expliquées depuis zéro pour construire une agence vendable.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "SMMA/OS — Le Playbook SMMA pour débutants",
    description: "Le guide sans prérequis : services, scripts, objections, vente et plan d’action.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}
