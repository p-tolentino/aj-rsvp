"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  Mail,
  User,
  Calendar,
  Eye,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { RSVP } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import UpsertGuestForm from "@/components/guest-form";
import { deleteGuest } from "@/app/actions";

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

export const columns: ColumnDef<RSVP>[] = [
  {
    accessorKey: "full_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="group p-0 text-start font-semibold hover:bg-transparent hover:text-[#212122] transition-all"
        >
          <User className="mr-2 h-4 w-4" />
          Name
          <ArrowUpDown className="ml-2 h-4 w-4 group-hover:scale-110 transition-all" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.getValue("full_name") as string;
      const isVerified = row.original.is_verified_guest;
      return (
        <div className="flex items-center gap-2">
          <div className="font-medium text-[#383539]">{name}</div>
          {/* {isVerified && (
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200"
            >
              <CheckCircle className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          )} */}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="group p-0 text-start font-semibold hover:bg-transparent hover:text-[#212122] transition-all"
        >
          <Mail className="mr-2 h-4 w-4" />
          Email Used for RSVP
          <ArrowUpDown className="ml-2 h-4 w-4 group-hover:scale-110 transition-all" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const email = row.getValue("email") as string;
      return email ? (
        <a
          href={`mailto:${email}`}
          className="text-[#383539]/45 hover:underline hover:text-[#383539]/90 transition-all"
        >
          {email}
        </a>
      ) : (
        <span className="text-[#383539]/45 italic">No email</span>
      );
    },
  },
  {
    accessorKey: "attendance",
    header: "Attendance",
    cell: ({ row }) => {
      const attendance = row.getValue("attendance") as string;
      return (
        <Badge
          className={
            attendance === "attending"
              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
              : "bg-red-100 text-red-800 hover:bg-red-100"
          }
        >
          {attendance === "attending" ? (
            <>
              <CheckCircle className="h-3 w-3 mr-1" />
              Attending
            </>
          ) : (
            <>
              <XCircle className="h-3 w-3 mr-1" />
              Not Attending
            </>
          )}
        </Badge>
      );
    },
  },
  // {
  //   accessorKey: "guest_list_id",
  //   header: "Guest Status",
  //   cell: ({ row }) => {
  //     const guestListId = row.original.guest_list_id;
  //     const isVerified = row.original.is_verified_guest;

  //     return (
  //       <div className="flex items-center gap-2">
  //         {isVerified ? (
  //           <Badge
  //             variant="outline"
  //             className="bg-blue-50 text-blue-700 border-blue-200"
  //           >
  //             On Guest List
  //           </Badge>
  //         ) : (
  //           <Badge
  //             variant="outline"
  //             className="bg-gray-50 text-gray-700 border-gray-200"
  //           >
  //             Walk-in
  //           </Badge>
  //         )}
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "rsvp_for_guest_id",
    header: "RSVP Details",
    cell: ({ row }) => {
      const rsvpForGuestId = row.original.rsvp_for_guest_id;
      const submittedByGuestId = row.original.submitted_by_guest_id;

      // If the person RSVP'd for themselves
      if (
        rsvpForGuestId &&
        submittedByGuestId &&
        rsvpForGuestId === submittedByGuestId
      ) {
        return (
          <span className="text-sm text-[#383539]/45 italic">Self RSVP</span>
        );
      }

      // If someone else RSVP'd for this person
      if (
        rsvpForGuestId &&
        submittedByGuestId &&
        rsvpForGuestId !== submittedByGuestId
      ) {
        return (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 border-purple-200"
          >
            RSVP by others
          </Badge>
        );
      }

      // Walk-in guest (not verified)
      return <span className="text-sm text-[#383539]/75 italic">Walk-in</span>;
    },
  },
  {
    accessorKey: "about_me",
    header: "Guest Info",
    cell: ({ row }) => {
      const about_guest = row.getValue("about_me") as string;
      const name = row.getValue("full_name") as string;

      return <DialogCell text={about_guest} name={name} type="about_guest" />;
    },
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => {
      const message = row.getValue("message") as string;
      const name = row.getValue("full_name") as string;

      return <DialogCell text={message} name={name} type="message" />;
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="group p-0 text-start font-semibold hover:bg-transparent hover:text-[#212122] transition-all"
        >
          <Calendar className="mr-2 h-4 w-4" />
          Submitted
          <ArrowUpDown className="ml-2 h-4 w-4 group-hover:scale-110 transition-all" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      return (
        <div className="text-gray-600">
          <div>
            {date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div className="text-sm text-[#383539]/45">
            {date.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const guest = {
        id: row.original.guest_list_id,
        first_name: row.original.first_name,
        last_name: row.original.last_name,
        group_id: row.original.group_id,
        attendance: row.original.attendance,
      };

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
                      onClick={() => handleDelete(row.original.guest_list_id)}
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

// Message Cell Component
function DialogCell({
  text,
  name,
  type,
}: {
  text: string | null;
  name: string;
  type: "message" | "about_guest";
}) {
  const [isOpen, setIsOpen] = useState(false);

  if (type === "message" && !text) {
    return <span className="text-[#383539]/50 italic">No message</span>;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 p-2 text-[#383539] hover:text-[#383539]/80 hover:bg-[#383539]/10 hover:scale-105 transition-all"
        >
          <Eye className="h-4 w-4 mr-1" />
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-[#383539]">
            {type === "message" ? `Message from ${name}` : `About ${name}`}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {type === "message"
              ? `View the message left by the guest`
              : `View details about the guest`}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <div className="bg-gray-50 rounded-lg p-4 max-h-[300px] overflow-y-auto">
            <p className="text-gray-700 whitespace-pre-wrap">{text}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function EditGuest({ guest }: { guest?: any }) {
  const [isOpen, setIsOpen] = useState(false);

  // Handle opening the dialog
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <div className="inline-flex items-center justify-start gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 w-full cursor-pointer bg-none text-foreground hover:bg-[#383539] hover:text-accent-foreground h-9 p-2">
          <Pencil className="h-4 w-4 mr-2" />
          Edit Guest
        </div>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[500px]"
        onInteractOutside={(e) => {
          // Prevent closing when clicking outside if needed
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-[#383539]">Edit Guest</DialogTitle>
          <DialogDescription className="text-gray-600">
            Enter guest details
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <div className="bg-gray-50 rounded-lg p-4 overflow-y-auto">
            <UpsertGuestForm
              guest={guest}
              type="edit"
              onSuccess={handleOpenChange}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
