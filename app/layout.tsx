import "./globals.css";

export const metadata = {
  title: "Gabriel Folio",
  description: "Multi-lane website portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}