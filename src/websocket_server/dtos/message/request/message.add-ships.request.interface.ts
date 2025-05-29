import { MessageType } from '../../../enums/message.type.enum';
import { Message } from '../../message.interface';
import { Ship } from '../message.data.ship.interface';

export interface AddShipsRequest extends Message {
  type: MessageType.ADD_SHIPS;
  data: {
    gameId: string;
    ships: Ship[];
    indexPlayer: string;
  };
}
