"use client";

import { FC, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import { Step } from "@/interfaces/step.interface";
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
} from "@heroui/react";
import { useStepStore } from "@/hooks/use-step-store";
import { v4 as uuidv4 } from "uuid";
import { SortableStep } from "./SortableStep";
import { FunctionBlock } from "@/interfaces/function-block-interface.";
import { StepDetailDrawer } from "./StepDetailDrawer";
import { Flow } from "@/interfaces/flow.interface";
import { saveFlowSteps } from "../_actions/saveFlowSteps.action";
import { redirect } from "next/navigation";

export const FlowDetail: FC<{
  flow: Flow;
  initialSteps: Step[];
  functionBlocks: FunctionBlock[];
}> = ({ flow, initialSteps, functionBlocks }) => {
  const { steps, setSteps, addStep, selectStep, deleteStep } = useStepStore(
    (s) => s
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSteps((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        return newItems.map((item, index) => {
          return {
            ...item,
            order: index,
          };
        });
      });
    }
  }

  const onStepAdd = () => {
    addStep({
      id: uuidv4(),
      flowId: flow.id,
      description: null,
      order: steps.length,
      functionBlock: null,
      functionId: null,
      parameters: [],
    });
  };

  const onSelectStep = (step: Step) => {
    onOpen();
    selectStep(step);
  };

  const onDeleteStep = (step: Step) => {
    deleteStep(step);
  };

  const onSaveFlow = async () => {
    const response = await saveFlowSteps(flow.id, steps);
    if (response.status === 200) {
      addToast({
        title: "Flow saved",
        color: "success",
      });
      redirect("/flows");
    } else {
      addToast({
        title: "Error saving flow",
        color: "danger",
      });
    }
  };

  useEffect(() => {
    setSteps(initialSteps);
  }, [initialSteps]);

  return (
    <div className="flex h-full justify-center bg-white">
      <Card
        className="w-full max-w-4xl p-2 mt-10 border-1.5 border-gray-200"
        shadow="none"
      >
        <CardHeader className="flex justify-between">
          <h1 className="text-xl font-semibold text-gray-900">{flow.name}</h1>
          <div className="flex gap-2">
            <Button color="primary" size="sm" onPress={onStepAdd}>
              <Plus className="h-4 w-4 mr-1.5" />
              Add Step
            </Button>
            <Button
              color="primary"
              variant="bordered"
              size="sm"
              onPress={() => onSaveFlow()}
            >
              Save
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <StepDetailDrawer
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            functionBlocks={functionBlocks}
          />
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={steps}
              strategy={verticalListSortingStrategy}
            >
              {steps.map((step) => (
                <SortableStep
                  key={step.id}
                  step={step}
                  onSelectStep={onSelectStep}
                  onDeleteStep={onDeleteStep}
                />
              ))}
            </SortableContext>
          </DndContext>
        </CardBody>
      </Card>
    </div>
  );
};
