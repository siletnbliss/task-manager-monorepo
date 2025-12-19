import { Button, SegmentedControl, Select, Stack, Text, Textarea, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { PriorityInput } from '../../components/input/PriorityInput';
import { TaskFormValues } from './useTaskForm';

interface TaskFormProps {
  form: UseFormReturnType<TaskFormValues>;
  onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  isEditing?: boolean;
  isSubmitting?: boolean;
}

export function TaskForm({
  form,
  onSubmit,
  onCancel,
  isEditing = false,
  isSubmitting = false,
}: TaskFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <Stack gap="md">
        <TextInput
          label="Task Title"
          placeholder="e.g. Redesign Homepage"
          data-autofocus
          required
          {...form.getInputProps('title')}
        />

        <Textarea
          label="Description"
          placeholder="Add details about this task..."
          minRows={4}
          {...form.getInputProps('description')}
        />

        <div>
          <Text size="sm" fw={500} mb={3}>
            Priority
          </Text>
          <PriorityInput
            fullWidth
            color={isEditing ? 'blue' : 'indigo'} // Subtle visual cue
            {...form.getInputProps('priority')}
          />
        </div>

        <Select
          label="Status"
          data={[
            { label: 'To Do', value: 'pending' },
            { label: 'In Progress', value: 'in progress' },
            { label: 'Done', value: 'completed' },
          ]}
          {...form.getInputProps('status')}
        />

        <Button type="submit" fullWidth mt="md" loading={isSubmitting}>
          {isEditing ? 'Save Changes' : 'Create Task'}
        </Button>

        <Button variant="light" color="gray" fullWidth onClick={onCancel}>
          Cancel
        </Button>
      </Stack>
    </form>
  );
}
