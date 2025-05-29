import { MessageType } from '../../../enums/message.type.enum';
import { Message } from '../../message.interface';

export interface RegResponse extends Message {
  type: MessageType.REG;
  data: {
    name: string;
    index: string;
    error: boolean;
    errorText: string;
  };
}
