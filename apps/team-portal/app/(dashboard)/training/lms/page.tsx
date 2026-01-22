"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Video, BookOpen, Clock, CheckCircle2 } from "lucide-react";

interface TrainingCourse {
  id: string;
  title: string;
  type: "course" | "video";
  description: string;
  duration: string;
  modules: string[] | null;
  videoUrl: string | null;
  status: "published" | "draft";
  createdAt: string;
}

export default function TrainingPage() {
  const [courses, setCourses] = useState<TrainingCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock progress data (would come from user's training progress in real app)
  const [progress] = useState<Record<string, number>>({
    "training-1": 100,
    "training-2": 60,
    "training-3": 0,
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/training");
        if (res.ok) {
          const data = await res.json();
          setCourses(data.courses);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const completedCourses = Object.values(progress).filter(
    (p) => p === 100
  ).length;
  const totalProgress =
    courses.length > 0
      ? Object.values(progress).reduce((sum, p) => sum + p, 0) / courses.length
      : 0;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Training Center</h2>
        <p className="text-muted-foreground">
          Improve your skills with our training courses
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {completedCourses}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">
              {totalProgress.toFixed(0)}%
            </div>
            <Progress value={totalProgress} />
          </CardContent>
        </Card>
      </div>

      {/* Course Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            progress={progress[course.id] || 0}
          />
        ))}
      </div>

      {courses.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <BookOpen className="mx-auto text-muted-foreground mb-4 h-12 w-12" />
            <p className="text-muted-foreground">No training courses available</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function CourseCard({
  course,
  progress,
}: {
  course: TrainingCourse;
  progress: number;
}) {
  const isCompleted = progress === 100;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {course.type === "video" ? (
                <Video className="h-4 w-4 text-primary" />
              ) : (
                <BookOpen className="h-4 w-4 text-primary" />
              )}
              <Badge variant="outline" className="capitalize">
                {course.type}
              </Badge>
              {isCompleted && (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              )}
            </div>
            <CardTitle className="text-base">{course.title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {course.description}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <Clock className="h-3.5 w-3.5" />
          <span>{course.duration}</span>
        </div>
        {course.modules && (
          <div className="text-xs text-muted-foreground mb-3">
            {course.modules.length} modules
          </div>
        )}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>
        <Button className="w-full mt-4" variant={isCompleted ? "outline" : "default"}>
          {isCompleted ? "Review Course" : progress > 0 ? "Continue" : "Start Course"}
        </Button>
      </CardContent>
    </Card>
  );
}
