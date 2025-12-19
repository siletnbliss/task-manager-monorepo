import { useForm } from '@mantine/form';
import { Task } from '../../model/task';

export type TaskFormValues = Omit<Task, 'id' | 'updatedAt'>;

export const useTaskForm = (
  onSubmit: (values: TaskFormValues) => void,
  initialValues?: TaskFormValues
) => {
  const form = useForm<TaskFormValues>({
    initialValues: {
      title: initialValues?.title || '',
      description: initialValues?.description || '',
      priority: initialValues?.priority || 'medium',
      status: initialValues?.status || 'pending',
    },
    validate: {
      title: (value) => (value.length < 2 ? 'Title is too short' : null),
    },
  });

  const handleSubmit = (values: TaskFormValues) => {
    onSubmit(values);
    if (!initialValues) {
      form.reset();
    }
  };

  return {
    form,
    handleSubmit: form.onSubmit(handleSubmit),
    isEditing: !!initialValues,
  };
};
