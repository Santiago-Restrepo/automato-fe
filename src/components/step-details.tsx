import { Step } from "@/interfaces/step.interface";
import { getFunctions } from "@/services/function.service";
import {
  Autocomplete,
  Box,
  DialogTitle,
  Divider,
  Drawer,
  ModalClose,
  Sheet,
  Typography,
} from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

export const StepDetails: FC<{
  selectedStep: Step | null;
  setSelectedStep: Dispatch<SetStateAction<Step | null>>;
  onStepChange: (step: Step | null) => void;
}> = ({ selectedStep, onStepChange, setSelectedStep }) => {
  const [open, setOpen] = useState(false);
  const [functionAutocompleteOpen, setFunctionAutocompleteOpen] =
    useState(false);
  const { data: options, isLoading: loading } = useQuery({
    queryKey: ["functions"],
    queryFn: getFunctions,
    initialData: [],
  });

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
          setSelectedStep(null);
        }}
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
          <Box>
            <Autocomplete
              sx={{ width: 300 }}
              placeholder="Select a function"
              open={functionAutocompleteOpen}
              onOpen={() => {
                setFunctionAutocompleteOpen(true);
              }}
              onClose={() => {
                setFunctionAutocompleteOpen(false);
              }}
              isOptionEqualToValue={(option, value) =>
                option.name === value.name
              }
              getOptionLabel={(option) => option.name}
              options={options}
              value={selectedStep?.functionBlock || null}
              onChange={(_event, newValue) => {
                if (!newValue || !selectedStep) return;
                const newStep: Step = {
                  ...selectedStep,
                  functionBlock: newValue,
                };
                onStepChange(newStep);
              }}
              loading={loading}
            />
          </Box>
        </Sheet>
      </Drawer>
    </Box>
  );
};
