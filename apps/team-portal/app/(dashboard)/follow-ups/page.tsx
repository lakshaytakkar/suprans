"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Phone, Mail } from "lucide-react";
import type { Lead } from "@/lib/types/lead";

export default function FollowUpsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch("/api/leads");
        if (res.ok) {
          const data = await res.json();
          // Filter leads with follow-ups
          const leadsWithFollowUps = data.leads.filter(
            (l: Lead) => l.nextFollowUp
          );
          // Sort by follow-up date
          leadsWithFollowUps.sort(
            (a: Lead, b: Lead) =>
              new Date(a.nextFollowUp!).getTime() -
              new Date(b.nextFollowUp!).getTime()
          );
          setLeads(leadsWithFollowUps);
        }
      } catch (error) {
        console.error("Failed to fetch leads:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const isOverdue = (date: string) => {
    return new Date(date) < new Date();
  };

  const isToday = (date: string) => {
    const today = new Date();
    const followUp = new Date(date);
    return (
      today.getDate() === followUp.getDate() &&
      today.getMonth() === followUp.getMonth() &&
      today.getFullYear() === followUp.getFullYear()
    );
  };

  const overdueLeads = leads.filter((l) => isOverdue(l.nextFollowUp!));
  const todayLeads = leads.filter(
    (l) => isToday(l.nextFollowUp!) && !isOverdue(l.nextFollowUp!)
  );
  const upcomingLeads = leads.filter(
    (l) => !isOverdue(l.nextFollowUp!) && !isToday(l.nextFollowUp!)
  );

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
        <h2 className="text-2xl font-bold tracking-tight">Follow-ups</h2>
        <p className="text-muted-foreground">
          Manage your scheduled follow-ups
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-600">
              Overdue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overdueLeads.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-600">
              Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayLeads.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-600">
              Upcoming
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingLeads.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Follow-up List */}
      <div className="space-y-6">
        {/* Overdue */}
        {overdueLeads.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-red-600 mb-3">Overdue</h3>
            <div className="space-y-3">
              {overdueLeads.map((lead) => (
                <FollowUpCard key={lead.id} lead={lead} variant="overdue" />
              ))}
            </div>
          </div>
        )}

        {/* Today */}
        {todayLeads.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-yellow-600 mb-3">Today</h3>
            <div className="space-y-3">
              {todayLeads.map((lead) => (
                <FollowUpCard key={lead.id} lead={lead} variant="today" />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming */}
        {upcomingLeads.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-green-600 mb-3">
              Upcoming
            </h3>
            <div className="space-y-3">
              {upcomingLeads.map((lead) => (
                <FollowUpCard key={lead.id} lead={lead} variant="upcoming" />
              ))}
            </div>
          </div>
        )}

        {leads.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Calendar className="mx-auto text-muted-foreground mb-4 h-12 w-12" />
              <p className="text-muted-foreground">No follow-ups scheduled</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function FollowUpCard({
  lead,
  variant,
}: {
  lead: Lead;
  variant: "overdue" | "today" | "upcoming";
}) {
  const variantStyles = {
    overdue: "border-red-200 bg-red-50/50",
    today: "border-yellow-200 bg-yellow-50/50",
    upcoming: "border-green-200 bg-green-50/50",
  };

  return (
    <Card className={variantStyles[variant]}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">
                {new Date(lead.nextFollowUp!).toLocaleDateString()}{" "}
                {new Date(lead.nextFollowUp!).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div>
              <Link
                href={`/leads/${lead.id}`}
                className="font-medium hover:underline"
              >
                {lead.name}
              </Link>
              <p className="text-sm text-muted-foreground">
                {lead.company || lead.email} • {lead.service}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{lead.stage}</Badge>
            <Button variant="ghost" size="icon">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
