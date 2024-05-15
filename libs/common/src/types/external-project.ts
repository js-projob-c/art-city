import { ExternalProjectStatus } from '../enums/external-project';
import { IEntity } from '.';

export interface IExternalProject extends IEntity {
  id: string;
  // externalPartyId: string;
  name: string;
  description: string;
  status: ExternalProjectStatus;
}

export interface IExternalProjectPartyDetails {
  company: string;
  contactName: string;
  contactRole: string;
  email?: string;
  phone?: string;
}
