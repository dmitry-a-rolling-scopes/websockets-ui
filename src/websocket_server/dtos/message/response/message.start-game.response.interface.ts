import { MessageType } from '../../../enums/message.type.enum';
import { Message } from '../../message.interface';
import { Ship } from '../message.data.ship.interface';

export interface StartGameResponse extends Message {
  type: MessageType.START_GAME;
  data: {
    ships: Ship[];
    currentPlayerIndex: string;
  };
}
