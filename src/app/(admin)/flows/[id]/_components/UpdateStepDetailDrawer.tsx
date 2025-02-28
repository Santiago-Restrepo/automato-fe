import { useStepStore } from "@/hooks/use-step-store";
import { FunctionBlock } from "@/interfaces/function-block-interface.";
import {
  Accordion,
  AccordionItem,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Input,
} from "@heroui/react";
import { FC } from "react";
import { FunctionAutocomplete } from "./FunctionAutocomplete";
import { StepParameterList } from "./StepParameterList";
import { Step } from "@/interfaces/step.interface";

export const UpdateStepDetailDrawer: FC<{
  isOpen: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  functionBlocks: FunctionBlock[];
}> = ({ isOpen, onOpenChange, functionBlocks }) => {
  const { steps, updateStep } = useStepStore((s) => s);
  const selectedStep = steps.find((s) => s.isSelected) || null;
  if (!selectedStep) return null;
  const selectableSteps = steps.filter((s) => s.order < selectedStep?.order);

  const onStepNameChange = (name: string) => {
    if (!selectedStep) return;
    const newStep: Step = {
      ...selectedStep,
      name,
    };
    updateStep(newStep);
  };
  const onStepDescriptionChange = (description: string) => {
    if (!selectedStep) return;
    const newStep: Step = {
      ...selectedStep,
      description,
    };
    updateStep(newStep);
  };
  return (
    <Drawer backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        {() => (
          <>
            <DrawerBody className="p-5">
              <div>
                <h2 className="text-medium font-semibold">Step Details</h2>
                <small className="text-gray-500 text-sm font-normal">
                  Modify step details
                </small>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                  <Input
                    label="Name"
                    labelPlacement="outside"
                    value={selectedStep?.name || ""}
                    onValueChange={onStepNameChange}
                  />
                  <Input
                    label="Description"
                    labelPlacement="outside"
                    value={selectedStep?.description || ""}
                    onValueChange={onStepDescriptionChange}
                  />
                </div>
                <Divider />
                <div className="flex flex-col gap-3">
                  <div>
                    <h2 className="text-medium font-semibold">
                      Define Function
                    </h2>
                    <small className="text-gray-500 text-sm font-normal">
                      Define a function for this step
                    </small>
                  </div>
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
