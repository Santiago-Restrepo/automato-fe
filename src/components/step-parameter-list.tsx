import { useStepStore } from "@/app/hooks/use-step-store";
import {
  Autocomplete,
  Box,
  Input,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/joy";
import { FC, useMemo } from "react";

export const StepParameterList: FC = () => {
  const { steps, updateStepParameter } = useStepStore((s) => s);
  const selectedStep = useMemo(() => {
    return steps.find((s) => s.isSelected);
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

      <List>
        {selectedStep?.parameters.map((parameter) => (
          <ListItem key={parameter.id}>
            <Stack direction="row" spacing={2}>
              <Stack>
                <Typography level="body-sm" mb={1}>
                  {parameter.functionParameter?.key}
                </Typography>
                <Input
                  value={parameter.value || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    updateStepParameter({
                      ...parameter,
                      value,
                    });
                  }}
                />
              </Stack>
              <Stack>
                <Typography level="body-sm" mb={1}>
                  Take Value from Output of
                </Typography>
                <Autocomplete
                  options={options}
                  getOptionLabel={(option) => `Step ${option.id}`}
                  value={
                    options.find((o) => o.id === parameter.outputStepId) || null
                  }
                  onChange={(e, value) => {
                    updateStepParameter({
                      ...parameter,
                      outputStepId: value?.id || null,
                    });
                  }}
                />
              </Stack>
            </Stack>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
