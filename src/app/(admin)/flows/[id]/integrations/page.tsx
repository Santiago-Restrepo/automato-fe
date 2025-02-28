import { getIntegrations } from "@/services/integration.service";
import { FlowIntegrationsForm } from "./_components/FlowIntegrationsForm";
import { getFlowIntegrations } from "@/services/flow-integrations.service";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: flowId } = await params;
  if (!flowId) throw new Error("Missing flowId");
  const flowIntegrations = await getFlowIntegrations(flowId);
  const integrations = await getIntegrations();

  return (
    <FlowIntegrationsForm
      flowId={flowId}
      defaultFlowIntegrations={flowIntegrations}
      integrations={integrations}
    />
  );
}
