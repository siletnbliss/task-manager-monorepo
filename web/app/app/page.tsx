import { Box, Container, Title } from '@mantine/core';
import { TasksProvider } from '@/modules/tasks/context/TasksProvider';
import { KanbanBoard } from '@/modules/tasks/widgets/kanban/KanbanBoard';

export default function DashboardPage() {
  return (
    <Box py="xl" mb={'auto'}>
      <TasksProvider>
        <Container size="xl">
          <Title order={2} mb="xl">
            Project Overview
          </Title>

          <KanbanBoard />
        </Container>
      </TasksProvider>
    </Box>
  );
}
