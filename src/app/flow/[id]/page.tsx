import { StepList } from "@/components/step-list";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const flowId = (await params).id;
  return <StepList flowId={Number(flowId)} />;
}
