import { Position } from './message.data.ship.position.interface';
import { Type } from './message.data.ship.type';

export interface Ship {
  position: Position;
  direction: boolean;
  length: number;
  type: Type;
}
