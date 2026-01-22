"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { Lead, LeadStage } from "@/lib/types/lead";

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

const stageColors: Record<LeadStage, string> = {
  new: "bg-blue-500",
  contacted: "bg-yellow-500",
  qualified: "bg-purple-500",
  proposal: "bg-orange-500",
  negotiation: "bg-pink-500",
  won: "bg-green-500",
  lost: "bg-red-500",
};

interface PipelineCardProps {
  lead: Lead;
  isDragging?: boolean;
}

function PipelineCard({ lead, isDragging }: PipelineCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: lead.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "touch-none",
        (isDragging || isSortableDragging) && "opacity-50"
      )}
    >
      <Link href={`/leads/${lead.id}`}>
        <Card className="cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow">
          <CardContent className="p-3">
            <p className="font-medium text-sm mb-1 truncate">{lead.name}</p>
            <p className="text-xs text-muted-foreground truncate mb-2">
              {lead.company || lead.email}
            </p>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {lead.service}
              </Badge>
              <span className="text-xs font-medium">
                AED {lead.value.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}

interface PipelineColumnProps {
  stage: LeadStage;
  leads: Lead[];
  totalValue: number;
}

function PipelineColumn({ stage, leads, totalValue }: PipelineColumnProps) {
  return (
    <div className="flex flex-col min-w-[280px] max-w-[280px]">
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          <div className={`w-2 h-2 rounded-full ${stageColors[stage]}`} />
          <h3 className="font-medium text-sm">{stageLabels[stage]}</h3>
          <Badge variant="secondary" className="ml-auto text-xs">
            {leads.length}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          AED {totalValue.toLocaleString()}
        </p>
      </div>
      <div
        className="flex-1 bg-muted/30 rounded-lg p-2 min-h-[500px] space-y-2"
        data-stage={stage}
      >
        <SortableContext
          items={leads.map((l) => l.id)}
          strategy={verticalListSortingStrategy}
        >
          {leads.map((lead) => (
            <PipelineCard key={lead.id} lead={lead} />
          ))}
        </SortableContext>
        {leads.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-8">
            No leads
          </p>
        )}
      </div>
    </div>
  );
}

export default function PipelinePage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch("/api/leads");
        if (res.ok) {
          const data = await res.json();
          setLeads(data.leads);
        }
      } catch (error) {
        console.error("Failed to fetch leads:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveId(null);

    const { active, over } = event;
    if (!over) return;

    const leadId = active.id as string;
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return;

    // Determine which column the card was dropped on
    const overElement = document.querySelector(`[data-stage]`);
    if (!overElement) return;

    // Find the stage based on where it was dropped
    const dropTarget = document.elementFromPoint(
      event.activatorEvent instanceof PointerEvent
        ? event.activatorEvent.clientX
        : 0,
      event.activatorEvent instanceof PointerEvent
        ? event.activatorEvent.clientY
        : 0
    );

    const stageContainer = dropTarget?.closest("[data-stage]");
    const newStage = stageContainer?.getAttribute("data-stage") as LeadStage;

    if (newStage && newStage !== lead.stage) {
      // Optimistic update
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, stage: newStage } : l))
      );

      // Update on server
      try {
        await fetch(`/api/leads/${leadId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stage: newStage }),
        });
      } catch (error) {
        console.error("Failed to update lead:", error);
        // Revert on error
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, stage: lead.stage } : l))
        );
      }
    }
  };

  const getLeadsByStage = (stage: LeadStage) =>
    leads.filter((l) => l.stage === stage);

  const getStageValue = (stage: LeadStage) =>
    getLeadsByStage(stage).reduce((sum, l) => sum + l.value, 0);

  const activeLead = activeId ? leads.find((l) => l.id === activeId) : null;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="flex gap-4 overflow-x-auto pb-4">
          {stages.map((stage) => (
            <Skeleton key={stage} className="min-w-[280px] h-[600px]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Pipeline</h2>
        <p className="text-muted-foreground">
          Drag and drop leads to update their stage
        </p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {stages.map((stage) => (
            <PipelineColumn
              key={stage}
              stage={stage}
              leads={getLeadsByStage(stage)}
              totalValue={getStageValue(stage)}
            />
          ))}
        </div>

        <DragOverlay>
          {activeLead ? <PipelineCard lead={activeLead} isDragging /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
