"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AreaChart } from "@/components/charts/area-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { UserPlus, DollarSign, Users, BarChart3 } from "lucide-react";
import { StatCard } from "@/components/shared/stat-card";
import type { Lead } from "@/lib/types/lead";
import type { User } from "@/lib/types/user";

// Mock chart data
const revenueData = [
  { name: "Jan", value: 120000 },
  { name: "Feb", value: 145000 },
  { name: "Mar", value: 132000 },
  { name: "Apr", value: 168000 },
  { name: "May", value: 155000 },
  { name: "Jun", value: 189000 },
];

const leadsPerUser = [
  { name: "John", value: 15 },
  { name: "Sarah", value: 22 },
  { name: "Mike", value: 18 },
  { name: "Admin", value: 5 },
];

export default function AdminDashboardPage() {
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
  const totalRevenue = leads
    .filter((l) => l.stage === "won")
    .reduce((sum, l) => sum + l.value, 0);
  const salesExecutives = users.filter((u) => u.role === "sales_executive").length;
  const conversionRate =
    totalLeads > 0
      ? (leads.filter((l) => l.stage === "won").length / totalLeads) * 100
      : 0;

  // Top performers
  const performerData = users
    .filter((u) => u.role === "sales_executive")
    .map((user) => {
      const userLeads = leads.filter((l) => l.assignedTo === user.id);
      const wonLeads = userLeads.filter((l) => l.stage === "won");
      const revenue = wonLeads.reduce((sum, l) => sum + l.value, 0);
      return {
        ...user,
        totalLeads: userLeads.length,
        wonDeals: wonLeads.length,
        revenue,
      };
    })
    .sort((a, b) => b.revenue - a.revenue);

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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Admin Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of team performance and metrics
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/reports">View Reports</Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={`AED ${totalRevenue.toLocaleString()}`}
          description="From won deals"
          icon={DollarSign}
          trend={{ value: 15, isPositive: true }}
        />
        <StatCard
          title="Total Leads"
          value={totalLeads}
          description="All time"
          icon={UserPlus}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Sales Team"
          value={salesExecutives}
          description="Active members"
          icon={Users}
        />
        <StatCard
          title="Conversion Rate"
          value={`${conversionRate.toFixed(1)}%`}
          description="Won / Total leads"
          icon={BarChart3}
          trend={{ value: 3, isPositive: true }}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <AreaChart title="Monthly Revenue" data={revenueData} />
        <BarChart title="Leads by Team Member" data={leadsPerUser} />
      </div>

      {/* Team Performance */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Team Performance</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/team">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performerData.slice(0, 5).map((performer, index) => (
              <div
                key={performer.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-muted-foreground w-6">
                    #{index + 1}
                  </span>
                  <div>
                    <p className="font-medium">{performer.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {performer.totalLeads} leads • {performer.wonDeals} won
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">
                    AED {performer.revenue.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <Link href="/admin/team">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold">Team Management</h3>
              <p className="text-sm text-muted-foreground">
                Manage team members
              </p>
            </CardContent>
          </Link>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <Link href="/admin/assignments">
            <CardContent className="pt-6">
              <UserPlus className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold">Lead Assignments</h3>
              <p className="text-sm text-muted-foreground">
                Assign leads to team
              </p>
            </CardContent>
          </Link>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <Link href="/admin/reports">
            <CardContent className="pt-6">
              <BarChart3 className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold">Reports</h3>
              <p className="text-sm text-muted-foreground">
                Analytics & reports
              </p>
            </CardContent>
          </Link>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <Link href="/admin/settings">
            <CardContent className="pt-6">
              <DollarSign className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold">Settings</h3>
              <p className="text-sm text-muted-foreground">
                System settings
              </p>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  );
}
