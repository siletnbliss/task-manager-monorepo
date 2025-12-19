import { Drawer, ScrollArea } from '@mantine/core';
import { TaskForm } from '../form/TaskForm';
import { TaskFormValues, useTaskForm } from '../form/useTaskForm';

interface CreateTaskDrawerProps {
  opened: boolean;
  close: () => void;
  onTaskCreate: (values: TaskFormValues) => void;
}

export function CreateTaskDrawer({ opened, close, onTaskCreate }: CreateTaskDrawerProps) {
  const { form, handleSubmit, isEditing } = useTaskForm((values) => {
    onTaskCreate(values);
    close();
  });

  return (
    <Drawer
      opened={opened}
      onClose={close}
      title="New Task"
      padding="xl"
      size="md"
      position="right"
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <TaskForm form={form} onSubmit={handleSubmit} onCancel={close} isEditing={isEditing} />
    </Drawer>
  );
}
