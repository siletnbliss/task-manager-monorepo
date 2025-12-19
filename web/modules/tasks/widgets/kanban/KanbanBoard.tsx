'use client';

import { SimpleGrid } from '@mantine/core';
import { useTasksContext } from '../../context/TasksProvider';
import { KanbanColumn } from './KanbanColumn';

export function KanbanBoard() {
  const { tasksByState, isPending } = useTasksContext();

  return (
    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg" h="100%">
      <KanbanColumn title="To Do" tasks={tasksByState.pending} isLoading={isPending} />
      <KanbanColumn title="In Progress" tasks={tasksByState['in progress']} isLoading={isPending} />
      <KanbanColumn title="Done" tasks={tasksByState.completed} isLoading={isPending} />
    </SimpleGrid>
  );
}
