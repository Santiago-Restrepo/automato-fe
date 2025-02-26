import { Step } from "@/interfaces/step.interface";
import api from "@/layers/api";

export const getFlowSteps = async (flowId: string) => {
  const { data } = await api.get<Step[]>(`flow/${flowId}/steps`);
  return data;
};
