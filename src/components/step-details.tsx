import { Step } from "@/interfaces/step.interface";
import {
  Box,
  DialogTitle,
  Divider,
  Drawer,
  ModalClose,
  Sheet,
  Typography,
} from "@mui/joy";
import { FC, useEffect, useMemo, useState } from "react";
import { FunctionAutoComplete } from "./function-autocomplete";
import { useStepStore } from "@/app/hooks/use-step-store";
import { ParameterList } from "./parameter-list";

export const StepDetails: FC<{
  onStepChange: (step: Step | null) => void;
}> = ({ onStepChange }) => {
  const [open, setOpen] = useState(false);
  const { steps, selectStep } = useStepStore((s) => s);
  const selectedStep = useMemo(() => {
    return steps.find((s) => s.isSelected) || null;
  }, [steps]);
  useEffect(() => {
    if (selectedStep) {
      setOpen(true);
    }
  }, [selectedStep]);
  return (
    <Box>
      <Drawer
        open={open}
        onClose={() => {
          setOpen(false);
          selectStep(null);
        }}
        size="lg"
        variant="plain"
        anchor="right"
        slotProps={{
          content: {
            sx: {
              bgcolor: "transparent",
              p: { md: 3, sm: 0 },
              boxShadow: "none",
            },
          },
        }}
      >
        <Sheet
          sx={{
            borderRadius: "md",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <ModalClose />
          <DialogTitle>Step {selectedStep?.id}</DialogTitle>
          <Typography level="body-sm">
            {selectedStep?.description
              ? selectedStep.description
              : "No description"}
          </Typography>
          <Divider />
          <FunctionAutoComplete
            onStepChange={onStepChange}
            selectedStep={selectedStep}
          />
          <Divider />
          <ParameterList />
        </Sheet>
      </Drawer>
    </Box>
  );
};
