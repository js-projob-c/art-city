import { randomUUID } from 'crypto';

export interface PromiseRunnerItem {
  correlationId: string;
  promise: () => Promise<any>;
}

export class PromiseRunner {
  public promises: PromiseRunnerItem[] = [];

  add(fn: () => Promise<any>): string {
    const correlationId = randomUUID();
    this.promises.push({
      correlationId,
      promise: async () => {
        return await fn();
      },
    });
    return correlationId;
  }

  removeById(id: string) {
    this.promises = this.promises.filter(
      (promise) => promise.correlationId !== id,
    );
  }

  reset() {
    this.promises = [];
  }

  async run(): Promise<any> {
    return await Promise.all(this.promises.map(({ promise }) => promise()));
  }
}
