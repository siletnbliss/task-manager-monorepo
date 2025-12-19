import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import { Task } from '../../model/task';

interface DeleteTaskModalProps {
  opened: boolean;
  close: () => void;
  task: Task | null;
  onTaskDelete: (id: string) => void;
}

export function DeleteTaskModal({ opened, close, task, onTaskDelete }: DeleteTaskModalProps) {
  return (
    <Modal opened={opened} onClose={close} title="Delete Task" centered>
      <Stack gap="md">
        <Text size="sm">
          Are you sure you want to delete <strong>{task?.title}</strong>? This action cannot be
          undone.
        </Text>

        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={close}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => {
              if (task) {
                onTaskDelete(task.id);
              }
            }}
          >
            Delete Task
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
