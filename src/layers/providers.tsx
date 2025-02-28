"use client";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { SessionProvider } from "next-auth/react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <HeroUIProvider>
        <ToastProvider placement="top-right" />
        {children}
      </HeroUIProvider>
    </SessionProvider>
  );
};
