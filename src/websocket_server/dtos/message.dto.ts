import { MessageType } from '../enums/message.type.enum';
import { Message } from './message.interface';

export class MessageDto implements Message {
  public type: MessageType;

  public data: object | object[] | string;

  public id: 0;

  constructor(type: MessageType, data: object | object[] | string, id: 0) {
    this.type = type;
    this.data = data;
    this.id = id;
  }
}
