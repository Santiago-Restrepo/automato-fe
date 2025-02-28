"use server";

import { Step } from "@/interfaces/step.interface";
import { updateFlowSteps } from "@/services/flow.service";

export async function saveFlowSteps(flowId: string, steps: Step[]) {
  return updateFlowSteps(flowId, steps);
}
