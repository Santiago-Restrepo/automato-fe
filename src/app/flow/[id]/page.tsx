import { StepList } from "@/components/step-list";
import { getFlowSteps } from "@/services/step.service";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const flowId = (await params).id;
  const steps = await getFlowSteps(parseInt(flowId));
  if (!steps) return <p>Flow has no steps</p>;
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <StepList stepsData={steps} />
      </Suspense>
    </div>
  );
}
