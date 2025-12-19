import { useDisclosure } from '@mantine/hooks';
import { useApiMutation } from '@/modules/common/hooks/useApiMutation';
import { useTasksContext } from '../../context/TasksProvider';
import { TaskFormValues } from '../form/useTaskForm';

export const useTaskDrawer = (isEdit?: boolean) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { refetch } = useTasksContext();
  const { mutate, isPending } = useApiMutation<object, TaskFormValues>(
    {
      method: isEdit ? 'PUT' : 'POST',
      url: '/tasks' + (isEdit ? '/:id' : ''),
    },
    {
      successMessage: isEdit ? 'Task updated successfully' : 'Task created successfully',
      errorMessage: 'Failed to save task. Please try again.',
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
