import { IErrorFields } from '@art-city/common/types';
import { ValidationError } from 'class-validator';

export class ValidationErrorAdapter {
  constructor(private readonly validationError: ValidationError) {
    if (!validationError)
      throw new Error('ValidationErrorAdapter: validationError is required');
  }

  build(): IErrorFields {
    return {
      [this.validationError.property]: {
        message: this.validationError.constraints
          ? Object.values(this.validationError.constraints)?.[0]
          : '',
        constraint: this.validationError.constraints
          ? Object.keys(this.validationError.constraints)?.[0]
          : '',
      },
    };
  }
}
