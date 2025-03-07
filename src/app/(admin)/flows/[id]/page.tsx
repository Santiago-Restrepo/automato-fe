import { getFlowSteps } from "@/services/step.service";
import { FlowDetails } from "./_components/FlowDetails";
import { getFunctionBlocks } from "@/services/function.service";
import { getFlow } from "@/services/flow.service";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: flowId } = await params;
  if (!flowId) throw new Error("Missing flowId");
  const flow = await getFlow(flowId);
  const steps = await getFlowSteps(flowId);
  const functionBlocks = await getFunctionBlocks();
  return (
    <FlowDetails
      flow={flow}
      initialSteps={steps}
      functionBlocks={functionBlocks}
    />
  );
}
