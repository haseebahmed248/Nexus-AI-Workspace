import {
  ClientToServerEvents,
  ServerToClientEvent,
} from "@/types/socket.types";
import { getSocket } from "./socket";

class SocketManager {
  private static instance: SocketManager;
  private readonly socket = getSocket();
  private connectionState: "connected" | "disconnected" | "connecting" =
    "disconnected";

  private constructor() {
    this.initlizeSocketEvents();
  }

  public static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }
  private initlizeSocketEvents() {
    this.socket.on("connect", () => {
      console.log(`Socket Connected`);
      this.connectionState = "connected";
    });

    this.socket.on("disconnect", () => {
      console.log(`Socket Disconnected`);
      this.connectionState = "disconnected";
    });

    this.socket.on("connect_error", (error: any) => {
      console.log(`Socket Connection Error : ${error}`);
    });
  }
  public connect() {
    if (this.connectionState === "disconnected") {
      this.socket.connect();
      this.connectionState = "connecting";
    }
  }

  public disconnect() {
    this.socket.disconnect();
  }

  public emit<E extends keyof ClientToServerEvents>(
    event: E,
    ...args: Parameters<ClientToServerEvents[E]>
  ): void {
    if (this.connectionState === "connected") {
      this.socket.emit(event, ...args);
    } else {
      console.warn("Socket not connected. Cannot emit event:", event);
    }
  }

  public on<T extends keyof ServerToClientEvent>(
    event: T,
    listener: (...args: Parameters<ServerToClientEvent[T]>) => void
  ): void {
    this.socket.on(event, listener as any); // Type assertion needed due to Socket.IO's complex types
  }

  public off<T extends keyof ServerToClientEvent>(event: T): void {
    this.socket.off(event);
  }
}

export default SocketManager;
