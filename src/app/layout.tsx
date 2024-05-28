import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { SymbolListProvider } from "../contexts/SymbolListContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Binance App",
  description: "Cypto exchange info app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SymbolListProvider>{children}</SymbolListProvider>
      </body>
    </html>
  );
}
