import { Readable } from 'stream';

export const base64StreamReadable = (base64data: string) => {
  const splitedString = base64data.split(',');
  // console.log('splitedString', splitedString[splitedString.length - 1]);
  const buffer = Buffer.from(splitedString[splitedString.length - 1], 'base64');
  const readable = new Readable();
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  readable._read = () => {};
  readable.push(buffer);
  readable.push(null);
  return readable;
};

export const streamReadable = (buffer: Buffer) => {
  const readable = new Readable();
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  readable._read = () => {};
  readable.push(buffer);
  readable.push(null);
  return readable;
};
