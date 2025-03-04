import { SocketType } from "@/types/socket.types";
import { io } from "socket.io-client";

//Singleton instance
let socket: SocketType | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_API_URL, {
      withCredentials: true,
      autoConnect: false,
    }) as SocketType;
  }
  return socket;
};
