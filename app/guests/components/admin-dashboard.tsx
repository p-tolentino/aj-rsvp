"use client";

import { useState, useEffect, useRef } from "react";
import { Lock, LogOut } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Users, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import type { RSVP } from "@/lib/types";

export default function AdminDashboard({ rsvps }: { rsvps: RSVP[] }) {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const tabsContentRef = useRef<HTMLDivElement>(null);

  // Simple Auth Check
  useEffect(() => {
    const storedAuth = localStorage.getItem("wedding_admin_authenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
      localStorage.setItem("wedding_admin_authenticated", "true");
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("wedding_admin_authenticated");
    setPassword("");
    toast.success("Logged out successfully");
  };

  const [stats, setStats] = useState({
    totalAttending: 0,
    totalNotAttending: 0,
    totalResponses: 0,
    totalVerified: 0,
    totalWalkIns: 0,
    totalGuestListAttending: 0,
  });

  useEffect(() => {
    calculateStats(rsvps || []);
  }, [rsvps]);

  const calculateStats = (data: RSVP[]) => {
    const attending = data.filter((r) => r.attendance === "attending");
    const notAttending = data.filter((r) => r.attendance === "not-attending");
    const verified = data.filter((r) => r.is_verified_guest);
    const walkIns = data.filter((r) => !r.is_verified_guest);
    const guestListAttending = attending.filter((r) => r.is_verified_guest);

    setStats({
      totalAttending: attending.length,
      totalNotAttending: notAttending.length,
      totalResponses: data.length,
      totalVerified: verified.length,
      totalWalkIns: walkIns.length,
      totalGuestListAttending: guestListAttending.length,
    });
  };

  const handleTabChange = (value: string) => {
    if (value === activeTab || isTransitioning) return;

    setIsTransitioning(true);
    setActiveTab(value);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Attendance",
      "Verified Guest",
      "Guest Status",
      "RSVP Type",
      "Message",
      "Date",
    ];
    const csvContent = [
      headers.join(","),
      ...rsvps.map((r) =>
        [
          `"${r.full_name}"`,
          `"${r.email || ""}"`,
          r.attendance,
          r.is_verified_guest ? "Yes" : "No",
          r.is_verified_guest ? "On Guest List" : "Walk-in",
          r.rsvp_for_guest_id && r.rsvp_for_guest_id !== r.submitted_by_guest_id
            ? "RSVP for others"
            : "Self RSVP",
          `"${(r.message || "").replace(/"/g, '""')}"`,
          new Date(r.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `wedding-rsvps-${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("CSV exported successfully");
  };

  const attendingGuests = rsvps.filter((r) => r.attendance === "attending");
  const notAttendingGuests = rsvps.filter(
    (r) => r.attendance === "not-attending",
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#383539]/10 mb-4">
              <Lock className="h-8 w-8 text-[#383539]" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-[#383539] mb-2">
              Admin Access
            </h1>
            <p className="text-gray-600">
              Enter the password to view wedding RSVPs
            </p>
          </div>

          <Card className="border-[#383539]/20 shadow-lg">
            <CardContent className="p-8">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-bold text-gray-700"
                  >
                    Admin Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter the password"
                    className={`border-gray-300 focus:border-[#383539] ${
                      error ? "border-red-300" : ""
                    }`}
                    autoComplete="current-password"
                  />
                  {error && <p className="text-sm text-red-600">{error}</p>}
                </div>

                <Button
                  onClick={(e) => handleLogin(e)}
                  className="w-full bg-[#383539] hover:bg-[#383539]/90 text-background"
                  size="lg"
                >
                  Access Dashboard
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    Need help? Contact the wedding planner.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-800">
              This page is secured. Unauthorized access is prohibited.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#383539]">
                  Wedding RSVP Dashboard
                </h1>
              </div>
              <p className="text-gray-600">
                Manage and view all guest responses
              </p>
            </div>
            <div className="animate-fade-in">
              <div className="flex items-center gap-3">
                <Button
                  onClick={exportToCSV}
                  variant="outline"
                  size="sm"
                  className="border-gray-300"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-600 hover:bg-red-800 hover:text-white"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - Updated */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white animate-slide-up transition-all hover:shadow-lg hover:scale-[1.02]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Responses</p>
                  <p className="text-3xl font-bold text-[#383539] mt-2">
                    {stats.totalResponses}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-white animate-slide-up transition-all hover:shadow-lg hover:scale-[1.02]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Attending</p>
                  <p className="text-3xl font-bold text-[#383539] mt-2">
                    {stats.totalAttending}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-gradient-to-br from-red-50 to-white animate-slide-up transition-all hover:shadow-lg hover:scale-[1.02]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Not Attending</p>
                  <p className="text-3xl font-bold text-[#383539] mt-2">
                    {stats.totalNotAttending}
                  </p>
                </div>
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs
          defaultValue="all"
          className="space-y-6 animate-slide-up"
          value={activeTab}
          onValueChange={handleTabChange}
        >
          <TabsList className="grid w-full md:w-auto grid-cols-2 lg:grid-cols-5 md:inline-flex bg-transparent text-[#212122]">
            <TabsTrigger
              value="all"
              className="transition-all duration-300 data-[state=active]:scale-[1.02]"
            >
              All ({rsvps.length})
            </TabsTrigger>
            <TabsTrigger
              value="attending"
              className="transition-all duration-300 data-[state=active]:scale-[1.02]"
            >
              Attending ({attendingGuests.length})
            </TabsTrigger>
            <TabsTrigger
              value="not-attending"
              className="transition-all duration-300 data-[state=active]:scale-[1.02]"
            >
              Not Attending ({notAttendingGuests.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <Card>
              <CardHeader className="animate-fade-in">
                <CardTitle>All RSVPs</CardTitle>
                <CardDescription>
                  Complete list of all guest responses
                </CardDescription>
              </CardHeader>
              <CardContent className="animate-fade-in">
                <DataTable columns={columns} data={rsvps} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attending" className="space-y-6">
            <Card>
              <CardHeader className="animate-fade-in">
                <CardTitle>Attending Guests</CardTitle>
                <CardDescription>
                  {stats.totalAttending} guests confirmed attending
                </CardDescription>
              </CardHeader>
              <CardContent className="animate-fade-in">
                <DataTable columns={columns} data={attendingGuests} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="not-attending" className="space-y-6">
            <Card>
              <CardHeader className="animate-fade-in">
                <CardTitle>Not Attending</CardTitle>
                <CardDescription>
                  {stats.totalNotAttending} guests cannot attend
                </CardDescription>
              </CardHeader>
              <CardContent className="animate-fade-in">
                <DataTable columns={columns} data={notAttendingGuests} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Summary Card - Updated */}
        <Card className="mt-8 border-gray-300 animate-slide-up transition-all duration-500 delay-300">
          <CardContent className="p-6">
            <div className="w-full gap-6">
              <div className="w-full">
                <h3 className="text-lg font-semibold text-[#383539] mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {rsvps.slice(0, 3).map((rsvp, index) => (
                    <div
                      key={rsvp.id}
                      className={`flex items-center gap-3 p-3 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:shadow-sm transform hover:translate-x-1 animate-fade-in delay-${index * 100}`}
                    >
                      <div
                        className={`p-2 rounded-full transition-all duration-300 ${
                          rsvp.attendance === "attending"
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {rsvp.attendance === "attending" ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <XCircle className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900">
                            {rsvp.full_name}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500">
                          {rsvp.attendance === "attending"
                            ? "Attending"
                            : "Not attending"}
                        </p>
                      </div>
                      <span className="text-sm text-gray-400">
                        {new Date(rsvp.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
