import { Readable } from 'stream';

export class FileUtil {
  static getBase64StreamReadable(base64data: string) {
    const splitedString = base64data.split(',');
    const buffer = Buffer.from(
      splitedString[splitedString.length - 1],
      'base64',
    );
    const readable = new Readable();
    readable._read = () => {};
    readable.push(buffer);
    readable.push(null);
    return readable;
  }

  static getBufferStreamReadable = (buffer: Buffer) => {
    const readable = new Readable();
    readable._read = () => {};
    readable.push(buffer);
    readable.push(null);
    return readable;
  };

  static extractFileNameAndExtension = (filename: string) => {
    const lastDotIndex = filename.lastIndexOf('.');
    const name = filename.substring(0, lastDotIndex);
    const extension = filename.substring(lastDotIndex + 1);
    return { name, extension };
  };
}
