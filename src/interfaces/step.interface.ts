import { FunctionBlock } from "./function-block-interface.";
import { StepParameter } from "./step-parameter.interface";

export interface Step {
  id: string;
  flowId: string;
  name: string;
  description: string | null;
  order: number;
  functionId: number | null;
  functionBlock: FunctionBlock | null;
  parameters: StepParameter[];
  isSelected?: boolean;
}
