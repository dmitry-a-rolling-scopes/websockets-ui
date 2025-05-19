import { AbstractEntity } from './entity.abstract';
import { Player } from './player.entity';

export class Winner extends AbstractEntity {
  private readonly player: Player;

  private wins: number = 0;

  constructor(player: Player) {
    super();

    this.player = player;
  }

  public getPlayer = (): Player => this.player;

  public addWin(): Winner {
    this.wins++;

    return this;
  }

  public getWins = (): number => this.wins;
}
