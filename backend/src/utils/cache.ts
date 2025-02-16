import { createClient } from "redis";
import { ServerError } from "./error";
import { logger } from "@/lib/logger";

export class Cache {
  public redisClient!: any;
  constructor() {
    this.cacheClient();
  }

  private readonly cacheClient = async () => {
    this.redisClient = createClient({
      url: process.env.REDIS_URL,
    });
    await this.redisClient.connect();
  };

  cacheUserSession = async (userId: string, data: any) => {
    if (!this.cacheClient) {
      throw new ServerError("Cache Client/Connection refused!");
    }
    this.redisClient.on("error", (err: Error) =>
      logger.error("Cache_Error", {
        message: err,
      })
    );
    await this.redisClient.set(`userId:${userId}`, JSON.stringify(data), {
      EX: 24 * 60 * 60,
    });
  };
  checkUserSession = async (userId: string) => {
    if (!this.cacheClient) {
      throw new ServerError("Cache Cliient/Connection refused");
    }
    this.redisClient.on("error", (err: Error) =>
      logger.error("Cache Error", {
        message: err,
      })
    );
    const data = await this.redisClient.get(`userId:${userId}`);
    return data;
  };

  del = async (key: string) => {
    this.redisClient.del(key);
  };

  public set = async (key: string, value: string) => {
    await this.redisClient.set(key, value);
  };

  get = async (key: string) => {
    return this.redisClient.get(key);
  };

  getKeys = async (pattern: string) => {
    return this.redisClient.keys(pattern);
  };
}
