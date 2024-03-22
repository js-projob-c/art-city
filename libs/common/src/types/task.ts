import { IEntity } from '.';
import { TaskStatus, TaskVisibleTo } from '../enums';

export interface ITask extends IEntity {
  id: string;
  projectId: string;
  title: string;
  description: string;
  visibleTo: TaskVisibleTo;
  status: TaskStatus;
  progress: number;
  completedAt: string;
}
