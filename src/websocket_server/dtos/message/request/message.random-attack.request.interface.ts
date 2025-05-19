import { MessageType } from '../../../enums/message.type.enum';
import { Message } from '../../message.interface';

export interface RandomAttackRequest extends Message {
  type: MessageType.RANDOM_ATTACK;
  data: {
    gameId: string;
    indexPlayer: string;
  };
}
