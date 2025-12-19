import { MantineColor } from '@mantine/core';
import { TaskPriority, TaskState } from '../../model/task';

export const useTaskCard = () => {
  const getStateColor = (state: TaskState): MantineColor => {
    switch (state) {
      case 'in progress':
        return 'blue';
      case 'completed':
        return 'teal';
      case 'pending':
      default:
        return 'gray';
    }
  };

  const getPriorityColor = (priority: TaskPriority): MantineColor => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'yellow';
      default:
        return 'gray';
    }
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  return {
    getStateColor,
    getPriorityColor,
    formatDate,
  };
};
