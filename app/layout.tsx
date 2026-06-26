import "./globals.css";
import { britishRail, newRail, abrilFatface, mrsEaves } from "../lib/fonts";

export const metadata = {
  title: "Gabriel Folio",
  description: "Multi-lane website portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${britishRail.variable} ${newRail.variable} ${abrilFatface.variable} ${mrsEaves.variable}`}
      >
        {children}
      </body>
    </html>
  );
}