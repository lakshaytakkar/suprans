"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { AreaChart } from "@/components/charts/area-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { useAuth } from "@/lib/contexts/auth-context";
import type { Lead } from "@/lib/types/lead";
import type { Task } from "@/lib/types/task";

// Mock performance data
const weeklyData = [
  { name: "Mon", value: 3 },
  { name: "Tue", value: 5 },
  { name: "Wed", value: 2 },
  { name: "Thu", value: 7 },
  { name: "Fri", value: 4 },
  { name: "Sat", value: 1 },
  { name: "Sun", value: 0 },
];

const monthlyRevenue = [
  { name: "Jan", value: 45000 },
  { name: "Feb", value: 52000 },
  { name: "Mar", value: 48000 },
  { name: "Apr", value: 61000 },
  { name: "May", value: 55000 },
  { name: "Jun", value: 67000 },
];

export default function PerformancePage() {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leadsRes, tasksRes] = await Promise.all([
          fetch("/api/leads"),
          fetch("/api/tasks"),
        ]);

        if (leadsRes.ok) {
          const data = await leadsRes.json();
          setLeads(data.leads);
        }

        if (tasksRes.ok) {
          const data = await tasksRes.json();
          setTasks(data.tasks);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate metrics
  const totalLeads = leads.length;
  const wonLeads = leads.filter((l) => l.stage === "won").length;
  const lostLeads = leads.filter((l) => l.stage === "lost").length;
  const conversionRate = totalLeads > 0 ? (wonLeads / totalLeads) * 100 : 0;
  const totalRevenue = leads
    .filter((l) => l.stage === "won")
    .reduce((sum, l) => sum + l.value, 0);
  const pipelineValue = leads
    .filter((l) => !["won", "lost"].includes(l.stage))
    .reduce((sum, l) => sum + l.value, 0);

  const completedTasks = tasks.filter((t) => t.status === "done").length;
  const totalTasks = tasks.length;
  const taskCompletion =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  // Target values (for demo)
  const monthlyTarget = 100000;
  const leadsTarget = 20;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-72" />
          <Skeleton className="h-72" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Performance</h2>
        <p className="text-muted-foreground">
          Track your sales performance and metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {conversionRate.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {wonLeads} won / {totalLeads} total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue (Won)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              AED {totalRevenue.toLocaleString()}
            </div>
            <Progress
              value={(totalRevenue / monthlyTarget) * 100}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {((totalRevenue / monthlyTarget) * 100).toFixed(0)}% of target
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              AED {pipelineValue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {leads.filter((l) => !["won", "lost"].includes(l.stage)).length}{" "}
              active leads
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Task Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {taskCompletion.toFixed(0)}%
            </div>
            <Progress value={taskCompletion} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {completedTasks} / {totalTasks} tasks
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <AreaChart title="Monthly Revenue" data={monthlyRevenue} />
        <BarChart title="Leads This Week" data={weeklyData} />
      </div>

      {/* Detailed Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Lead Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">New</span>
              <span className="font-medium">
                {leads.filter((l) => l.stage === "new").length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Contacted</span>
              <span className="font-medium">
                {leads.filter((l) => l.stage === "contacted").length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Qualified</span>
              <span className="font-medium">
                {leads.filter((l) => l.stage === "qualified").length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Proposal</span>
              <span className="font-medium">
                {leads.filter((l) => l.stage === "proposal").length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Negotiation</span>
              <span className="font-medium">
                {leads.filter((l) => l.stage === "negotiation").length}
              </span>
            </div>
            <div className="flex justify-between items-center text-green-600">
              <span className="text-sm">Won</span>
              <span className="font-medium">{wonLeads}</span>
            </div>
            <div className="flex justify-between items-center text-red-600">
              <span className="text-sm">Lost</span>
              <span className="font-medium">{lostLeads}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Monthly Targets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Revenue</span>
                <span className="text-xs text-muted-foreground">
                  AED {totalRevenue.toLocaleString()} / {monthlyTarget.toLocaleString()}
                </span>
              </div>
              <Progress value={(totalRevenue / monthlyTarget) * 100} />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Leads</span>
                <span className="text-xs text-muted-foreground">
                  {totalLeads} / {leadsTarget}
                </span>
              </div>
              <Progress value={(totalLeads / leadsTarget) * 100} />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Tasks</span>
                <span className="text-xs text-muted-foreground">
                  {completedTasks} / {totalTasks}
                </span>
              </div>
              <Progress value={taskCompletion} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Activity Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Total Leads</span>
              <span className="font-medium">{totalLeads}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Active Pipeline</span>
              <span className="font-medium">
                {leads.filter((l) => !["won", "lost"].includes(l.stage)).length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Tasks Pending</span>
              <span className="font-medium">
                {tasks.filter((t) => t.status !== "done").length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Tasks Completed</span>
              <span className="font-medium">{completedTasks}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
