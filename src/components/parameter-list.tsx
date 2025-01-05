import { Box, Typography } from "@mui/joy";
import { FC, useMemo } from "react";
import { StepParameterList } from "./step-parameter-list";
import { useStepStore } from "@/app/hooks/use-step-store";

export const ParameterList: FC = () => {
  const { steps } = useStepStore((s) => s);

  const selectedStep = useMemo(() => {
    return steps.find((s) => s.isSelected) || null;
  }, [steps]);
  const options = useMemo(() => {
    if (!selectedStep) return [];
    return steps.filter((s) => s.order < selectedStep?.order);
  }, [steps, selectedStep]);

  return (
    <Box>
      <Typography level="body-sm" fontWeight="bold" mb={1}>
        Parameters
      </Typography>
      <StepParameterList
        options={options}
        stepParameters={selectedStep?.parameters || []}
      />
    </Box>
  );
};
