import { IEntity } from '.';
import { ProjectStatus } from '../enums';

export interface IProject extends IEntity {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  status: ProjectStatus;
  completedAt: string;
}
