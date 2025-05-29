import { MessageType } from '../../../enums/message.type.enum';
import { Message } from '../../message.interface';

export interface FinishResponse extends Message {
  type: MessageType.FINISH;
  data: {
    winPlayer: string;
  };
}
