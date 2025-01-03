"use client";
import { Flow } from "@/interfaces/flow.interface";
import { FC } from "react";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
export const FlowList: FC<{
  flows: Flow[];
}> = ({ flows }) => {
  const columns: GridColDef<(typeof flows)[number]>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 150,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 150,
    },
    {
      field: "name",
      headerName: "Name",
      width: 110,
      editable: true,
    },
    {
      field: "actions",
      width: 80,
      headerName: "Actions",
      renderCell: (params) => {
        return (
          <GridActionsCellItem
            icon={<RemoveRedEyeIcon />}
            label="View"
            onClick={() => {
              window.location.href = `/flow/${params.id}`;
            }}
          />
        );
      },
    },
  ];
  return (
    <DataGrid
      rows={flows}
      columns={columns}
      getRowId={(row) => row.id}
      initialState={{
        sorting: {
          sortModel: [{ field: "name", sort: "asc" }],
        },
      }}
    />
  );
};
