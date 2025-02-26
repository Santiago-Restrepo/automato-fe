import { Step } from "./step.interface";

export interface Flow {
  readonly id: number;
  readonly createdAt: string;
  name: string;
  description: string | null;
  steps?: Step[] | null;
}
