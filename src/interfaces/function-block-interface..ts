import { FunctionParameter } from "./function-parameter.interface";

export interface FunctionBlock {
  readonly id: number;
  name: string;
  description: string | null;
  parameters: FunctionParameter[];
}
