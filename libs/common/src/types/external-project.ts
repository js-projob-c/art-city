import { ExternalProjectStatus } from '../enums/external-project';
import { IEntity } from '.';

export interface IExternalProjectPartyDetails {
  company: string;
  contactName: string;
  contactRole: string;
  email?: string;
  phone?: string;
}

export interface IExternalProject extends IEntity {
  id: string;
  name: string;
  description: string;
  status: ExternalProjectStatus;
}
