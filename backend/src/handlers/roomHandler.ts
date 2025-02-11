import { Socket, Server as SocketServer } from "socket.io";

export const roomHandler = (io: SocketServer, socket: Socket) => {
  socket.on("join_room", (room) => {
    socket.join(room);
  });
};
