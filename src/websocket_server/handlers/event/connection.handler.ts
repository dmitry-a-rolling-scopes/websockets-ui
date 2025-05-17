import { RawData, WebSocket } from 'ws';
import { IncomingMessage } from 'node:http';
import { ConsoleLogger } from '../../utils/console.logger';
import { DataFormatter } from '../../utils/websocket.data.formatter';

export class ConnectionHandler {
  public static handle = (
    webSocket: WebSocket,
    request: IncomingMessage,
    webSocketClients: Set<WebSocket>,
  ): void => {
    webSocketClients.add(webSocket);

    const ip = request.socket.remoteAddress;
    ConsoleLogger.logSuccess(`Client "${ip}" connected`);

    webSocket.send(DataFormatter.format('handshake'));

    webSocket.on('message', (message: RawData): void => {
      console.log(`Message: ${message}`);
    });

    webSocket.on('close', (): void => {
      webSocketClients.delete(webSocket);

      ConsoleLogger.logWarning('Client disconnected');
    });
  };
}
