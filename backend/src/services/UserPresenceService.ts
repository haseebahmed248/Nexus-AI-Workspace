import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { Cache } from "@/utils/cache";
import { Socket } from "socket.io";

export class UserPresenceService {
  private readonly cache!: Cache;
  private cleanUpInterval!: NodeJS.Timer;

  constructor() {
    this.cache = new Cache();
    this.startCleanupInterval();
  }

  private startCleanupInterval() {
    this.cleanUpInterval = setInterval(() => {});
  }

  async handleUserDisconnect(userId: string) {
    try {
      // update last seen in database
      await prisma.user.update({
        where: { userId },
        data: { lastSeen: new Date() },
      });

      // remove from redis
      await this.cache.del(`user:${userId}:status`);
      await this.cache.del(`user:${userId}:status`);
    } catch (error) {
      logger.error(`Error Disconnecting User: ${error}`);
    }
  }

  //Bluk CleanUp for offline users
  private async cleanOfflineUsers() {
    try {
      // Get all uses Keys
      const statusKeys = await this.cache.getKeys(`user:*:status`);

      for (const key of statusKeys) {
        const status = await this.cache.get(key);
        if (status === "offline") {
          //extract userId from key (format: users:123:status)
          const userId = key.split(":")[1];

          //clean up this user
          await this.handleUserDisconnect(userId);
        }
      }
    } catch (error) {
      logger.error(`Bluk CleanUp error: ${error}`);
    }
  }

  async handleSocketDisconnect(socket: Socket) {
    const userId = socket.data.userId;
    if (userId) {
      //set User status to offline
      await this.cache.set(`user:${userId}:status`, "offline");

      //start cleanUp for this user
      await this.handleUserDisconnect(userId);
    }
  }

  async setUserOnline(userId: string) {
    if (userId) {
      await this.cache.set(`user:${userId}:status`, "online");
    }
  }
}
