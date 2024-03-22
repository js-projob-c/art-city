import { TaskStatus, TaskVisibleTo } from '../enums';
import { IEntity } from '.';

export interface ITask extends IEntity {
  id: string;
  projectId: string;
  name: string;
  description: string;
  visibleTo: TaskVisibleTo;
  status: TaskStatus;
  progress: number;
  completedAt: string;
}
