import { MessageType } from '../enums/message.type.enum';

export interface Message {
  type: MessageType;
  data: object | object[] | string;
  id: 0;
}
