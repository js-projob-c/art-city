import { BaseType } from '.';
import { TaskStatus, TaskVisibleTo } from '../enums';

export interface TaskType extends BaseType {
  id: string;
  projectId: string;
  title: string;
  description: string;
  visibleTo: TaskVisibleTo;
  status: TaskStatus;
  progress: number;
  completedAt: string;
}
