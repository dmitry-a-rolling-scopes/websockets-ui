import { RegRequest } from '../../../../dtos/message/request/message.reg.request.interface';
import { State } from '../../../../state';
import { Player } from '../../../../entities/player.entity';
import { RegResponse } from '../../../../dtos/message/response/message.reg.response.interface';
import { MessageType } from '../../../../enums/message.type.enum';
import { PlayerWebSocket } from '../../../../interfaces/web-socket.player.interface';

export class RegHandler {
  public static handle(
    webSocket: PlayerWebSocket,
    request: RegRequest,
  ): RegResponse {
    const username = request.data.name;
    const player = new Player(webSocket, username, request.data.password);

    const databaseHasPlayer = State.database.hasPlayer(username);
    const response: RegResponse = {
      type: MessageType.REG,
      data: {
        name: username,
        index: player.id,
        error: databaseHasPlayer,
        errorText: databaseHasPlayer
          ? `User with username "${username}" already exists`
          : '',
      },
      id: 0,
    };

    if (!databaseHasPlayer) {
      webSocket.player = player;
      State.database.addPlayer(player);
    }

    return response;
  }
}
