import { useState, useCallback } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  TouchSensor,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';

export interface DragItem {
  id: string;
  [key: string]: any;
}

export interface UseDragAndDropProps<T extends DragItem> {
  items: T[];
  onReorder?: (items: T[]) => void;
  onDragToPlate?: (item: T) => void;
}

export function useDragAndDrop<T extends DragItem>({
  items,
  onReorder,
  onDragToPlate,
}: UseDragAndDropProps<T>) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<T | null>(null);

  // Configure sensors for different input methods
  const sensors = useSensors(
    // Pointer sensor for mouse/touch events
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement before drag starts (prevents accidental drags)
      },
    }),
    // Touch sensor for mobile devices
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200, // 200ms press before drag starts on mobile
        tolerance: 5,
      },
    }),
    // Keyboard sensor for accessibility
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const { active } = event;
      setActiveId(active.id as string);
      
      // Find the active item
      const item = items.find((i) => i.id === active.id);
      if (item) {
        setActiveItem(item);
      }
    },
    [items]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      setActiveId(null);
      setActiveItem(null);

      if (!over) {
        return;
      }

      // Check if dropped on a different position (for reordering)
      if (active.id !== over.id) {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
          const reorderedItems = arrayMove(items, oldIndex, newIndex);
          onReorder?.(reorderedItems);
        }
      }

      // Check if dropped on the plate (special drop zone)
      if (over.id === 'strategy-plate' && activeItem) {
        onDragToPlate?.(activeItem);
      }
    },
    [items, activeItem, onReorder, onDragToPlate]
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
    setActiveItem(null);
  }, []);

  return {
    sensors,
    activeId,
    activeItem,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  };
}

// Export the required components from @dnd-kit for convenience
export { DndContext, DragOverlay } from '@dnd-kit/core';
export {
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
