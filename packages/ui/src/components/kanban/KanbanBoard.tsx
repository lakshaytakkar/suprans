"use client"

import * as React from "react"
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core"
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { cn } from "@suprans/utils"

// Column configuration type
export interface KanbanColumn<T> {
  id: string
  title: string
  color?: string
  items: T[]
}

// Props for the KanbanBoard component
export interface KanbanBoardProps<T extends { id: string }> {
  columns: KanbanColumn<T>[]
  onDragEnd: (itemId: string, fromColumn: string, toColumn: string, newIndex: number) => void
  renderItem: (item: T, isDragging?: boolean) => React.ReactNode
  className?: string
}

// Column header component
interface ColumnHeaderProps {
  title: string
  count: number
  color?: string
}

function ColumnHeader({ title, count, color = "#6B7280" }: ColumnHeaderProps) {
  return (
    <div className="flex items-center gap-2 mb-3 px-1">
      <div
        className="w-2.5 h-2.5 rounded-full shrink-0"
        style={{ backgroundColor: color }}
      />
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
        {count}
      </span>
    </div>
  )
}

// Sortable item wrapper
interface SortableItemProps<T extends { id: string }> {
  item: T
  renderItem: (item: T, isDragging?: boolean) => React.ReactNode
}

function SortableItem<T extends { id: string }>({ item, renderItem }: SortableItemProps<T>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {renderItem(item, isDragging)}
    </div>
  )
}

// Droppable column component
interface DroppableColumnProps<T extends { id: string }> {
  column: KanbanColumn<T>
  renderItem: (item: T, isDragging?: boolean) => React.ReactNode
}

function DroppableColumn<T extends { id: string }>({ column, renderItem }: DroppableColumnProps<T>) {
  const { setNodeRef } = useSortable({
    id: column.id,
    data: { type: "column" },
  })

  return (
    <div className="flex-1 min-w-[280px] max-w-[320px]">
      <ColumnHeader title={column.title} count={column.items.length} color={column.color} />
      <div
        ref={setNodeRef}
        className="bg-muted/50 rounded-xl p-2 min-h-[200px] space-y-2"
      >
        <SortableContext
          items={column.items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {column.items.map((item) => (
            <SortableItem key={item.id} item={item} renderItem={renderItem} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}

// Main KanbanBoard component
export function KanbanBoard<T extends { id: string }>({
  columns,
  onDragEnd,
  renderItem,
  className,
}: KanbanBoardProps<T>) {
  const [activeItem, setActiveItem] = React.useState<T | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const findColumnByItemId = (itemId: string): KanbanColumn<T> | undefined => {
    return columns.find((col) => col.items.some((item) => item.id === itemId))
  }

  const findItemById = (itemId: string): T | undefined => {
    for (const col of columns) {
      const item = col.items.find((i) => i.id === itemId)
      if (item) return item
    }
    return undefined
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const item = findItemById(active.id as string)
    if (item) {
      setActiveItem(item)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveItem(null)

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const sourceColumn = findColumnByItemId(activeId)
    if (!sourceColumn) return

    // Check if dropping on a column
    const targetColumn = columns.find((col) => col.id === overId)
    if (targetColumn) {
      onDragEnd(activeId, sourceColumn.id, targetColumn.id, targetColumn.items.length)
      return
    }

    // Check if dropping on an item
    const targetItemColumn = findColumnByItemId(overId)
    if (targetItemColumn) {
      const newIndex = targetItemColumn.items.findIndex((item) => item.id === overId)
      onDragEnd(activeId, sourceColumn.id, targetItemColumn.id, newIndex)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className={cn("flex gap-4 overflow-x-auto pb-4", className)}>
        <SortableContext items={columns.map((col) => col.id)}>
          {columns.map((column) => (
            <DroppableColumn key={column.id} column={column} renderItem={renderItem} />
          ))}
        </SortableContext>
      </div>
      <DragOverlay>
        {activeItem ? (
          <div className="opacity-80 rotate-2 shadow-lg">
            {renderItem(activeItem, true)}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
