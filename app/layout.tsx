import { Ad, Footer, Header } from "@/components/shared";
import type { Metadata } from "next";
import { Montserrat as FontSans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const fontSans = FontSans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Тера Меблі",
  description: "Інтернет магазин меблів",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${fontSans.variable}`}>
        <Ad />
        <Providers>
          <Header />
          <main className="main">{children}</main>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
