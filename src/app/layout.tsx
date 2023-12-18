import type { Metadata } from "next";
import "./globals.css";
import "react-modern-drawer/dist/index.css";

import { Nav } from "@/components/Nav";
import { NavDrawer } from "@/components/NavDrawer";
import { SearchDrawer } from "@/components/SearchDrawer";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Paloma Hernandez",
  description: "Clothing | Naturaleza, inspiracion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="px-2 md:px-6">
        <Nav />
        {children}
        <NavDrawer />
        <SearchDrawer />
        <Footer />
      </body>
    </html>
  );
}
