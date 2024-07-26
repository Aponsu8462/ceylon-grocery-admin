"use client";

import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

import { Pencil } from "lucide-react";
import { useCategoryModal } from "@/hooks/use-category-modal";

type CategoryTableProps = {
  categories: string[];
};

const CategoryTable = ({ categories }: CategoryTableProps) => {
  const categoryModal = useCategoryModal();

  const data = useMemo(() => categories, [categories]);
  const columnHelper = createColumnHelper<string>();
  const columns = [
    columnHelper.display({
      header: "Name",
      cell: (info) => info.row.original,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col items-center gap-4 w-full mt-5 sm:mt-10">
      <table className="w-full border-collapse rounded-md shadow-lg overflow-hidden">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-green-600">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-4 text-left text-sm font-semibold text-white"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, rowIndex) => (
            <tr
              key={row.id}
              className={rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-4 text-sm text-gray-700">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
