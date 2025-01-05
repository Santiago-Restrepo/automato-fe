import { useStepStore } from "@/app/hooks/use-step-store";
import { StepParameter } from "@/interfaces/step-parameter.interface";
import { Step } from "@/interfaces/step.interface";
import {
  Autocomplete,
  Input,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/joy";
import { FC } from "react";

export const StepParameterList: FC<{
  stepParameters: StepParameter[];
  options: Step[];
}> = ({ stepParameters, options }) => {
  const { updateStepParameter } = useStepStore((s) => s);
  return (
    <List>
      {stepParameters.map((parameter, index) => (
        <ListItem key={index}>
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
  );
};
