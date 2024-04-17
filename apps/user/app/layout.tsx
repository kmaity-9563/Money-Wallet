import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../provider";
import AppbarComponent from "../components/AppbarComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Money Wallet",
  description: "Money Wallet  turbo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
       <Providers>
      <body className={inter.className}>
        <AppbarComponent/>
        {children}
        </body>
      </Providers>
    </html>
  );
}
