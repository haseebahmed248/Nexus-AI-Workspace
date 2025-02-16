import { Socket, Server as SocketServer } from "socket.io";

export const messageHandler = (io: SocketServer, socket: Socket) => {
  socket.on("sendMessage", (data) => {
    io.to(data.room).emit("recieve_message", data);
    console.log("data:", data);
  });
};
