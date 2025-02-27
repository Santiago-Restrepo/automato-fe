import { FlowList } from "@/app/(admin)/flows/_components/FlowList";
import { getAllFlows } from "@/services/flow.service";

export default async function FlowsPage() {
  const data = await getAllFlows();
  if (!data) throw new Error("No flows found");
  return (
    <div>
      <FlowList flows={data} />
    </div>
  );
}
