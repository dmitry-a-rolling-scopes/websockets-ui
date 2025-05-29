import { MessageType } from '../../../enums/message.type.enum';
import { Message } from '../../message.interface';

export interface CreateGameResponse extends Message {
  type: MessageType.CREATE_GAME;
  data: {
    idGame: string;
    idPlayer: string;
  };
}
