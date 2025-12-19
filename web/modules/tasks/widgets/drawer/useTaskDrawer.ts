import { useDisclosure } from '@mantine/hooks';
import { useApiMutation } from '@/modules/common/hooks/useApiMutation';
import { useTasksContext } from '../../context/TasksProvider';
import { TaskFormValues } from '../form/useTaskForm';

type Action = 'create' | 'edit' | 'delete';

const actionParams: Record<
  Action,
  { method: 'POST' | 'PUT' | 'DELETE'; url: string; success: string; error: string }
> = {
  create: {
    method: 'POST',
    url: '/tasks',
    success: 'Task created successfully',
    error: 'Failed to create task. Please try again.',
  },
  edit: {
    method: 'PUT',
    url: '/tasks/:id',
    success: 'Task updated successfully',
    error: 'Failed to update task. Please try again.',
  },
  delete: {
    method: 'DELETE',
    url: '/tasks/:id',
    success: 'Task deleted successfully',
    error: 'Failed to delete task. Please try again.',
  },
};

export const useTaskDrawer = (action: Action = 'create') => {
  const [opened, { open, close }] = useDisclosure(false);
  const { method, url, success, error } = actionParams[action];
  const { refetch } = useTasksContext();
  const { mutate, isPending } = useApiMutation<object, TaskFormValues>(
    {
      method,
      url,
    },
    {
      successMessage: success,
      errorMessage: error,
      onSuccess: async () => {
        refetch();
        close();
      },
    }
  );

  return {
    opened,
    open,
    close,
    mutate,
    isSubmitting: isPending,
  };
};
