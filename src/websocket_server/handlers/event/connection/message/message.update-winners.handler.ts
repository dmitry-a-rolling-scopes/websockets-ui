import { MessageType } from '../../../../enums/message.type.enum';
import { UpdateWinnersResponse } from '../../../../dtos/message/response/message.update-winners.response.interface';
import { State } from '../../../../state';
import { Winner } from '../../../../entities/winner.entity';
import { Winner as WinnerInterface } from '../../../../dtos/message/message.data.winner';

export class UpdateWinnersHandler {
  public static handle(): UpdateWinnersResponse {
    const winners = Array.from(State.database.getWinners().values());
    const data = winners.map(
      (winner: Winner): WinnerInterface => ({
        name: winner.getPlayer().username,
        wins: winner.getWins(),
      }),
    );

    return {
      type: MessageType.UPDATE_WINNERS,
      data: data,
      id: 0,
    };
  }
}
