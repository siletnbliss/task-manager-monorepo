'use client';

import { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { Box, Button, Container, Group, Title } from '@mantine/core';
import { TasksProvider } from '@/modules/tasks/context/TasksProvider';
import { Task } from '@/modules/tasks/model/task';
import { CreateTaskDrawer } from '@/modules/tasks/widgets/drawer/CreateTaskDrawer';
import { EditTaskDrawer } from '@/modules/tasks/widgets/drawer/EditTaskDrawer';
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

  const {
    open: openEdit,
    opened: openedEdit,
    close: closeEdit,
    mutate: editTask,
  } = useTaskDrawer(true);

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleEditTaskClick = (task: Task) => {
    setEditingTask(task);
    openEdit();
  };

  return (
    <Container size="xl">
      <Group justify="space-between" mb="xl">
        <Title order={2}>Project Overview</Title>
        <Button leftSection={<IconPlus size={18} />} onClick={openCreate}>
          New Task
        </Button>
      </Group>
      <KanbanBoard onEdit={handleEditTaskClick} />
      <CreateTaskDrawer
        opened={openedCreate}
        close={closeCreate}
        onTaskCreate={(values) => {
          createTask({ body: values });
        }}
      />
      <EditTaskDrawer
        opened={openedEdit}
        close={closeEdit}
        task={editingTask}
        onTaskUpdate={(id, values) => {
          editTask({ body: values, urlParams: { id } });
        }}
      />
    </Container>
  );
}
