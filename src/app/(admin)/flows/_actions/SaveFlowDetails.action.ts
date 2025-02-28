"use server";

import { Flow } from "@/interfaces/flow.interface";
import { createFlow, updateFlow } from "@/services/flow.service";

export async function saveFlowDetails(
  flow: Flow,
  action: "create" | "update",
  flowId?: string
) {
  if (action === "create") {
    return createFlow(flow);
  }
  if (!flowId) throw new Error("Missing flowId");
  return updateFlow(flowId, flow);
}
