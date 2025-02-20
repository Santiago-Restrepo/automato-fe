import { useContext } from "react";
import { StepState } from "../../stores/step-store";
import { StepsContext } from "@/layers/step-context";
import { useStore } from "zustand";

export function useStepStore<T>(selector: (state: StepState) => T): T {
  const store = useContext(StepsContext);
  if (!store) throw new Error("Missing BearContext.Provider in the tree");
  return useStore(store, selector);
}
