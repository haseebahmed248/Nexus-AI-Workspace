import { Room } from "@/types/conversation";

export class RoomManager {
  static createRoomId(type: Room["type"], identifier: string): string {
    return `${type}_${identifier}`;
  }

  static createDirectMessageRoomId(userId1: string, userId2: string): string {
    const sortIds = [userId1, userId2].sort((a, b) => a.localeCompare(b));
    return this.createRoomId("direct", `${sortIds[0]}_${sortIds[1]}`);
  }

  static createGroupRoomId(groupId: string): string {
    return this.createRoomId(`group`, groupId);
  }
}
