import localFont from "next/font/local";

export const britishRail = localFont({
  src: "../public/fonts/britrln_.woff2",
  variable: "--font-british-rail",
  display: "swap",
});

export const newRail = localFont({
  src: "../public/fonts/NewRailAlphabet-White.woff2",
  variable: "--font-new-rail",
  display: "swap",
});

export const displayFont = localFont({
  src: "../public/fonts/AbrilFatface-Regular.woff2",
  variable: "--font-display",
  display: "swap",
});

export const bodyFont = localFont({
  src: "../public/fonts/MrsEavesXLSerifOT-Reg.woff2",
  variable: "--font-body",
  display: "swap",
});