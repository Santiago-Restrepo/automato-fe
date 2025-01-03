"use client";
import { Providers } from "@/layers/providers";
import "./globals.css";
import DrawerHeader from "@/components/drawer-header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-600">
        <Providers>
          <DrawerHeader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
