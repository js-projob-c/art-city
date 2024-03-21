import { BaseType } from '.';

export interface TaskUserType extends BaseType {
  id: string;
  taskId: string;
  userId: string;
}
