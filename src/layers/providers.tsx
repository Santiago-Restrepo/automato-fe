import { createStepStore } from "@/app/stores/step-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRef } from "react";
import { StepsContext } from "./step-context";
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
    <QueryClientProvider client={queryClient}>
      <StepsContext.Provider value={store}>{children}</StepsContext.Provider>
    </QueryClientProvider>
  );
};
