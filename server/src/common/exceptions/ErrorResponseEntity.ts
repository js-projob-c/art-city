// export interface IErrorResponseEntityProps {
//   code?: string | null;
//   message?: string;
//   data?: any;
// }

export interface IErrorResponseEntity {
  code: string | null;
  message: string;
  data: any | null;
}

export class ErrorResponseEntity<DataType = any> {
  private code: string | null = null;
  private message: string = '';
  private data: DataType | null = null;

  constructor(protected props: Partial<IErrorResponseEntity>) {
    this.code = props.code || null;
    this.message = props.message || '';
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
