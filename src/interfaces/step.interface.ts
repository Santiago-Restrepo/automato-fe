import { FunctionBlock } from "./function-block-interface.";
import { StepParameter } from "./step-parameter.interface";

export interface Step {
  id: string;
  description: string | null;
  order: number;
  functionBlock: FunctionBlock | null;
  parameters: StepParameter[];
  isSelected?: boolean;
}
