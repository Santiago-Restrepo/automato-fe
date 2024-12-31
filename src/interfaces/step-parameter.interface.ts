import { ParameterValue } from "@/types/parameter-value.type";
import { FunctionParameter } from "./function-parameter.interface";

export interface StepParameter {
  readonly id: number;
  value: ParameterValue;
  inputStepId: number;
  functionParameterId: number;
  functionParameter: FunctionParameter;
}
