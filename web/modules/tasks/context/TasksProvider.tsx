'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { useApiQuery } from '@/modules/common/hooks/useApiQuery';
import { BaseApiResponse } from '@/modules/common/model/api';
import { Task, TaskState } from '../model/task';

interface TasksContextType {
  tasksByState: Record<TaskState, Task[]>;
  setPriority: (priority: string) => void;
  refetch: () => void;
  isPending: boolean;
  isError: boolean;
  error: any;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const {
    data: tasks = [],
    refetch,
    isPending,
    isError,
    error,
  } = useApiQuery<BaseApiResponse<Task[]>>({
    url: '/tasks',
  });

  const [priority, setPriority] = useState('all');

  const tasksByState = useMemo(() => {
    const grouped: Record<TaskState, Task[]> = {
      pending: [],
      'in progress': [],
      completed: [],
    };
    if (!tasks || !('responseObject' in tasks)) {
      return grouped;
    }

    tasks.responseObject.forEach((task) => {
      const priorityMatch = priority === 'all' || task.priority === priority;
      if (!priorityMatch) {
        return;
      }
      if (grouped[task.status]) {
        grouped[task.status].push(task);
      } else {
        console.warn(`Task ${task.id} has unknown status: ${task.status}`);
      }
    });

    return grouped;
  }, [tasks, priority]);

  const value = {
    tasksByState,
    refetch,
    isPending,
    isError,
    error,
    setPriority,
  };

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasksContext() {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
}
