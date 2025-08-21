import type { Metadata } from "next";
import { Archivo_Black } from "next/font/google";
import "./globals.css";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
});

export const metadata: Metadata = {
  title: "LEBOHANG™ MAKATENG - Portfolio",
  description: "Personal portfolio and website of Lebohang Makateng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${archivoBlack.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
