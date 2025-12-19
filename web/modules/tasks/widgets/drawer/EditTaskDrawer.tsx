import { useEffect } from 'react';
import { Drawer, ScrollArea } from '@mantine/core';
import { Task } from '../../model/task';
import { TaskForm } from '../form/TaskForm';
import { TaskFormValues, useTaskForm } from '../form/useTaskForm';

interface EditTaskDrawerProps {
  opened: boolean;
  close: () => void;
  task: Task | null; // The task being edited
  onTaskUpdate: (id: string, values: TaskFormValues) => void;
}

export function EditTaskDrawer({ opened, close, task, onTaskUpdate }: EditTaskDrawerProps) {
  const { form, handleSubmit, isEditing } = useTaskForm((values) => {
    if (task) {
      onTaskUpdate(task.id, values);
    }
  }, task || undefined);

  useEffect(() => {
    if (task) {
      form.setValues({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
      });
    }
  }, [task]);

  return (
    <Drawer
      opened={opened}
      onClose={close}
      title="Edit Task"
      padding="xl"
      size="md"
      position="right"
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <TaskForm form={form} onSubmit={handleSubmit} onCancel={close} isEditing={isEditing} />
    </Drawer>
  );
}
