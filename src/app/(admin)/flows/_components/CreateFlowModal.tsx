"use client";

import {
  addToast,
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { FC, FormEvent } from "react";
import { FlowForm } from "./FlowForm";
import { Flow } from "@/interfaces/flow.interface";
import { saveFlowDetails } from "../_actions/SaveFlowDetails.action";
import { redirect } from "next/navigation";

export const CreateFlowModal: FC<{
  isOpen: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}> = ({ isOpen, onOpenChange }) => {
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.currentTarget)) as any as Flow;
    const response = await saveFlowDetails(data, "create");
    if (response.status === 201) {
      onOpenChange?.(false);
      addToast({
        title: "Flow created",
        color: "success",
      });
      redirect("/flows");
    } else {
      addToast({
        title: "Error creating flow",
        color: "danger",
      });
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Flow
              </ModalHeader>
              <ModalBody>
                <FlowForm onSubmit={onSubmit} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
