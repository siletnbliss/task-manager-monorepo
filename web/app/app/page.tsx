'use client';

import { IconPlus } from '@tabler/icons-react';
import { Box, Button, Container, Group, Title } from '@mantine/core';
import { TasksProvider } from '@/modules/tasks/context/TasksProvider';
import { CreateTaskDrawer } from '@/modules/tasks/widgets/drawer/CreateTaskDrawer';
import { useTaskDrawer } from '@/modules/tasks/widgets/drawer/useTaskDrawer';
import { KanbanBoard } from '@/modules/tasks/widgets/kanban/KanbanBoard';

export default function DashboardPage() {
  return (
    <Box py="xl" mb={'auto'}>
      <TasksProvider>
        <PageInner />
      </TasksProvider>
    </Box>
  );
}

function PageInner() {
  const {
    open: openCreate,
    opened: openedCreate,
    close: closeCreate,
    mutate: createTask,
  } = useTaskDrawer();
  return (
    <Container size="xl">
      <Group justify="space-between" mb="xl">
        <Title order={2}>Project Overview</Title>
        <Button leftSection={<IconPlus size={18} />} onClick={openCreate}>
          New Task
        </Button>
      </Group>
      <KanbanBoard />
      <CreateTaskDrawer
        opened={openedCreate}
        close={closeCreate}
        onTaskCreate={(values) => {
          createTask({ body: values });
        }}
      />
    </Container>
  );
}
