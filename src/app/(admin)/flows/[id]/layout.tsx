"use client";
import { StepsContext } from "@/layers/step-context";
import { createStepStore } from "@/stores/step.store";
import { useRef } from "react";

export default function FlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = useRef(createStepStore()).current;
  return (
    <StepsContext.Provider value={store}>{children}</StepsContext.Provider>
  );
}
