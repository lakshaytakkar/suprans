"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Clock, Calendar, Play } from "lucide-react";

// Mock recordings data
const recordings = [
  {
    id: "1",
    title: "Weekly Sales Training - Objection Handling",
    description: "Learn effective techniques for handling common sales objections",
    duration: "45:32",
    date: "2024-03-15",
    presenter: "Admin User",
    views: 24,
  },
  {
    id: "2",
    title: "Product Update - New Free Zone Packages",
    description: "Overview of the new free zone packages and pricing",
    duration: "32:15",
    date: "2024-03-10",
    presenter: "Admin User",
    views: 31,
  },
  {
    id: "3",
    title: "CRM Training - Pipeline Management",
    description: "How to effectively manage your sales pipeline in the CRM",
    duration: "28:45",
    date: "2024-03-05",
    presenter: "John Smith",
    views: 18,
  },
  {
    id: "4",
    title: "Best Practices - Client Communication",
    description: "Tips for professional and effective client communication",
    duration: "38:20",
    date: "2024-02-28",
    presenter: "Sarah Johnson",
    views: 42,
  },
];

export default function RecordingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Call Recordings</h2>
        <p className="text-muted-foreground">
          Watch recorded training sessions and meetings
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Recordings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recordings.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                recordings.filter((r) =>
                  r.date.startsWith(
                    new Date().toISOString().substring(0, 7)
                  )
                ).length
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {recordings.reduce((sum, r) => sum + r.views, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recordings Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {recordings.map((recording) => (
          <Card key={recording.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Video className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-base">{recording.title}</CardTitle>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(recording.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {recording.duration}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                {recording.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{recording.presenter}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {recording.views} views
                  </span>
                </div>
                <Button size="sm">
                  <Play className="mr-1 h-3.5 w-3.5" />
                  Watch
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {recordings.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Video className="mx-auto text-muted-foreground mb-4 h-12 w-12" />
            <p className="text-muted-foreground">No recordings available</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
