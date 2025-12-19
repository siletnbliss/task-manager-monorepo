import { Badge, Group, Paper, Skeleton, Stack, Title } from '@mantine/core';
import { MutableTaskProps, TaskCard } from '../../components/card/TaskCard';
import { Task } from '../../model/task';

interface KanbanColumnProps extends MutableTaskProps {
  title: string;
  tasks: Task[];
  isLoading?: boolean;
}

function LoadingSkeletons() {
  return (
    <Stack gap="md">
      {[...Array(3)].map((_, index) => (
        <Skeleton key={index} w={'22rem'} h={'12rem'} />
      ))}
    </Stack>
  );
}

export function KanbanColumn({ title, tasks, isLoading, ...mutableTaskProps }: KanbanColumnProps) {
  return (
    <Paper
      p="md"
      radius="md"
      h="100%"
      style={{
        minHeight: '400px',
        backgroundColor: 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-5))',
      }}
      miw={'20rem'}
    >
      <Group justify="space-between" mb="md">
        <Title order={4} fw={700}>
          {title}
        </Title>
        <Badge variant="light" color="gray" circle>
          {tasks.length}
        </Badge>
      </Group>

      <Stack gap="md">
        {isLoading ? (
          <LoadingSkeletons />
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} {...mutableTaskProps} />)
        )}
      </Stack>
    </Paper>
  );
}
