"use client";
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
        <DrawerHeader />
        {children}
      </body>
    </html>
  );
}
