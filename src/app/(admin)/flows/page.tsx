import { FlowList } from "@/components/flow-list";
import { getAllFlows } from "@/services/flow.service";

export default async function FlowsPage() {
  const data = await getAllFlows();
  return (
    <div>
      <FlowList flows={data} />
    </div>
  );
}
