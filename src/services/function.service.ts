import { FunctionBlock } from "@/interfaces/function-block-interface.";
import { api } from "@/layers/api";

export const getFunctions = async () => {
  const { data } = await api.get<FunctionBlock[]>("functions");
  return data;
};
