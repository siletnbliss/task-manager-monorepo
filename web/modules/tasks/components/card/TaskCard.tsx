import { IconDots, IconPencil, IconTrash } from '@tabler/icons-react';
import {
  ActionIcon,
  Badge,
  Card,
  Group,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
  rem,
  Text,
} from '@mantine/core';
import { Task } from '../../model/task';
import { useTaskCard } from './useTaskCard';

export interface MutableTaskProps {
  onEdit: (task: Task) => void;
}

interface TaskCardProps extends MutableTaskProps {
  task: Task;
}

export function TaskCard({ task, onEdit }: TaskCardProps) {
  const { getStateColor, getPriorityColor, formatDate } = useTaskCard();
  const stateColor = getStateColor(task.status);

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ borderLeft: `${rem(6)} solid var(--mantine-color-${stateColor}-filled)` }}
    >
      <Group justify="space-between" mb="xs">
        <Badge color={getPriorityColor(task.priority)} variant="light">
          {task.priority}
        </Badge>

        <Menu withinPortal position="bottom-end" shadow="sm">
          <MenuTarget>
            <ActionIcon variant="subtle" color="gray">
              <IconDots style={{ width: rem(16), height: rem(16) }} />
            </ActionIcon>
          </MenuTarget>

          <MenuDropdown>
            <MenuItem
              leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />}
              onClick={() => onEdit(task)}
            >
              Edit
            </MenuItem>
            <MenuItem
              leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
              color="red"
            >
              Delete
            </MenuItem>
          </MenuDropdown>
        </Menu>
      </Group>

      <Text fw={500} size="lg" mt="md">
        {task.title}
      </Text>

      <Text size="sm" c="dimmed" mt="xs" lineClamp={3}>
        {task.description}
      </Text>

      <Group justify="space-between" mt="md">
        <Text size="xs" c="dimmed">
          {formatDate(task.updatedAt)}
        </Text>
      </Group>
    </Card>
  );
}
