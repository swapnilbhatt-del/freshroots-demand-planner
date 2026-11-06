import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./tokens.css";
import "./base.css";
import "./review.css";
import "./pages.css";
import "./chat.css";
import "./visual.css";
import "./charts.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-bricolage", display: "swap" });
const sans = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Freshroots Demand Planner",
  description: "Twice-weekly SKU reorder recommendations from documented rules, reviewed line by line.",
};

// Light first; a saved choice wins.
const THEME_SCRIPT = `document.documentElement.setAttribute('data-theme','light');try{var t=localStorage.getItem('fr-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
