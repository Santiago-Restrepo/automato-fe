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
import { Button } from "@heroui/react";
import { useStepStore } from "@/hooks/use-step-store";
import { v4 as uuidv4 } from "uuid";
import { SortableStep } from "./SortableStep";
import { FunctionBlock } from "@/interfaces/function-block-interface.";

export const FlowDetail: FC<{
  flowId: string;
  initialSteps: Step[];
  functionBlocks: FunctionBlock[];
}> = ({ flowId, initialSteps, functionBlocks }) => {
  const { steps, setSteps, addStep } = useStepStore((s) => s);

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
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

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

  useEffect(() => {
    setSteps(initialSteps);
  }, [initialSteps]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-900">
          Daily Data Backup
        </h1>
        <Button color="secondary" size="sm" onPress={onStepAdd}>
          <Plus className="h-4 w-4 mr-1.5" />
          Add Step
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={steps} strategy={verticalListSortingStrategy}>
          {steps.map((step) => (
            <SortableStep
              key={step.id}
              step={step}
              functionBlocks={functionBlocks}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};
