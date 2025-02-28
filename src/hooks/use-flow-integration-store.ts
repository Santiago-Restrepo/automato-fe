import { useContext } from "react";
import { useStore } from "zustand";
import { FlowIntegrationContext } from "@/layers/flow-integration-context";
import { FlowIntegrationState } from "@/stores/flow-integration.store";

export function useFlowIntegrationStore<T>(
  selector: (state: FlowIntegrationState) => T
): T {
  const store = useContext(FlowIntegrationContext);
  if (!store)
    throw new Error("Missing FlowIntegrationContext.Provider in the tree");
  return useStore(store, selector);
}
