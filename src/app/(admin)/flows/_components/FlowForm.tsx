import { Flow } from "@/interfaces/flow.interface";
import { Button, Form, Input } from "@heroui/react";
import { FC, FormEvent } from "react";

export const FlowForm: FC<{
  defaultValues?: Flow;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}> = ({ defaultValues, onSubmit }) => {
  return (
    <Form className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
      <Input
        isRequired
        errorMessage="Please enter a valid name"
        label="name"
        labelPlacement="outside"
        name="name"
        placeholder="Enter flow name"
        type="text"
        defaultValue={defaultValues?.name}
      />

      <Input
        errorMessage="Please enter a valid description"
        label="Description"
        labelPlacement="outside"
        name="description"
        placeholder="Enter your description"
        type="description"
        defaultValue={defaultValues?.description || ""}
      />
      <div className="flex gap-2 self-center">
        <Button color="primary" type="submit">
          Save
        </Button>
      </div>
    </Form>
  );
};
