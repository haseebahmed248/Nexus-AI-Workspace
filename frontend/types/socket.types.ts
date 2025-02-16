import { Socket } from "socket.io-client";
import { Task } from "./Work-Space";
import { Message } from "./conversation";

export interface ServerToClientEvent {
  connect: () => void;
  disconnect: () => void;
  connect_error: (error: Error) => void;
  taskCreated: (task: Task) => void;
  taskUpdated: (task: Task) => void;
  recieveMessage: (message: Message) => void;
  joinedRoom: (room: string) => void;
}

export interface ClientToServerEvents {
  createTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  sendMessage: (message: Message) => void;
  joinRoom: (room: string) => void;
}

export type SocketType = Socket<ServerToClientEvent, ClientToServerEvents>;
