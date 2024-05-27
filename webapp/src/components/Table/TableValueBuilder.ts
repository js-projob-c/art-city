export class TableValueBuilder {
  private value;

  constructor(protected readonly _value: any) {
    this.value = _value;
  }

  public build() {
    return this.value;
  }

  public transform(transformer?: (value: any) => any): TableValueBuilder {
    if (!transformer) return this;
    this.value = transformer(this.value);
    return this;
  }
}
