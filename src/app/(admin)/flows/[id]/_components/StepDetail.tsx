import { useStepStore } from "@/hooks/use-step-store";
import { FunctionBlock } from "@/interfaces/function-block-interface.";
import {
  Accordion,
  AccordionItem,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from "@heroui/react";
import { FC, useMemo } from "react";
import { FunctionAutocomplete } from "./FunctionAutocomplete";
import { StepParameterList } from "./StepParameterList";

export const StepDetail: FC<{
  isOpen: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  functionBlocks: FunctionBlock[];
}> = ({ isOpen, onOpenChange, functionBlocks }) => {
  const { steps } = useStepStore((s) => s);
  const selectedStep = steps.find((s) => s.isSelected) || null;
  if (!selectedStep) return null;
  const selectableSteps = steps.filter((s) => s.order < selectedStep?.order);
  return (
    <Drawer backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex flex-col gap-1">
              <h2 className="text-medium font-semibold">Step Details</h2>
              <small className="text-gray-500 text-sm font-normal">
                {selectedStep?.description || "No description"}
              </small>
            </DrawerHeader>
            <DrawerBody>
              <div className="mt-2">
                <div className="w-full mb-4">
                  <h2 className="text-medium font-semibold mb-2">Function</h2>

                  {selectedStep ? (
                    <FunctionAutocomplete
                      selectedStep={selectedStep}
                      functionBlocks={functionBlocks}
                    />
                  ) : (
                    <small className="text-gray-500 text-sm font-normal">
                      No function
                    </small>
                  )}
                </div>
                <div className="w-full">
                  <h2 className="text-medium font-semibold mb-2">Parameters</h2>
                  {selectedStep ? (
                    <StepParameterList
                      stepParameters={selectedStep?.parameters}
                      steps={selectableSteps}
                    />
                  ) : (
                    <small className="text-gray-500 text-sm font-normal">
                      No parameters
                    </small>
                  )}
                </div>
              </div>
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};
