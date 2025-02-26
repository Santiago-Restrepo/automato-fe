import { FunctionBlock } from "@/interfaces/function-block-interface.";
import api from "@/layers/api";

export const getFunctionBlocks = async () => {
  const { data } = await api.get<FunctionBlock[]>("function");
  return data;
};
