import { MessageType } from '../../../enums/message.type.enum';
import { Message } from '../../message.interface';
import { Status } from '../message.data.attack.status.type';
import { Position } from '../message.data.ship.position.interface';

export interface AttackResponse extends Message {
  type: MessageType.ATTACK;
  data: {
    position: Position;
    currentPlayer: string;
    status: Status;
  };
}
