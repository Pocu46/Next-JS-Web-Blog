import type {Metadata} from "next";
import {Inter} from "next/font/google";
import Header from "@/components/Header";
import WrapperComponent from "@/UI/WrapperComponent";
import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Web Blog App",
  description: "Create some articles to save them",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />

        <WrapperComponent style="m-auto w-[960px] h-[calc(100vh_-_64px)]">
          {children}
        </WrapperComponent>

        <div id="modalId" />
      </body>
    </html>
  );
}
