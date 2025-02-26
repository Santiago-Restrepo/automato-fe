import { getFlowSteps } from "@/services/step.service";
import { FlowDetail } from "./_components/FlowDetail";
import { getFunctionBlocks } from "@/services/function.service";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: flowId } = await params;
  if (!flowId) throw new Error("Missing flowId");
  const steps = await getFlowSteps(flowId);
  const functionBlocks = await getFunctionBlocks();
  console.log(functionBlocks);
  return (
    <FlowDetail
      flowId={flowId}
      initialSteps={steps}
      functionBlocks={functionBlocks}
    />
  );
}
