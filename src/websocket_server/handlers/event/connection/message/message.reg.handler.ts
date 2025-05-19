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
    const player = new Player(
      webSocket,
      request.data.name,
      request.data.password,
    );

    webSocket.player = player;

    const response: RegResponse = {
      type: MessageType.REG,
      data: {
        name: player.username,
        index: player.id,
        error: false, // todo: add validation
        errorText: '',
      },
      id: 0,
    };

    State.database.addPlayer(player);

    return response;
  }
}
