"use client";
import { Step } from "@/interfaces/step.interface";
import { FC, useCallback, useEffect } from "react";
import { StepCard } from "./step-card";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button, CircularProgress, Divider, Stack, Typography } from "@mui/joy";
import { StepDetails } from "./step-details";
import { useStepStore } from "@/app/hooks/use-step-store";
import { useQuery } from "@tanstack/react-query";
import { getFlowSteps } from "@/services/step.service";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";
import { updateFlowSteps } from "@/services/flow.service";

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

  if (isFetching)
    return (
      <Stack my={2} alignItems="center">
        <CircularProgress size="md" />
      </Stack>
    );

  return (
    <Stack my={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography level="title-lg">Steps List</Typography>
        <Button onClick={onSave}>Save</Button>
      </Stack>
      <Divider sx={{ my: 1 }} />
      <Stack
        direction="column"
        justifyContent="space-between"
        sx={{
          overflow: "auto",
          px: 30,
          minWidth: 600,
          py: 5,
          mx: "auto",
          backgroundColor: "#f5f5f5",
          backgroundImage: `linear-gradient(45deg, rgba(200, 200, 200, 0.3) 25%, transparent 25%, transparent 75%, rgba(200, 200, 200, 0.3) 75%),
                      linear-gradient(45deg, transparent 25%, rgba(200, 200, 200, 0.3) 25%, rgba(200, 200, 200, 0.3) 75%, transparent 75%)`,
          backgroundSize: "30px 30px",
          backgroundPosition: "0 0, 15px 15px",

          borderRadius: 5,
        }}
      >
        <DndProvider backend={HTML5Backend}>
          <div>{steps.map((step, index) => renderCard(step, index))}</div>
        </DndProvider>
        <Button onClick={onStepAdd}>
          <AddIcon />
        </Button>
      </Stack>
      <StepDetails onStepChange={onStepChange} />
    </Stack>
  );
};
