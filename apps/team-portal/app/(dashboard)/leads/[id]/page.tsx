"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Phone, Mail, MessageSquare } from "lucide-react";
import type { Lead, LeadStage } from "@/lib/types/lead";
import type { Activity } from "@/lib/types/activity";
import type { User } from "@/lib/types/user";

const stages: LeadStage[] = [
  "new",
  "contacted",
  "qualified",
  "proposal",
  "negotiation",
  "won",
  "lost",
];

const stageLabels: Record<LeadStage, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  proposal: "Proposal",
  negotiation: "Negotiation",
  won: "Won",
  lost: "Lost",
};

const activityTypeLabels: Record<string, string> = {
  call: "Phone Call",
  email: "Email",
  meeting: "Meeting",
  note: "Note",
  status_change: "Status Change",
  whatsapp: "WhatsApp",
  quote: "Quote",
};

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leadRes, activitiesRes, usersRes] = await Promise.all([
          fetch(`/api/leads/${params.id}`),
          fetch(`/api/activities?leadId=${params.id}`),
          fetch("/api/users"),
        ]);

        if (leadRes.ok) {
          const data = await leadRes.json();
          setLead(data.lead);
        } else if (leadRes.status === 404) {
          router.push("/leads");
          return;
        }

        if (activitiesRes.ok) {
          const data = await activitiesRes.json();
          setActivities(data.activities);
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
  }, [params.id, router]);

  const updateLeadStage = async (stage: LeadStage) => {
    if (!lead) return;

    try {
      const res = await fetch(`/api/leads/${lead.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage }),
      });

      if (res.ok) {
        const data = await res.json();
        setLead(data.lead);

        // Add activity for stage change
        await fetch("/api/activities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            leadId: lead.id,
            type: "status_change",
            title: `Stage changed to ${stageLabels[stage]}`,
            description: `Lead status updated from ${stageLabels[lead.stage]} to ${stageLabels[stage]}`,
          }),
        });

        // Refresh activities
        const activitiesRes = await fetch(`/api/activities?leadId=${lead.id}`);
        if (activitiesRes.ok) {
          const activitiesData = await activitiesRes.json();
          setActivities(activitiesData.activities);
        }
      }
    } catch (error) {
      console.error("Failed to update lead:", error);
    }
  };

  const getAssignedUser = () => {
    if (!lead) return null;
    return users.find((u) => u.id === lead.assignedTo);
  };

  const getActivityUser = (userId: string) => {
    return users.find((u) => u.id === userId);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <Skeleton className="h-48" />
            <Skeleton className="h-64" />
          </div>
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground">Lead not found</p>
        <Button asChild className="mt-4">
          <Link href="/leads">Back to Leads</Link>
        </Button>
      </div>
    );
  }

  const assignedUser = getAssignedUser();

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" asChild>
        <Link href="/leads">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Leads
        </Link>
      </Button>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{lead.name}</h2>
          <p className="text-muted-foreground">
            {lead.company || "No company"} • {lead.service}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Phone className="mr-2 h-4 w-4" />
            Call
          </Button>
          <Button variant="outline" size="sm">
            <Mail className="mr-2 h-4 w-4" />
            Email
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            WhatsApp
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Lead Details */}
          <Card>
            <CardHeader>
              <CardTitle>Lead Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{lead.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{lead.phone || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Value</p>
                  <p className="font-medium">AED {lead.value.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Source</p>
                  <p className="font-medium capitalize">
                    {lead.source.replace("_", " ")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Assigned To</p>
                  <p className="font-medium">{assignedUser?.name || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="font-medium">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {lead.notes && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Notes</p>
                    <p className="text-sm">{lead.notes}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              {activities.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No activities yet
                </p>
              ) : (
                <div className="space-y-4">
                  {activities.map((activity, index) => {
                    const activityUser = getActivityUser(activity.userId);
                    return (
                      <div
                        key={activity.id}
                        className="flex gap-4 pb-4 border-b last:border-0 last:pb-0"
                      >
                        <div className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline">
                              {activityTypeLabels[activity.type] || activity.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(activity.createdAt).toLocaleDateString()}{" "}
                              {new Date(activity.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <p className="font-medium text-sm">{activity.title}</p>
                          {activity.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {activity.description}
                            </p>
                          )}
                          {activity.outcome && (
                            <p className="text-sm text-muted-foreground mt-1">
                              <span className="font-medium">Outcome:</span>{" "}
                              {activity.outcome}
                            </p>
                          )}
                          {activityUser && (
                            <p className="text-xs text-muted-foreground mt-2">
                              by {activityUser.name}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stage */}
          <Card>
            <CardHeader>
              <CardTitle>Stage</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={lead.stage}
                onValueChange={(value) => updateLeadStage(value as LeadStage)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {stages.map((stage) => (
                    <SelectItem key={stage} value={stage}>
                      {stageLabels[stage]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-4 space-y-2">
                {stages.map((stage, index) => (
                  <div
                    key={stage}
                    className={`flex items-center gap-2 text-sm ${
                      stages.indexOf(lead.stage) >= index
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        lead.stage === stage
                          ? "bg-primary"
                          : stages.indexOf(lead.stage) > index
                          ? "bg-primary/50"
                          : "bg-muted"
                      }`}
                    />
                    {stageLabels[stage]}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next Follow-up */}
          {lead.nextFollowUp && (
            <Card>
              <CardHeader>
                <CardTitle>Next Follow-up</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">
                  {new Date(lead.nextFollowUp).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(lead.nextFollowUp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
