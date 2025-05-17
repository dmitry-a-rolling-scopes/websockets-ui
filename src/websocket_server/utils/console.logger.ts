import os from 'node:os';
import util from 'node:util';

export class ConsoleLogger {
  public static logError = (message: string): void => {
    this.log('red', message);
  };

  public static logSuccess = (message: string): void => {
    this.log('green', message);
  };

  public static logWarning = (message: string): void => {
    this.log('yellow', message);
  };

  private static log = (
    color: 'red' | 'green' | 'yellow',
    message: string,
  ): void => {
    console.log(util.styleText([color], `${os.EOL}${message}`));
  };
}
