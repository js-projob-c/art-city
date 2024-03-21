import { BaseType } from '.';
import { ProjectStatus } from '../enums';

export interface ProjectType extends BaseType {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  status: ProjectStatus;
  completedAt: string;
}
