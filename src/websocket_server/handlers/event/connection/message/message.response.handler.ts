import { Message } from '../../../../dtos/message.interface';
import { MessageSerializer } from '../../../../utils/message.serializer';
import { PlayerWebSocket } from '../../../../interfaces/web-socket.player.interface';

export class ResponseHandler {
  public static handle = (
    webSocket: PlayerWebSocket,
    ...responses: Message[]
  ): void => {
    for (const response of responses) {
      console.log({ response });

      webSocket.send(MessageSerializer.serialize(response));
    }
  };
}
