import { AddUserToRoomRequest } from '../../../../dtos/message/request/message.add-user-to-room.request.interface';
import { State } from '../../../../state';
import { PlayerWebSocket } from '../../../../interfaces/web-socket.player.interface';
import { Room } from '../../../../entities/room.entity';

export class AddUserToRoomHandler {
  public static handle(
    webSocket: PlayerWebSocket,
    request: AddUserToRoomRequest,
  ): Room {
    const room = State.database.getRoom(request.data.indexRoom);

    room?.addPlayer(webSocket.player);

    return room;
  }
}
