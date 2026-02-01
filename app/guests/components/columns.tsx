"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  Mail,
  User,
  Calendar,
  MessageSquare,
  Eye,
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
import { RSVP } from "@/lib/supabase/server";

export const columns: ColumnDef<RSVP>[] = [
  {
    accessorKey: "full_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-semibold"
        >
          <User className="mr-2 h-4 w-4" />
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.getValue("full_name") as string;
      return <div className="font-medium text-secondary">{name}</div>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-semibold"
        >
          <Mail className="mr-2 h-4 w-4" />
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const email = row.getValue("email") as string;
      return email ? (
        <a
          href={`mailto:${email}`}
          className="text-primary hover:underline hover:text-primary/80 transition-colors"
        >
          {email}
        </a>
      ) : (
        <span className="text-gray-400 italic">No email</span>
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
          {attendance === "attending" ? "Attending" : "Not Attending"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "guests",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-semibold"
        >
          Guests
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const guests = row.getValue("guests") as number;
      const attendance = row.getValue("attendance") as string;

      if (attendance === "not-attending") {
        return <span className="text-gray-400">—</span>;
      }

      return (
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              guests === 1
                ? "bg-blue-100 text-blue-600"
                : "bg-purple-100 text-purple-600"
            }`}
          >
            {guests}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => {
      const message = row.getValue("message") as string;
      const name = row.getValue("full_name") as string;

      return <MessageCell message={message} name={name} />;
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-semibold"
        >
          <Calendar className="mr-2 h-4 w-4" />
          Submitted
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
          <div className="text-sm text-gray-400">
            {date.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      );
    },
  },
];

// For couples to view message via Modal
function MessageCell({
  message,
  name,
}: {
  message: string | null;
  name: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  if (!message) {
    return <span className="text-gray-400 italic">No message</span>;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-primary hover:text-primary/80 hover:bg-primary/10"
        >
          <Eye className="h-4 w-4 mr-1" />
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-secondary">
            Message from {name}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            View the message left by the guest
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <div className="bg-gray-50 rounded-lg p-4 max-h-[300px] overflow-y-auto">
            <p className="text-gray-700 whitespace-pre-wrap">{message}</p>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            {message.length} characters
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
