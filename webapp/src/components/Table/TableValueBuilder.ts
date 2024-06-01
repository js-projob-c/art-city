export class TableValueBuilder {
  private output: any;

  constructor(
    protected readonly value: any,
    protected readonly obj: Record<string, any>
  ) {
    this.output = value;
  }

  public build() {
    return this.output;
  }

  public transform(
    transformer?: (value: any, obj: Record<string, any>) => any
  ): TableValueBuilder {
    if (!transformer) return this;
    this.output = transformer(this.value, this.obj);
    return this;
  }
}
