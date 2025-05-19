import { MessageType } from '../../../enums/message.type.enum';
import { Message } from '../../message.interface';

export interface RegRequest extends Message {
  type: MessageType.REG;
  data: {
    name: string;
    password: string;
  };
}
