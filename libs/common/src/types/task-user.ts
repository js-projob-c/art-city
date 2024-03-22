import { IEntity } from '.';

export interface ITaskUser extends IEntity {
  id: string;
  taskId: string;
  userId: string;
}
