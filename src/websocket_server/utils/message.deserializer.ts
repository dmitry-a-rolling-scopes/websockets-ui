import { MessageDto } from '../dtos/message.dto';
import { Message } from '../dtos/message.interface';
import { RawData } from 'ws';

export class MessageDeserializer {
  public static deserialize(message: RawData): MessageDto {
    const messageObject: Message = JSON.parse(message.toString());

    return new MessageDto(
      messageObject.type,
      messageObject.data === ''
        ? messageObject.data
        : JSON.parse(messageObject.data as string),
      messageObject.id,
    );
  }
}
