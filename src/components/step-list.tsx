"use client";
import { Step } from "@/interfaces/step.interface";
import { FC, useCallback, useEffect } from "react";
import { StepCard } from "./step-card";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { StepDetails } from "./step-details";
import { useQuery } from "@tanstack/react-query";
import { getFlowSteps } from "@/services/step.service";
import { v4 as uuidv4 } from "uuid";
import { updateFlowSteps } from "@/services/flow.service";
import { useStepStore } from "@/hooks/use-step-store";
import { Button, Spinner } from "@heroui/react";

export const StepList: FC<{ flowId: string }> = ({ flowId }) => {
  const { data: stepsData, isFetching } = useQuery({
    queryKey: ["flow", flowId, "steps"],
    queryFn: () => getFlowSteps(flowId),
    initialData: [],
    enabled: !!flowId,
  });
  const { steps, selectStep, setSteps, updateStep, addStep, deleteStep } =
    useStepStore((s) => s);

  // Move card logic for React DnD
  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setSteps((prevSteps) => {
        const updatedSteps = [...prevSteps];
        const [draggedStep] = updatedSteps.splice(dragIndex, 1);
        updatedSteps.splice(hoverIndex, 0, draggedStep);
        return updatedSteps.map((step, index) => ({
          ...step,
          order: index,
        }));
      });
    },
    [setSteps]
  );

  // Render individual StepCard
  const renderCard = useCallback(
    (step: Step, index: number) => (
      <StepCard
        key={step.id}
        step={step}
        index={index}
        moveCard={moveCard}
        onClick={() => selectStep(step)}
        onDelete={onStepDelete}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [moveCard]
  );

  // Update step when details change
  const onStepChange = (step: Step | null) => {
    if (step) updateStep(step);
    selectStep(step);
  };

  const onStepAdd = () => {
    addStep({
      id: uuidv4(),
      flowId,
      description: null,
      order: steps.length,
      functionBlock: null,
      functionId: null,
      parameters: [],
    });
  };

  const onSave = () => {
    return updateFlowSteps(flowId, steps);
  };

  const onStepDelete = (step: Step) => {
    deleteStep(step);
  };

  // Initialize steps from `stepsData`
  useEffect(() => {
    if (stepsData) {
      setSteps(stepsData);
    }
  }, [stepsData, setSteps]);

  if (isFetching) return <Spinner />;

  return (
    <div className="flex">
      <div className="flex flex-col">
        <h1>Steps List</h1>
        <Button onPress={onSave}>Save</Button>
      </div>
      <div className="flex flex-col justify-between">
        {/* <DndProvider backend={HTML5Backend}>
          <div>{steps.map((step, index) => renderCard(step, index))}</div>
        </DndProvider>
        <Button onClick={onStepAdd}>
          <AddIcon />
        </Button> */}
      </div>
      {/* <StepDetails onStepChange={onStepChange} /> */}
    </div>
  );
};
