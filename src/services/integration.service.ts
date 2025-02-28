import { Integration } from "@/interfaces/integration.interface";
import api from "@/layers/api";

export const getIntegrations = async () => {
  const { data } = await api.get<Integration[]>("integration");
  return data;
};
