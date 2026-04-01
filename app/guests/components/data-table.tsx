"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Pencil,
  Search,
  UserPlus,
} from "lucide-react";
import AddGuestForm, { UpsertGuestFormData } from "@/components/guest-form";
import { Guest } from "./admin-dashboard";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  return (
    <div>
      {/* Search and Filters */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 mb-4 justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search all guests..."
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="pl-9 border-gray-300 bg-transparent"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.resetColumnFilters();
              setGlobalFilter("");
            }}
            className="border-gray-300 bg-transparent"
          >
            Clear Filters
          </Button>
        </div>
        <div className="w-full sm:w-auto">
          <UpdateGuest />
        </div>
      </div>

      {/* Table */}
      <div className="">
        <Table className="border border-gray-300">
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-gray-700 font-semibold"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500"
                >
                  No RSVPs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2 mt-4">
        <div className="text-sm text-gray-500">
          Showing{" "}
          {table.getRowModel().rows.length > 0 ? (
            <>
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}{" "}
              -{" "}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length,
              )}{" "}
              of {table.getFilteredRowModel().rows.length}
            </>
          ) : (
            "0 of 0"
          )}{" "}
          RSVPs
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="border-gray-300"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-700">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="border-gray-300"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function UpdateGuest({
  type = "add",
  guest,
}: {
  type?: string;
  guest?: any;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="w-full sm:w-auto md:ml-10 h-8 p-4 text-background"
        >
          {type === "edit" ? (
            <Pencil className="h-4 w-4 mr-1" />
          ) : (
            <UserPlus className="h-4 w-4 mr-1" />
          )}
          {type === "edit" ? `Edit ` : `Add `} Guest
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-[#383539]">Add Guest</DialogTitle>
          <DialogDescription className="text-gray-600">
            {`Enter guest details`}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <div className="bg-gray-50 rounded-lg p-4 overflow-y-auto">
            <AddGuestForm guest={guest} onSuccess={() => setIsOpen(false)} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
