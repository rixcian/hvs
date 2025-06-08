/* eslint-disable @next/next/no-img-element */
"use client";
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
import Link from "next/link";
import { ThemeButton } from "@/components/theme-button";

export default function Home() {
  const { table } = useDataTable({
    data: getChainDataWithHVS(),
    columns: [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Chain" />
        ),
        meta: {
          label: "Chain",
        },
        enableSorting: true,
        sortingFn: (rowA, rowB) => {
          return rowA.original.name.localeCompare(rowB.original.name);
        },
        cell: ({ row }) => (
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
              <span>{row.original.name}</span>
              <ExternalLinkIcon className="w-3 h-3" />
            </div>
          </a>
        ),
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
              <Progress value={row.original.hvs} max={100} />
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
    <main className="flex flex-col row-start-2 items-center sm:items-start px-4 md:px-24 py-4">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-4xl font-bold mt-8">🏡 Home Verifiability Score</h1>
        <ThemeButton />
      </div>
      <p className="text-lg text-gray-500">
        The Home Verifiability Score (HVS) is a metric that measures how easily
        and efficiently a blockchain network can be verified by consumer
        hardware at home. A higher score indicates better accessibility and
        lower hardware requirements for running a full node.
      </p>

      <DataTable table={table} className="mt-8">
        <DataTableToolbar table={table}>
          <DataTableSortList table={table} />
        </DataTableToolbar>
      </DataTable>

      <h4 className="text-xl mt-8 font-bold">
        How is the Home Verifiability Score calculated?
      </h4>
      <p className="text-gray-500">
        The Home Verifiability Score (HVS) is calculated as a weighted average
        of hardware requirements: RAM (30%), CPU (30%), Storage (15%), and
        Bandwidth (25%). Each component is scored based on accessibility for
        typical home setups based on hardware purchase cost and maintenance
        costs.
      </p>

      <p className="flex text-gray-500 mt-4">
        Found something incorrect? The code is open source and available on&nbsp;
        <a
          href="https://github.com/rixcian/home-verifiability-score"
          target="_blank"
          className="underline"
        >
          <span className="flex items-center gap-1">
            Github <ExternalLinkIcon className="w-3 h-3" />
          </span>
        </a>
      </p>

      <div className="w-full flex justify-center items-center mt-8 text-sm">
        Fork of&nbsp;
        <Link
          href="https://github.com/dhaiwat10/chain-viability-index"
          target="_blank"
          className="dark:text-white text-black underline"
        >
          Dhai's work
        </Link>
        &nbsp;and&nbsp;
        <Link
          href="https://twitter.com/rixcian"
          target="_blank"
          className="dark:text-white text-black underline"
        >
          made by rixcian
        </Link>
      </div>
    </main>
  );
}
