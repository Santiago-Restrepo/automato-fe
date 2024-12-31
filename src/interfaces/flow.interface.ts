import { Step } from "./step.interface";

export interface Flow {
  readonly id: number;
  name: string | null;
  steps?: Step[] | null;
}
