"use server";

import { FlowIntegration } from "@/interfaces/flow-integration.interface";
import { updateFlowIntegration } from "@/services/flow-integrations.service";

export async function saveFlowIntegration(flowIntegration: FlowIntegration) {
  return updateFlowIntegration(flowIntegration.id, flowIntegration);
}
