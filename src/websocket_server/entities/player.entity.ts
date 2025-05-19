import { AbstractEntity } from './entity.abstract';
import { PlayerWebSocket } from '../interfaces/web-socket.player.interface';

export class Player extends AbstractEntity {
  public readonly username: string;

  public readonly password: string;

  public readonly webSocket: PlayerWebSocket;

  constructor(webSocket: PlayerWebSocket, username: string, password: string) {
    super();

    this.id = username;
    this.username = username;
    this.password = password;
    this.webSocket = webSocket;
  }

  public getWebSocket(): PlayerWebSocket {
    return this.webSocket;
  }
}
