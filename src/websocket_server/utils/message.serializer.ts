import { Message } from '../dtos/message.interface';

export class MessageSerializer {
  public static serialize(message: Message): string {
    message.data = JSON.stringify(message.data);

    return JSON.stringify(message);
  }
}
