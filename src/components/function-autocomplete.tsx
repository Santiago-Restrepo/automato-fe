import { FunctionBlock } from "@/interfaces/function-block-interface.";
import { Step } from "@/interfaces/step.interface";
import { getFunctions } from "@/services/function.service";
import { functionParameterToStepParameter } from "@/utils/function-parameter-to-step-parameter";
import { Autocomplete, Box, Typography } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import { FC, SyntheticEvent, useState } from "react";

export const FunctionAutoComplete: FC<{
  selectedStep: Step | null;
  onStepChange: (step: Step | null) => void;
}> = ({ selectedStep, onStepChange }) => {
  const [functionAutocompleteOpen, setFunctionAutocompleteOpen] =
    useState(false);
  const { data: options, isLoading: loading } = useQuery({
    queryKey: ["functions"],
    queryFn: getFunctions,
    initialData: [],
  });
  const onChange = (
    _event: SyntheticEvent<Element, Event>,
    newValue: FunctionBlock | null
  ) => {
    if (!newValue || !selectedStep) return;
    const newParameters = newValue.parameters.map((p) => {
      return functionParameterToStepParameter(p, selectedStep);
    });

    const newStep: Step = {
      ...selectedStep,
      parameters: newParameters,
      functionBlock: newValue,
    };
    onStepChange(newStep);
  };
  return (
    <Box>
      <Typography level="body-sm" fontWeight="bold" mb={1}>
        Function
      </Typography>
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
        isOptionEqualToValue={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name}
        options={options}
        value={selectedStep?.functionBlock || null}
        onChange={onChange}
        loading={loading}
      />
    </Box>
  );
};
