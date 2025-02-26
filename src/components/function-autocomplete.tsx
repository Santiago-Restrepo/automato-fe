import { useStepStore } from "@/hooks/use-step-store";
import { FunctionBlock } from "@/interfaces/function-block-interface.";
import { Step } from "@/interfaces/step.interface";
import { functionParameterToStepParameter } from "@/utils/function-parameter-to-step-parameter";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { FC, Key, useMemo } from "react";

export const FunctionAutoComplete: FC<{
  step: Step;
  functionBlocks: FunctionBlock[];
}> = ({ step, functionBlocks }) => {
  const { updateStep } = useStepStore((s) => s);

  const items = useMemo(() => {
    return functionBlocks.map((fb) => {
      return {
        label: fb.name,
        id: fb.id,
      };
    });
  }, [functionBlocks]);

  const onChange = (key: Key | null) => {
    if (!key) return;
    const newValue = functionBlocks.find((fb) => fb.id === key);
    if (!newValue) return;
    const newParameters = newValue.parameters.map((p) => {
      return functionParameterToStepParameter(p, step);
    });

    const newStep: Step = {
      ...step,
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
        selectedKey={step.functionId}
        onSelectionChange={onChange}
      >
        {items.map((item) => (
          <AutocompleteItem key={item.id}>{item.label}</AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
};
