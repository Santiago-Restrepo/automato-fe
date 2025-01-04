import { FunctionParameter } from "./function-parameter.interface";

export interface StepParameter {
  readonly id: number;
  value: string;
  inputStepId: number;
  outputStepId: number | null;
  functionParameterId: number;
  functionParameter: FunctionParameter;
}
