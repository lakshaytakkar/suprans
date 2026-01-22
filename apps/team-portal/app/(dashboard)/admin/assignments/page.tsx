"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import type { Lead } from "@/lib/types/lead";
import type { User } from "@/lib/types/user";

export default function AssignmentsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leadsRes, usersRes] = await Promise.all([
          fetch("/api/leads"),
          fetch("/api/users"),
        ]);

        if (leadsRes.ok) {
          const data = await leadsRes.json();
          setLeads(data.leads);
        }

        if (usersRes.ok) {
          const data = await usersRes.json();
          setUsers(data.users);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAssignment = async (leadId: string, userId: string) => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignedTo: userId }),
      });

      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) =>
            l.id === leadId ? { ...l, assignedTo: userId } : l
          )
        );
        toast.success("Lead reassigned successfully");
      }
    } catch (error) {
      console.error("Failed to reassign lead:", error);
      toast.error("Failed to reassign lead");
    }
  };

  const salesUsers = users.filter((u) => u.role === "sales_executive");
  const unassignedLeads = leads.filter(
    (l) => !l.assignedTo || !users.find((u) => u.id === l.assignedTo)
  );
  const activeLeads = leads.filter(
    (l) => !["won", "lost"].includes(l.stage)
  );

  // Group leads by assignee
  const leadsByAssignee = salesUsers.map((user) => ({
    user,
    leads: activeLeads.filter((l) => l.assignedTo === user.id),
  }));

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Lead Assignments</h2>
        <p className="text-muted-foreground">
          Manage lead distribution across your team
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeLeads.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unassigned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {unassignedLeads.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Leads per Rep
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {salesUsers.length > 0
                ? (activeLeads.length / salesUsers.length).toFixed(1)
                : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Unassigned Leads */}
      {unassignedLeads.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50/50">
          <CardHeader>
            <CardTitle className="text-yellow-700">
              Unassigned Leads ({unassignedLeads.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {unassignedLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between p-3 bg-white rounded-lg"
                >
                  <div>
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {lead.service} • AED {lead.value.toLocaleString()}
                    </p>
                  </div>
                  <Select onValueChange={(v) => handleAssignment(lead.id, v)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Assign to..." />
                    </SelectTrigger>
                    <SelectContent>
                      {salesUsers.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Leads by Assignee */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {leadsByAssignee.map(({ user, leads: userLeads }) => {
          const initials = user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();

          return (
            <Card key={user.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{user.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">
                      {userLeads.length} active leads
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {userLeads.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No active leads assigned
                  </p>
                ) : (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {userLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="flex items-center justify-between p-2 rounded bg-muted/50"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">
                            {lead.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            AED {lead.value.toLocaleString()}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {lead.stage}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
