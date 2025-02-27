import { useStepStore } from "@/hooks/use-step-store";
import { FunctionBlock } from "@/interfaces/function-block-interface.";
import { Step } from "@/interfaces/step.interface";
import { functionParameterToStepParameter } from "@/utils/function-parameter-to-step-parameter";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { FC, Key, useMemo } from "react";

export const FunctionAutocomplete: FC<{
  selectedStep: Step;
  functionBlocks: FunctionBlock[];
}> = ({ selectedStep, functionBlocks }) => {
  const { updateStep } = useStepStore((s) => s);

  const items = useMemo(() => {
    return functionBlocks.map((fb) => {
      return {
        label: fb.name,
        id: fb.id,
      };
    });
  }, [functionBlocks]);

  const onChange = (selectedFunctionId: Key | null) => {
    if (!selectedFunctionId) return;
    const newValue = functionBlocks.find(
      (fb) => fb.id === Number(selectedFunctionId)
    );
    if (!newValue) return;
    const newParameters = newValue.parameters.map((p) => {
      return functionParameterToStepParameter(p, selectedStep);
    });

    const newStep: Step = {
      ...selectedStep,
      parameters: newParameters,
      functionId: newValue.id,
      functionBlock: newValue,
    };
    updateStep(newStep);
  };
  return (
    <div>
      <Autocomplete
        placeholder="Select a function"
        items={items}
        selectedKey={String(selectedStep.functionId)}
        inputValue={selectedStep.functionBlock?.name}
        onSelectionChange={onChange}
      >
        {items.map((item) => (
          <AutocompleteItem key={item.id}>{item.label}</AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
};
