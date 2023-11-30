import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { NavDrawer } from "@/components/NavDrawer";
import { SearchDrawer } from "@/components/SearchDrawer";

export const metadata: Metadata = {
  title: "Paloma Hernandez",
  description: "La natura en nuestra principal inspiracion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="px-6">
        <Nav />
        {children}
        <NavDrawer isOpen={false} toggle={() => ""} />
        <SearchDrawer isOpen={false} toggle={() => ""} />
      </body>
    </html>
  );
}
