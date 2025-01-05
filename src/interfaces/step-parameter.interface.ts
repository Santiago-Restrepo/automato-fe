import { FunctionParameter } from "./function-parameter.interface";

export interface StepParameter {
  readonly id: string;
  value: string;
  inputStepId: string;
  outputStepId: string | null;
  functionParameterId: number;
  functionParameter: FunctionParameter;
}
