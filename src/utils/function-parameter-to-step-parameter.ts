import { FunctionParameter } from "@/interfaces/function-parameter.interface";
import { StepParameter } from "@/interfaces/step-parameter.interface";
import { Step } from "@/interfaces/step.interface";
import { v4 as uuidv4 } from "uuid";

export const functionParameterToStepParameter = (
  functionParameter: FunctionParameter,
  step: Step
): StepParameter => {
  return {
    id: uuidv4(),
    value: "",
    inputStepId: step.id,
    outputStepId: null,
    functionParameterId: functionParameter.id,
    functionParameter,
  };
};
