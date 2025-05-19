import { State } from '../../../../state';
import { Room } from '../../../../entities/room.entity';
import { PlayerWebSocket } from '../../../../interfaces/web-socket.player.interface';

export class CreateRoomHandler {
  public static handle(webSocket: PlayerWebSocket): void {
    const room = new Room();

    room.addPlayer(webSocket.player);

    State.database.addRoom(room);
  }
}
