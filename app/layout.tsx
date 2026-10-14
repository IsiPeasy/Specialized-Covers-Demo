import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "COVERCAR — Configurator demo",
  description: "Tailored car cover configurator with live pricing — four styles, one price model",
};

/** Fonts are loaded per style in app/[style]/layout.tsx (and all four on the landing page). */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
