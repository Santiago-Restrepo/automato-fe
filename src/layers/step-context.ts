import { StepStore } from "@/app/stores/step-store";
import { createContext } from "react";

export const StepsContext = createContext<StepStore | null>(null);
