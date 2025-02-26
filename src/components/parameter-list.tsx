import { FC, useMemo } from "react";
import { StepParameterList } from "../app/(admin)/flows/[id]/_components/StepParameterList";
import { useStepStore } from "@/hooks/use-step-store";

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
    <div>
      <h1>Parameters</h1>
      {/* <StepParameterList
        options={options}
        stepParameters={selectedStep?.parameters || []}
      /> */}
    </div>
  );
};
