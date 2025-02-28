import { FlowIntegrationStore } from "@/stores/flow-integration.store";
import { createContext } from "react";

export const FlowIntegrationContext =
  createContext<FlowIntegrationStore | null>(null);
