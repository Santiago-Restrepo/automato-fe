import { useStepStore } from "@/hooks/use-step-store";
import { StepParameter } from "@/interfaces/step-parameter.interface";
import { Step } from "@/interfaces/step.interface";
import { Autocomplete, AutocompleteItem, Input } from "@heroui/react";

import { FC, useMemo } from "react";

export const StepParameterList: FC<{
  stepParameters: StepParameter[];
  steps: Step[];
}> = ({ stepParameters, steps }) => {
  const { updateStepParameter } = useStepStore((s) => s);
  const items = useMemo(() => {
    return steps.map((step) => ({
      label: step.name,
      id: step.id,
    }));
  }, [steps]);
  return (
    <ul className="flex flex-col gap-3">
      {stepParameters.map((parameter, index) => (
        <li key={index}>
          <div className="flex gap-3">
            <div className="flex-1">
              <small>{parameter.functionParameter?.key}</small>
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
            </div>
            <div className="flex-1">
              <small>Take Value from Output of</small>
              <Autocomplete
                items={items}
                selectedKey={parameter.outputStepId}
                onSelectionChange={(id) => {
                  updateStepParameter({
                    ...parameter,
                    outputStepId: id as string | null,
                  });
                }}
              >
                {items.map((item) => (
                  <AutocompleteItem key={item.id}>
                    {item.label}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
