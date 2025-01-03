import { FlowList } from "@/components/flow-list";
import { getAllFlows } from "@/services/flow.service";
import { Box } from "@mui/joy";

export default async function FlowsPage() {
  const data = await getAllFlows();

  return (
    <Box sx={{ width: "100%", marginTop: 1 }}>
      <FlowList flows={data} />
    </Box>
  );
}
