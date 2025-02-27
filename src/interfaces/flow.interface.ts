import { Step } from "./step.interface";

export interface Flow {
  readonly id: string;
  readonly createdAt: string;
  name: string;
  description: string | null;
  steps?: Step[] | null;
}
