"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Trash2,
  Loader,
} from "lucide-react";
import { GuestWithAttendance } from "./admin-dashboard";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { EditGuest } from "./columns";
import { deleteGuest } from "@/app/actions";

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
  {
    id: "actions",
    cell: ({ row }) => {
      const guest = row.original;

      const handleDelete = async (id: string) => {
        const result = await deleteGuest(id);

        if (result.error) {
          toast.error(result.message);
        } else {
          toast.success(result.message);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-[#383539] hover:text-[#383539]/80 hover:bg-[#383539]/10"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuItem
              asChild
              className="hover:text-white hover:bg-[#383539]"
              onSelect={(e) => e.preventDefault()}
            >
              <EditGuest guest={guest} />
            </DropdownMenuItem>

            <DropdownMenuItem
              asChild
              onSelect={(e) => e.preventDefault()}
              className="text-red-600"
            >
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-red-600 w-full h-full relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none transition-colors justify-start hover:bg-[#383539] hover:text-accent-foreground"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Guest
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="border-slate-200 dark:border-slate-800">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-slate-900 dark:text-slate-100">
                      Are you sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-slate-700 dark:text-slate-300">
                      This action cannot be undone. This will permanently delete
                      &quot;{guest.first_name} {guest.last_name}&quot; from your
                      guest list.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-950 hover:text-foreground">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(row.original.id)}
                      className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
