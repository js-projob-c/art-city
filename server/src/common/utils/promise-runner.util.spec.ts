import { PromiseRunner } from './promise-runner.util';

describe('PromiseRunner', () => {
  let promiseRunner: PromiseRunner;

  beforeEach(() => {
    promiseRunner = new PromiseRunner();
  });

  it('should add a promise to the runner', async () => {
    const resolveValue = 'Result';
    const fn = jest.fn().mockResolvedValue('Result');
    promiseRunner.add(fn);

    expect(promiseRunner.promises).toHaveLength(1);
    const result = await promiseRunner.promises[0]?.promise();
    expect(result).toEqual(resolveValue);
  });

  it('should return id of the added promise', async () => {
    const fn = jest.fn().mockResolvedValue('Result');
    const id = promiseRunner.add(fn);

    expect(promiseRunner.promises).toHaveLength(1);
    expect(id).toBeDefined();
  });

  it('should be able to remove the promise with correlation id', async () => {
    const fn = jest.fn().mockResolvedValue('Result1');
    const fn2 = jest.fn().mockResolvedValue('Result2');
    const id = promiseRunner.add(fn);
    promiseRunner.add(fn2);

    promiseRunner.removeById(id);

    const [result] = await promiseRunner.run();

    expect(promiseRunner.promises).toHaveLength(1);
    expect(result).toEqual('Result2');
  });

  it('should run all promises in parallel', async () => {
    const delay = async (ms: number): Promise<void> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, ms);
      });
    };

    const fn1 = jest.fn().mockImplementation(async () => {
      const initTime = Date.now();
      return initTime;
    });
    const fn2 = jest.fn().mockImplementation(async () => {
      const initTime = Date.now();
      await delay(2000);
      return initTime;
    });
    const fn3 = jest.fn().mockImplementation(async () => {
      const initTime = Date.now();
      await delay(4000);
      return initTime;
    });

    promiseRunner.add(fn1);
    promiseRunner.add(fn2);
    promiseRunner.add(fn3);

    const result = await promiseRunner.run();
    const [initTime1, initTime2, initTime3] = result;

    expect(initTime1 === initTime2).toBe(true);
    expect(initTime1 === initTime3).toBe(true);
    expect(fn1).toHaveBeenCalled();
    expect(fn2).toHaveBeenCalled();
    expect(fn3).toHaveBeenCalled();
  }, 6000);

  it('should wait for all promises to complete', async () => {
    const fn1 = jest.fn().mockResolvedValue('Result 1');
    const fn2 = jest.fn().mockResolvedValue('Result 2');
    const fn3 = jest.fn().mockResolvedValue('Result 3');

    promiseRunner.add(fn1);
    promiseRunner.add(fn2);
    promiseRunner.add(fn3);

    expect(fn1).not.toHaveBeenCalled();
    expect(fn2).not.toHaveBeenCalled();
    expect(fn3).not.toHaveBeenCalled();

    await promiseRunner.run();

    expect(fn1).toHaveBeenCalled();
    expect(fn2).toHaveBeenCalled();
    expect(fn3).toHaveBeenCalled();
  });
});
