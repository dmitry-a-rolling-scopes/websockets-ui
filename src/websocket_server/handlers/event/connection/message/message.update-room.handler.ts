import { UpdateRoomResponse } from '../../../../dtos/message/response/message.update-room.response.interface';
import { MessageType } from '../../../../enums/message.type.enum';
import { State } from '../../../../state';
import { Room } from '../../../../entities/room.entity';
import { Player } from '../../../../entities/player.entity';

export class UpdateRoomHandler {
  public static handle(): UpdateRoomResponse {
    const availableRooms = State.database.getAvailableRooms();
    const data = availableRooms.map(function (room: Room) {
      const roomPlayers = Array.from(room.getPlayers().values());

      return {
        roomId: room.id,
        roomUsers: roomPlayers.map((player: Player) => ({
          name: player.username,
          index: player.id,
        })),
      };
    });

    return {
      type: MessageType.UPDATE_ROOM,
      data: data,
      id: 0,
    };
  }
}
