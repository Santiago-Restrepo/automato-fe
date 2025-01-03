import { Step } from "@/interfaces/step.interface";
import { createStore } from "zustand";

interface StepProps {
  steps: Step[];
}

export interface StepState extends StepProps {
  updateStep: (step: Step) => void;
  addStep: (step: Step) => void;
  setSteps: (steps: Step[] | ((prevSteps: Step[]) => Step[])) => void;
}

export type StepStore = ReturnType<typeof createStepStore>;

export const createStepStore = (initProps?: Partial<StepProps>) => {
  const DEFAULT_PROPS: StepProps = {
    steps: [],
  };
  return createStore<StepState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    addStep: (step: Step) =>
      set((state) => ({ steps: [...state.steps, step] })),
    updateStep(step) {
      set((state) => ({
        steps: state.steps.map((s) => {
          if (s.id === step.id) {
            return step;
          }
          return s;
        }),
      }));
    },
    setSteps(steps: Step[] | ((prevSteps: Step[]) => Step[])) {
      set((state) => ({
        steps: typeof steps === "function" ? steps(state.steps) : steps,
      }));
    },
  }));
};
