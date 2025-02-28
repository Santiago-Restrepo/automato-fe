"use client";
import { FlowIntegrationContext } from "@/layers/flow-integration-context";
import { createFlowIntegrationStore } from "@/stores/flow-integration.store";
import { useRef } from "react";

export default function FlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = useRef(createFlowIntegrationStore()).current;
  return (
    <FlowIntegrationContext.Provider value={store}>
      {children}
    </FlowIntegrationContext.Provider>
  );
}
