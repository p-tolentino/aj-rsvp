"use client";

import { useState, useEffect } from "react";
import { Lock, LogOut, Shield } from "lucide-react";
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
import { Download, Users, CheckCircle, XCircle, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { DataTable } from "./data-table";
import { columns } from "./columns";

type RSVP = {
  id: string;
  created_at: string;
  full_name: string;
  email: string | null;
  attendance: "attending" | "not-attending";
  guests: number;
  message: string | null;
};

export default function AdminDashboard({ rsvps }: { rsvps: RSVP[] }) {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

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
      // localStorage convenience
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
    totalGuests: 0,
  });

  useEffect(() => {
    calculateStats(rsvps || []);
  }, []);

  const calculateStats = (data: RSVP[]) => {
    const attending = data.filter((r) => r.attendance === "attending");
    const notAttending = data.filter((r) => r.attendance === "not-attending");
    const totalGuests = attending.reduce((sum, r) => sum + r.guests, 0);

    setStats({
      totalAttending: attending.length,
      totalNotAttending: notAttending.length,
      totalResponses: data.length,
      totalGuests,
    });
  };

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Attendance",
      "Guests",
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
          r.guests,
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
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-background flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-secondary mb-2">
              Admin Access
            </h1>
            <p className="text-gray-600">
              Enter the password to view wedding RSVPs
            </p>
          </div>

          <Card className="border-primary/20 shadow-lg">
            <CardContent className="p-8">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
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
                    className={`border-gray-300 focus:border-primary ${
                      error ? "border-red-300" : ""
                    }`}
                    autoComplete="current-password"
                  />
                  {error && <p className="text-sm text-red-600">{error}</p>}
                </div>

                <Button
                  onClick={(e) => handleLogin(e)}
                  className="w-full bg-primary hover:bg-primary/90"
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
            <p className="text-xs text-gray-400">
              This page is secured. Unauthorized access is prohibited.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-secondary">
                  Wedding RSVP Dashboard
                </h1>
              </div>
              <p className="text-gray-600">
                Manage and view all guest responses and analytics
              </p>
            </div>
            <div>
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
                  className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Responses</p>
                  <p className="text-3xl font-bold text-secondary mt-2">
                    {stats.totalResponses}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Attending</p>
                  <p className="text-3xl font-bold text-secondary mt-2">
                    {stats.totalGuests}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-gradient-to-br from-red-50 to-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Not Attending</p>
                  <p className="text-3xl font-bold text-secondary mt-2">
                    {stats.totalNotAttending}
                  </p>
                </div>
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex">
            <TabsTrigger value="all">All Guests ({rsvps.length})</TabsTrigger>
            <TabsTrigger value="attending">
              Attending ({attendingGuests.length})
            </TabsTrigger>
            <TabsTrigger value="not-attending">
              Not Attending ({notAttendingGuests.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All RSVPs</CardTitle>
                <CardDescription>
                  Complete list of all guest responses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={rsvps} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attending" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Attending Guests</CardTitle>
                <CardDescription>
                  {stats.totalGuests} guests confirmed attending
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={attendingGuests} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="not-attending" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Not Attending</CardTitle>
                <CardDescription>Guests who cannot attend</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={notAttendingGuests} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-8 border-blue-100">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-secondary mb-4">
                  Quick Summary
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-gray-700">
                      <span className="font-medium">
                        {stats.totalAttending}
                      </span>{" "}
                      parties attending
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-gray-700">
                      <span className="font-medium">{stats.totalGuests}</span>{" "}
                      total guests confirmed
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="text-gray-700">
                      <span className="font-medium">
                        {stats.totalNotAttending}
                      </span>{" "}
                      parties cannot attend
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span className="text-gray-700">
                      <span className="font-medium">
                        {Math.round((stats.totalResponses / 150) * 100)}%
                      </span>{" "}
                      response rate
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-secondary mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {rsvps.slice(0, 3).map((rsvp) => (
                    <div
                      key={rsvp.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div
                        className={`p-2 rounded-full ${
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
                        <p className="font-medium text-gray-900">
                          {rsvp.full_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {rsvp.attendance === "attending"
                            ? `Attending with total of ${rsvp.guests} guest${
                                rsvp.guests > 1 ? "s" : ""
                              }`
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
