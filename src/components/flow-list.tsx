"use client";
import { Flow } from "@/interfaces/flow.interface";
import { FC } from "react";
export const FlowList: FC<{
  flows: Flow[];
}> = ({ flows }) => {
  return (
    <ul>
      {flows?.map((flow) => {
        return <li>{flow.id}</li>;
      })}
    </ul>
  );
};
