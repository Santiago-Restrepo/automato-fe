import { Flow } from "@/interfaces/flow.interface";
import { Step } from "@/interfaces/step.interface";
import api from "@/layers/api";

export const getAllFlows = async () => {
  const { data } = await api.get<Flow[]>("flow");
  return data;
};

export const getFlow = async (flowId: string) => {
  const { data } = await api.get<Flow>(`flow/${flowId}`);
  return data;
};

export const createFlow = async (flow: Flow) => {
  const { data, status } = await api.post<Flow>("flow", flow);
  return { status, data };
};

export const updateFlow = async (flowId: string, flow: Partial<Flow>) => {
  const { data, status } = await api.patch<Flow>(`flow/${flowId}`, flow);
  return { status, data };
};

export const updateFlowSteps = async (flowId: string, steps: Step[]) => {
  const { data, status } = await api.put<Step[]>(`flow/${flowId}/steps`, steps);
  return { status, data };
};
