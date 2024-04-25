// export interface IErrorResponseEntityProps {
//   code?: string | null;
//   message?: string;
//   data?: any;
// }

export interface IErrorResponseEntity {
  code: string | null;
  message: string | null;
  data: any | null;
}

export class ErrorResponseEntity<DataType = any> {
  public code: string | null = null;
  public message: string | null = null;
  public data: DataType | null = null;

  constructor(protected props: Partial<IErrorResponseEntity>) {
    this.code = props.code || null;
    this.message = props.message || null;
    this.data = props.data || null;
  }

  build(): IErrorResponseEntity {
    return {
      code: this.code,
      message: this.message,
      data: this.data,
    };
  }
}
