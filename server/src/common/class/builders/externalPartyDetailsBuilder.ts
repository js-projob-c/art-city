import { ExternalProjectPartyDetails } from 'src/database/entities/external-project.entity';

export class ExternalPartyDetailsBuilder {
  private externalPartyDetails: ExternalProjectPartyDetails;

  constructor() {
    this.externalPartyDetails = new ExternalProjectPartyDetails();
  }

  withId(id: string): this {
    this.externalPartyDetails.id = id;
    return this;
  }

  withCompany(company: string): this {
    this.externalPartyDetails.company = company;
    return this;
  }

  withContactName(contactName: string): this {
    this.externalPartyDetails.contactName = contactName;
    return this;
  }

  withContactRole(contactRole: string): this {
    this.externalPartyDetails.contactRole = contactRole;
    return this;
  }

  withEmail(email?: string): this {
    this.externalPartyDetails.email = email;
    return this;
  }

  withPhone(phone?: string): this {
    this.externalPartyDetails.phone = phone;
    return this;
  }

  build() {
    return this.externalPartyDetails;
  }
}
