"use client";
import { createStepStore } from "@/stores/step-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRef } from "react";
import { StepsContext } from "./step-context";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
export const Providers = ({ children }: { children: React.ReactNode }) => {
  const store = useRef(createStepStore()).current;
  return (
    <SessionProvider>
      <HeroUIProvider>
        <QueryClientProvider client={queryClient}>
          <StepsContext.Provider value={store}>
            <ToastProvider placement="top-right" />
            {children}
          </StepsContext.Provider>
        </QueryClientProvider>
      </HeroUIProvider>
    </SessionProvider>
  );
};
