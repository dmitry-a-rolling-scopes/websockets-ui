import { WebSocket } from 'ws';
import { Player } from '../entities/player.entity';

export interface PlayerWebSocket extends WebSocket {
  player: Player;
}
