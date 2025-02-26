import { Step } from "@/interfaces/step.interface";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Accordion, AccordionItem } from "@heroui/react";
import { Menu } from "lucide-react";
import { FC } from "react";
import { StepParameterList } from "./StepParameterList";
import { FunctionAutoComplete } from "@/components/function-autocomplete";
import { FunctionBlock } from "@/interfaces/function-block-interface.";

export const SortableStep: FC<{
  step: Step;
  functionBlocks: FunctionBlock[];
}> = ({ step, functionBlocks }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: step.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div ref={setNodeRef} style={style} className="p-3">
      <div
        className={`flex items-center gap-3 bg-white rounded-lg border p-4 mb-3 ${
          isDragging ? "shadow-lg" : "shadow-sm"
        }`}
      >
        <button className="touch-none" {...attributes} {...listeners}>
          <Menu className="h-5 w-5 text-gray-400 hover:text-gray-500" />
        </button>
        <div className="w-full">
          <h4 className="text-medium  font-medium">{step.id}</h4>
          <small className="text-xs text-gray-500">
            {step.description || "No description"}
          </small>
          <div className="flex gap-3 w-full mt-2">
            <div className="w-1/3">
              <FunctionAutoComplete
                step={step}
                functionBlocks={functionBlocks}
              />
            </div>
            <div className="w-2/3 bg-gray-50 rounded-lg">
              <Accordion variant="light" isCompact>
                <AccordionItem key="1" subtitle="Parameters">
                  <StepParameterList
                    stepParameters={step.parameters}
                    steps={[step]}
                  />
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
