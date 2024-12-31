"use client";
import { Step } from "@/interfaces/step.interface";
import { FC, useCallback, useState } from "react";
import { StepCard } from "./step-card";
import update from "immutability-helper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const StepList: FC<{
  stepsData: Step[];
}> = ({ stepsData }) => {
  const [steps, setSteps] = useState(stepsData);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setSteps((prevCards: Step[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as Step],
        ],
      })
    );
  }, []);

  const renderCard = useCallback((step: Step, index: number) => {
    return (
      <StepCard
        key={step.id}
        index={index}
        id={step.id}
        text={step.functionBlock?.name}
        moveCard={moveCard}
      />
    );
  }, []);

  console.log(steps);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div>{steps.map((card, i) => renderCard(card, i))}</div>
      </DndProvider>
    </>
  );
};
