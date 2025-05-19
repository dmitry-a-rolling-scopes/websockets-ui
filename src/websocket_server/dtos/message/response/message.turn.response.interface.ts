import { MessageType } from '../../../enums/message.type.enum';
import { Message } from '../../message.interface';

export interface TurnResponse extends Message {
  type: MessageType.TURN;
  data: {
    currentPlayer: string;
  };
}
