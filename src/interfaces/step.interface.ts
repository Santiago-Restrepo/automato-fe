import { FunctionBlock } from "./function-block-interface.";
import { StepParameter } from "./step-parameter.interface";

export interface Step {
  readonly id: number;
  description: string | null;
  order: number;
  functionBlock: FunctionBlock | null;
  parameters: StepParameter[];
}
