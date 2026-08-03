import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bilouahdih-dotcom.github.io/focus-smma-playbook/"),
  title: "Focus — Le Playbook SMMA complet",
  description: "Services, formation, ciblage, cold call, démarchage physique, objections, closing, livraison et plan 90 jours.",
  icons: { icon: "./favicon.svg", shortcut: "./favicon.svg" },
  openGraph: {
    title: "Focus — Le Playbook SMMA complet",
    description: "Une offre. Une cible. Une méthode. Le guide opérationnel pour construire une agence vendable.",
    type: "website",
    images: [{ url: "./og.png", width: 1729, height: 910, alt: "Focus — SMMA Playbook" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Focus — Le Playbook SMMA complet",
    description: "Services, scripts, objections, closing et plan 90 jours.",
    images: ["./og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}
