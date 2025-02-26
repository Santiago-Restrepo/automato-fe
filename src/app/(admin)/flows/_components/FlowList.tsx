"use client";
import React, { FC, Key } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "@heroui/react";
import { Flow } from "@/interfaces/flow.interface";
import { Play, Settings } from "lucide-react";
import Link from "next/link";

export const columns = [
  { name: "NAME", uid: "name" },
  { name: "CREATED AT", uid: "createdAt" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export const FlowList: FC<{ flows: Flow[] }> = ({ flows }) => {
  const renderCell = React.useCallback((flow: Flow, columnKey: Key) => {
    switch (columnKey) {
      case "name":
        return (
          <Link href={`/flows/${flow.id}`}>
            <p className="font-medium">{flow.name}</p>
            <p className="text-xs text-gray-500">{flow.description}</p>
          </Link>
        );
      case "createdAt":
        return <p className="text-xs text-gray-500">{flow.createdAt}</p>;
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap["active"] as any}
            size="sm"
            variant="flat"
          >
            active
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Tooltip content="Run flow">
              <span className="text-lg text-default-500 cursor-pointer active:opacity-50">
                <Play />
              </span>
            </Tooltip>
            <Tooltip content="More">
              <span className="text-lg text-default-500 cursor-pointer active:opacity-50">
                <Settings />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return "--";
    }
  }, []);

  return (
    <div className="flex h-full justify-center bg-white">
      <Card
        className="w-full max-w-4xl p-2 mt-10 border-1.5 border-gray-200"
        shadow="none"
      >
        <CardHeader className="flex justify-between">
          <h1 className="font-semibold text-xl">Flows</h1>
          <Button color="primary">Create Flow</Button>
        </CardHeader>
        <CardBody>
          <Table
            className="border-1.5 border-gray-200 rounded-md"
            aria-label="Flows table"
            shadow="none"
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={flows}>
              {(flow) => (
                <TableRow key={flow.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(flow, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};
