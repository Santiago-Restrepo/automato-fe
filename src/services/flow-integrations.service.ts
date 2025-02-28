import { FlowIntegration } from "@/interfaces/flow-integration.interface";
import api from "@/layers/api";

export const getFlowIntegrations = async (flowId: string) => {
  const { data } = await api.get<FlowIntegration[]>(
    `flow/${flowId}/integrations`
  );
  return data;
};

export const updateFlowIntegration = async (
  flowIntegrationId: number,
  flowIntegration: Partial<FlowIntegration>
) => {
  const { data, status } = await api.patch<FlowIntegration>(
    `flow-integration/${flowIntegrationId}`,
    flowIntegration
  );
  return { status, data };
};
