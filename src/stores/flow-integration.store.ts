import { FlowIntegration } from "@/interfaces/flow-integration.interface";
import { createStore } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { FlowIntegrationSecret } from "@/interfaces/flow-integration-secret.interface";

interface FlowIntegrationProps {
  flowIntegrations: FlowIntegration[];
}

export interface FlowIntegrationState extends FlowIntegrationProps {
  setFlowIntegrations: (
    flowIntegrations:
      | FlowIntegration[]
      | ((prevFlowIntegrations: FlowIntegration[]) => FlowIntegration[])
  ) => void;
  addFlowIntegration: (flowIntegration: FlowIntegration) => void;
  updateFlowIntegration: (flowIntegration: FlowIntegration) => void;
  addFlowIntegrationSecret: (flowIntegrationId: number) => void;
  updateFlowIntegrationSecret: (
    flowIntegrationSecret: Partial<FlowIntegrationSecret>
  ) => void;
}

export type FlowIntegrationStore = ReturnType<
  typeof createFlowIntegrationStore
>;

export const createFlowIntegrationStore = (
  initProps?: Partial<FlowIntegrationProps>
) => {
  const DEFAULT_PROPS: FlowIntegrationProps = {
    flowIntegrations: [],
  };
  return createStore<FlowIntegrationState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    setFlowIntegrations(
      flowIntegrations:
        | FlowIntegration[]
        | ((prevFlowIntegrations: FlowIntegration[]) => FlowIntegration[])
    ) {
      set((state) => ({
        flowIntegrations:
          typeof flowIntegrations === "function"
            ? flowIntegrations(state.flowIntegrations)
            : flowIntegrations,
      }));
    },
    addFlowIntegration: (flowIntegration: FlowIntegration) =>
      set((state) => ({
        flowIntegrations: [...state.flowIntegrations, flowIntegration],
      })),
    updateFlowIntegration: (flowIntegration: FlowIntegration) =>
      set((state) => ({
        flowIntegrations: state.flowIntegrations.map((f) => {
          if (f.id === flowIntegration.id) {
            return flowIntegration;
          }
          return f;
        }),
      })),
    addFlowIntegrationSecret: (flowIntegrationId: number) =>
      set((state) => ({
        flowIntegrations: state.flowIntegrations.map((flowIntegration) => {
          if (flowIntegration.id === flowIntegrationId) {
            return {
              ...flowIntegration,
              secrets: [
                ...flowIntegration.secrets,
                {
                  id: uuidv4(),
                  flowIntegrationId: flowIntegration.id,
                  key: "",
                  value: "",
                },
              ],
            };
          }
          return flowIntegration;
        }),
      })),
    updateFlowIntegrationSecret: (
      flowIntegrationSecret: Partial<FlowIntegrationSecret>
    ) =>
      set((state) => ({
        flowIntegrations: state.flowIntegrations.map((flowIntegration) => {
          if (flowIntegration.id === flowIntegrationSecret.flowIntegrationId) {
            return {
              ...flowIntegration,
              secrets: flowIntegration.secrets.map((secret) => {
                if (secret.id === flowIntegrationSecret.id) {
                  return {
                    ...secret,
                    ...flowIntegrationSecret,
                  };
                }
                return secret;
              }),
            };
          }
          return flowIntegration;
        }),
      })),
  }));
};
