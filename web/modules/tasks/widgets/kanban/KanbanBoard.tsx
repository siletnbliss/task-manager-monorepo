'use client';

import { SimpleGrid } from '@mantine/core';
import { MutableTaskProps } from '../../components/card/TaskCard';
import { useTasksContext } from '../../context/TasksProvider';
import { KanbanColumn } from './KanbanColumn';

interface KanbanBoardProps extends MutableTaskProps {}

export function KanbanBoard({ ...props }: KanbanBoardProps) {
  const { tasksByState, isPending } = useTasksContext();

  return (
    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg" h="100%">
      <KanbanColumn title="To Do" tasks={tasksByState.pending} isLoading={isPending} {...props} />
      <KanbanColumn
        title="In Progress"
        tasks={tasksByState['in progress']}
        isLoading={isPending}
        {...props}
      />
      <KanbanColumn title="Done" tasks={tasksByState.completed} isLoading={isPending} {...props} />
    </SimpleGrid>
  );
}
