import { Flow } from "@/interfaces/flow.interface";
import { api } from "@/layers/api";

export const getAllFlows = async () => {
  const { data } = await api.get<Flow[]>("flow");
  return data;
};
