import { WebSocket, WebSocketServer } from 'ws';
import { WebSocketCloseCode } from '../../enums/websocket.close-code.enum';
import { ProcessExitCode } from '../../enums/process.exit-code.enum';
import { Server } from 'node:http';
import { ConsoleLogger } from '../../utils/console.logger';
import { DataFormatter } from '../../utils/websocket.data.formatter';

export class SignalHandler {
  public static handle = (
    httpServer: Server,
    webSocketServer: WebSocketServer,
    webSocketClients: Set<WebSocket>,
  ): void => {
    webSocketClients.forEach((webSocket: WebSocket): void => {
      ConsoleLogger.logWarning('WebSocket closed');

      webSocket.send(DataFormatter.format('going_away'));
      webSocket.close(WebSocketCloseCode.GOING_AWAY);
    });

    webSocketServer.close((): void => {
      ConsoleLogger.logWarning('WebSocket server closed');
    });

    httpServer.close((): never => {
      ConsoleLogger.logWarning('HTTP server closed');

      process.exit(ProcessExitCode.SUCCESS);
    });
  };
}
