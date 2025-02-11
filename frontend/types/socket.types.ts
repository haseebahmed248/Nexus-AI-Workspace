import { Socket } from "socket.io-client";
import { Task } from "./Work-Space";

export interface ServerToClientEvent {
  connect: () => void;
  disconnect: () => void;
  connect_error: (error: Error) => void;
  taskCreated: (task: Task) => void;
  taskUpdated: (task: Task) => void;
}

export interface ClientToServerEvents {
  createTask: (task: Task) => void;
  updateTask: (task: Task) => void;
}

export type SocketType = Socket<ServerToClientEvent, ClientToServerEvents>;
