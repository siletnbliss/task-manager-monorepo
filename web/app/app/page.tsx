'use client';

import { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { Box, Button, Container, Group, Title } from '@mantine/core';
import { PriorityInput } from '@/modules/tasks/components/input/PriorityInput';
import { TasksProvider, useTasksContext } from '@/modules/tasks/context/TasksProvider';
import { Task } from '@/modules/tasks/model/task';
import { CreateTaskDrawer } from '@/modules/tasks/widgets/drawer/CreateTaskDrawer';
import { DeleteTaskModal } from '@/modules/tasks/widgets/drawer/DeleteTaskModal';
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
  const { setPriority } = useTasksContext();
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
  } = useTaskDrawer('edit');

  const {
    open: openDelete,
    opened: openedDelete,
    close: closeDelete,
    mutate: deleteTask,
  } = useTaskDrawer('delete');

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleEditTaskClick = (task: Task) => {
    setEditingTask(task);
    openEdit();
  };

  const handleDeleteTaskClick = (task: Task) => {
    setEditingTask(task);
    openDelete();
  };

  return (
    <Container size="xl">
      <Group justify="space-between" mb="xl">
        <Title order={2}>Project Overview</Title>
        <PriorityInput putAll onChange={setPriority} />
        <Button leftSection={<IconPlus size={18} />} onClick={openCreate}>
          New Task
        </Button>
      </Group>
      <KanbanBoard onEdit={handleEditTaskClick} onDelete={handleDeleteTaskClick} />
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
      <DeleteTaskModal
        opened={openedDelete}
        close={closeDelete}
        task={editingTask}
        onTaskDelete={(id) => {
          deleteTask({ urlParams: { id } });
        }}
      />
    </Container>
  );
}
