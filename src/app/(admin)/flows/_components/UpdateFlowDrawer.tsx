import { Flow } from "@/interfaces/flow.interface";
import {
  addToast,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Form,
  Input,
} from "@heroui/react";
import { FC, FormEvent } from "react";
import { saveFlowDetails } from "../_actions/SaveFlowDetails.action";
import { FlowForm } from "./FlowForm";
import { redirect } from "next/navigation";

export const UpdateFlowDrawer: FC<{
  isOpen: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  selectedFlow: Flow | null;
}> = ({ isOpen, onOpenChange, selectedFlow }) => {
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.currentTarget)) as any as Flow;
    if (!selectedFlow) return;
    const response = await saveFlowDetails(data, "update", selectedFlow.id);
    if (response.status === 200) {
      onOpenChange?.(false);
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
  return (
    <Drawer backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        {() => (
          <>
            <DrawerHeader className="flex flex-col gap-1">
              <h2 className="text-medium font-semibold">
                {selectedFlow?.name} Details
              </h2>
            </DrawerHeader>
            <DrawerBody>
              {selectedFlow && (
                <FlowForm onSubmit={onSubmit} defaultValues={selectedFlow} />
              )}
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};
