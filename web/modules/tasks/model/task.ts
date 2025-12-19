export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskState = 'pending' | 'in progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskState;
  updatedAt: string;
}
