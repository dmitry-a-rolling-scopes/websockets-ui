import { AbstractEntity } from './entity.abstract';
import { Player } from './player.entity';
import { PlayerWebSocket } from '../interfaces/web-socket.player.interface';

export class Room extends AbstractEntity {
  private players: Map<string, Player> = new Map<string, Player>();

  public addPlayer(player: Player): Room {
    this.players.set(player.id, player);

    return this;
  }

  public getPlayers = (): Map<string, Player> => this.players;

  public getNextPlayer(currentPlayer: Player): Player {
    for (const player of Array.from(this.players.values())) {
      if (player.id !== currentPlayer.id) {
        return player;
      }
    }

    return currentPlayer;
  }

  public isFull = (): boolean => this.players.size === 2;

  public getWebSockets(): PlayerWebSocket[] {
    return Array.from(this.players.values()).map(
      (player: Player): PlayerWebSocket => player.getWebSocket(),
    );
  }
}
