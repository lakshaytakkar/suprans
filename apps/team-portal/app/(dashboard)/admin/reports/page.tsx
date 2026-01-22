"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart } from "@/components/charts/area-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { Download } from "lucide-react";
import type { Lead } from "@/lib/types/lead";
import type { User } from "@/lib/types/user";

// Mock data for charts
const monthlyRevenue = [
  { name: "Jan", value: 120000 },
  { name: "Feb", value: 145000 },
  { name: "Mar", value: 132000 },
  { name: "Apr", value: 168000 },
  { name: "May", value: 155000 },
  { name: "Jun", value: 189000 },
];

const monthlyLeads = [
  { name: "Jan", value: 35 },
  { name: "Feb", value: 42 },
  { name: "Mar", value: 38 },
  { name: "Apr", value: 51 },
  { name: "May", value: 47 },
  { name: "Jun", value: 58 },
];

const conversionBySource = [
  { name: "Website", value: 35 },
  { name: "Referral", value: 28 },
  { name: "Social", value: 18 },
  { name: "Cold Call", value: 12 },
  { name: "Ads", value: 7 },
];

export default function ReportsPage() {
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

  // Calculate metrics
  const totalLeads = leads.length;
  const wonLeads = leads.filter((l) => l.stage === "won");
  const lostLeads = leads.filter((l) => l.stage === "lost");
  const totalRevenue = wonLeads.reduce((sum, l) => sum + l.value, 0);
  const conversionRate = totalLeads > 0 ? (wonLeads.length / totalLeads) * 100 : 0;
  const avgDealSize = wonLeads.length > 0 ? totalRevenue / wonLeads.length : 0;

  // Team performance data
  const teamPerformance = users
    .filter((u) => u.role === "sales_executive")
    .map((user) => {
      const userLeads = leads.filter((l) => l.assignedTo === user.id);
      const userWon = userLeads.filter((l) => l.stage === "won");
      const userRevenue = userWon.reduce((sum, l) => sum + l.value, 0);
      return {
        name: user.name.split(" ")[0],
        value: userRevenue,
      };
    });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground">
            Analytics and performance reports
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              AED {totalRevenue.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate.toFixed(1)}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Deal Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              AED {avgDealSize.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Win/Loss Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {lostLeads.length > 0
                ? (wonLeads.length / lostLeads.length).toFixed(2)
                : wonLeads.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Tabs */}
      <Tabs defaultValue="revenue">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="sources">Sources</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="mt-6 space-y-4">
          <AreaChart title="Monthly Revenue Trend" data={monthlyRevenue} />
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Total Won</p>
                  <p className="text-xl font-bold text-green-600">
                    AED {totalRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Pipeline Value</p>
                  <p className="text-xl font-bold">
                    AED{" "}
                    {leads
                      .filter((l) => !["won", "lost"].includes(l.stage))
                      .reduce((sum, l) => sum + l.value, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Lost Value</p>
                  <p className="text-xl font-bold text-red-600">
                    AED{" "}
                    {lostLeads.reduce((sum, l) => sum + l.value, 0).toLocaleString()}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">Avg Deal</p>
                  <p className="text-xl font-bold">
                    AED {avgDealSize.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads" className="mt-6 space-y-4">
          <BarChart title="Monthly Leads" data={monthlyLeads} />
          <Card>
            <CardHeader>
              <CardTitle>Lead Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { stage: "new", label: "New" },
                  { stage: "contacted", label: "Contacted" },
                  { stage: "qualified", label: "Qualified" },
                  { stage: "proposal", label: "Proposal" },
                  { stage: "negotiation", label: "Negotiation" },
                  { stage: "won", label: "Won" },
                ].map(({ stage, label }) => {
                  const count = leads.filter((l) => l.stage === stage).length;
                  const percentage = totalLeads > 0 ? (count / totalLeads) * 100 : 0;
                  return (
                    <div key={stage} className="flex items-center gap-4">
                      <span className="text-sm w-24">{label}</span>
                      <div className="flex-1 bg-muted rounded-full h-4 overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-16">
                        {count} ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="mt-6 space-y-4">
          <BarChart title="Revenue by Team Member" data={teamPerformance} />
        </TabsContent>

        <TabsContent value="sources" className="mt-6 space-y-4">
          <BarChart title="Leads by Source" data={conversionBySource} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
