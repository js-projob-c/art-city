import { ProjectStatus } from '../enums';
import { IEntity } from '.';

export interface IProject extends IEntity {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  status: ProjectStatus;
  completedAt: string;
}
