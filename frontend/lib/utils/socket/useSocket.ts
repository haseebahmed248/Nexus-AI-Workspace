import { useCallback, useEffect } from "react";
import SocketManager from "./socketManager";
import {
  ClientToServerEvents,
  ServerToClientEvent,
} from "@/types/socket.types";

export const useSocket = () => {
  const socketManager = SocketManager.getInstance();

  useEffect(() => {
    socketManager.connect();
    return () => {
      socketManager.disconnect();
    };
  }, []);

  const emit = useCallback(
    <E extends keyof ClientToServerEvents>(
      event: E,
      ...args: Parameters<ClientToServerEvents[E]>
    ) => {
      socketManager.emit(event, ...args);
    },
    []
  );

  const on = useCallback(
    <T extends keyof ServerToClientEvent>(
      event: T,
      listener: (...args: Parameters<ServerToClientEvent[T]>) => void
    ) => {
      socketManager.on(event, listener);
    },
    []
  );

  const off = useCallback(<T extends keyof ServerToClientEvent>(event: T) => {
    socketManager.off(event);
  }, []);
  return { on, off, emit };
};
