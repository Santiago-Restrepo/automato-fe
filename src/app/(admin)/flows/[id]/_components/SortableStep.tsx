import { Step } from "@/interfaces/step.interface";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Menu, Settings2 } from "lucide-react";
import { FC } from "react";
import { FunctionBlock } from "@/interfaces/function-block-interface.";
import { Button } from "@heroui/react";

export const SortableStep: FC<{
  step: Step;
  onSelectStep: (step: Step) => void;
}> = ({ step, onSelectStep }) => {
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
        </div>
        <Button
          variant="ghost"
          color="secondary"
          onPress={() => onSelectStep(step)}
        >
          <Settings2 />
        </Button>
      </div>
    </div>
  );
};
