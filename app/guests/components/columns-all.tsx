"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, CheckCircle, Loader, XCircle } from "lucide-react";
import { GuestWithAttendance } from "./admin-dashboard";

export const columns_all: ColumnDef<GuestWithAttendance>[] = [
  {
    accessorKey: "first_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="group p-0 text-start font-semibold hover:bg-transparent hover:text-[#212122] transition-all"
        >
          First Name
          <ArrowUpDown className="ml-2 h-4 w-4 group-hover:scale-110 transition-all" />
        </Button>
      );
    },
  },
  {
    accessorKey: "last_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="group p-0 text-start font-semibold hover:bg-transparent hover:text-[#212122] transition-all"
        >
          Last Name
          <ArrowUpDown className="ml-2 h-4 w-4 group-hover:scale-110 transition-all" />
        </Button>
      );
    },
  },
  {
    accessorKey: "full_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="group p-0 text-start font-semibold hover:bg-transparent hover:text-[#212122] transition-all"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4 group-hover:scale-110 transition-all" />
        </Button>
      );
    },
  },
  {
    accessorKey: "attendance",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="group p-0 text-start font-semibold hover:bg-transparent hover:text-[#212122] transition-all"
        >
          Attendance
          <ArrowUpDown className="ml-2 h-4 w-4 group-hover:scale-110 transition-all" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const attendance = row.getValue("attendance") as string;
      return (
        <Badge
          className={
            attendance === "attending"
              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
              : attendance === "not-attending"
                ? "bg-red-100 text-red-800 hover:bg-red-100"
                : "bg-amber-100 text-amber-800 hover:bg-amber-100"
          }
        >
          {attendance === "attending" ? (
            <>
              <CheckCircle className="h-3 w-3 mr-1" />
              Attending
            </>
          ) : attendance === "not-attending" ? (
            <>
              <XCircle className="h-3 w-3 mr-1" />
              Not Attending
            </>
          ) : (
            <>
              <Loader className="h-3 w-3 mr-1" />
              Pending
            </>
          )}
        </Badge>
      );
    },
  },

  {
    accessorKey: "group_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="group p-0 text-start font-semibold hover:bg-transparent hover:text-[#212122] transition-all"
        >
          Group ID
          <ArrowUpDown className="ml-2 h-4 w-4 group-hover:scale-110 transition-all" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const groupID = row.getValue("group_id") as string;
      return groupID ? (
        <p>{groupID}</p>
      ) : (
        <span className="text-[#383539]/45 italic">No Group ID</span>
      );
    },
  },
];
