import { FlowList } from "@/components/flow-list";
import { getAllFlows } from "@/services/flow.service";
import { Box, Typography } from "@mui/joy";

export default async function FlowsPage() {
  const data = await getAllFlows();

  return (
    <Box>
      <Typography
        level="h1"
        className="text-3xl text-center text-gray-300 my-4 pb-4 font-bold border-b border-gray-500"
      >
        Flows
      </Typography>
      <FlowList flows={data} />
    </Box>
  );
}
