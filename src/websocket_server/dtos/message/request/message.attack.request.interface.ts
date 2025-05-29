import { MessageType } from '../../../enums/message.type.enum';
import { Message } from '../../message.interface';

export interface AttackRequest extends Message {
  type: MessageType.ATTACK;
  data: {
    gameId: string;
    x: number;
    y: number;
    indexPlayer: string;
  };
}
