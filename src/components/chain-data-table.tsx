"use client";

/* eslint-disable @next/next/no-img-element */
import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { Progress } from "@/components/ui/progress";
import { useDataTable } from "@/hooks/use-data-table";
import {
  getChainDataWithHVS,
  renderBandwidth,
  renderCPUCores,
  renderRAM,
  renderStorage,
} from "@/lib/chain-data";
import { ExternalLinkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ChainDataTable() {
  const { table } = useDataTable({
    data: getChainDataWithHVS(),
    initialState: {
      columnPinning: {
        left: ["name"],
      },
    },
    columns: [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Chain" />
        ),
        meta: {
          label: "Chain",
          placeholder: "Search chain...",
          variant: "text",
        },
        enableSorting: true,
        sortingFn: (rowA, rowB) => {
          return rowA.original.name.localeCompare(rowB.original.name);
        },
        enableColumnFilter: true,
        filterFn: (row, _, filterValue) => {
          return row.original.name.toLowerCase().includes(filterValue.toLowerCase());
        },
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span className={"w-5 text-muted-foreground"}>{row.index + 1}.&nbsp;</span>
            <a
              href={row.original.hardwareRequirements.refLink}
              target="_blank"
              className="hover:underline"
            >
              <div className="flex items-center gap-2">
                <img
                  src={row.original.iconURL}
                  alt={row.original.name}
                  className="w-6 h-6 rounded-full"
                />
                <span className="whitespace-nowrap">{row.original.name}</span>
                <ExternalLinkIcon className="w-3 h-3 hidden sm:block" />
              </div>
            </a>
          </div>
        ),
      },
      {
        accessorKey: "layer",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Type" />
        ),
        meta: {
          label: "Type",
          variant: "multiSelect",
          options: [
            { label: "Layer 1", value: "1" },
            { label: "Layer 2", value: "2" },
          ],
        },
        enableColumnFilter: true,
        filterFn: (row, _, filterValue) => {
          return row.original.layer === parseInt(filterValue);
        },
        size: 50,
        enableSorting: true,
        sortingFn: (rowA, rowB) => {
          return rowA.original.layer - rowB.original.layer;
        },
        cell: ({ row }) => {
          return <Badge variant="secondary" className="whitespace-nowrap">{row.original.layer === 1 ? "Layer 1" : "Layer 2"}</Badge>;
        },
      },
      {
        accessorKey: "hvs",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="HVS" />
        ),
        meta: {
          label: "HVS",
        },
        enableSorting: true,
        sortingFn: (rowA, rowB) => {
          return rowA.original.hvs - rowB.original.hvs;
        },
        cell: ({ row }) => {
          return (
            <div className="flex gap-2 items-center">
              <span className="w-12">{row.original.hvs}</span>
              <Progress value={row.original.hvs} max={100} className="hidden sm:block" />
            </div>
          );
        },
      },
      {
        id: "cpu",
        accessorFn: (row) => renderCPUCores(row.hardwareRequirements.cpuCores),
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="CPU" />
        ),
        meta: {
          label: "CPU",
        },
        enableSorting: true,
        sortingFn: (rowA, rowB) => {
          return rowA.original.hardwareRequirements.cpuCores - rowB.original.hardwareRequirements.cpuCores;
        },
        cell: ({ row }) => {
          return <span>{row.original.hardwareRequirements.cpuCores} cores</span>;
        },
      },
      {
        id: "ram",
        accessorFn: (row) => renderRAM(row.hardwareRequirements.ram),
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="RAM" />
        ),
        meta: {
          label: "RAM",
        },
        enableSorting: true,
        sortingFn: (rowA, rowB) => {
          return rowA.original.hardwareRequirements.ram - rowB.original.hardwareRequirements.ram;
        },
        cell: ({ row }) => {
          return <span>{row.original.hardwareRequirements.ram} GB</span>;
        },
      },
      {
        id: "storage",
        accessorFn: (row) => renderStorage(row.hardwareRequirements.storage),
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Storage" />
        ),
        meta: {
          label: "Storage",
        },
        enableSorting: true,
        sortingFn: (rowA, rowB) => {
          return rowA.original.hardwareRequirements.storage - rowB.original.hardwareRequirements.storage;
        },
        cell: ({ row }) => {
          return <span>{renderStorage(row.original.hardwareRequirements.storage)}</span>;
        },
      },
      {
        id: "bandwidth",
        accessorFn: (row) =>
          renderBandwidth(row.hardwareRequirements.bandwidth),
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Bandwidth" />
        ),
        meta: {
          label: "Bandwidth",
        },
        enableSorting: true,
        sortingFn: (rowA, rowB) => {
          return rowA.original.hardwareRequirements.bandwidth - rowB.original.hardwareRequirements.bandwidth;
        },
        cell: ({ row }) => {
          return <span>{renderBandwidth(row.original.hardwareRequirements.bandwidth)}</span>;
        },
      },
    ],
    pageCount: 1,
  });

  return (
    <DataTable table={table} className="mt-8">
      <DataTableToolbar table={table}>
        <DataTableSortList table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
