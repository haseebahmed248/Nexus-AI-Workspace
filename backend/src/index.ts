import express, { Application } from "express";
import dotenv from "dotenv";
import router from "./api/test";
import useRouter from "./api/user";
import bodyParser from "body-parser";
import cors from "cors";
import adminRouter from "./api/admin";
import teamManagerRouter from "./api/team-manager";
import http from "http";
import { Server as SocketServer } from "socket.io";
import { messageHandler } from "./handlers/messageHandler";
import { roomHandler } from "./handlers/roomHandler";
import { logger } from "./lib/logger";
import { UserPresenceService } from "./services/UserPresenceService";
import { socketAuthMiddleware } from "./utils/sessionToken";

export class Server {
  private app!: Application;
  private PORT!: string | number;
  private server!: http.Server;
  private io!: SocketServer;
  private presenceHandler!: UserPresenceService;

  constructor() {
    this.setupDotEnv();
    this.setupExpress();
    this.setupMiddlewares();
    this.setupCros();
    this.setupRoutes();
    this.setupSocket();
  }

  private setupCros() {
    this.app.use(
      cors({
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true,
      })
    );
  }

  private setupDotEnv() {
    dotenv.config();
    this.PORT = process.env.PORT ?? 4000;
  }

  private setupExpress() {
    this.app = express();
    this.server = http.createServer(this.app);
  }

  private setupMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private setupRoutes() {
    this.app.use("/", router);
    this.app.use("/api", useRouter);
    this.app.use("/api/admin", adminRouter);
    this.app.use("/api/team-manager", teamManagerRouter);
  }

  private setupSocket() {
    this.presenceHandler = new UserPresenceService();
    this.io = new SocketServer(this.server, {
      cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
        credentials: true,
      },
    });
    this.io.use(socketAuthMiddleware);
    this.io.on("connection", (socket) => {
      logger.info(`Client Connected: ${socket.id}`);
      this.presenceHandler.setUserOnline(socket.data.userId);

      messageHandler(this.io, socket);
      roomHandler(this.io, socket);

      //disconnect
      socket.on("disconnect", () => {
        this.presenceHandler.handleSocketDisconnect(socket);
        logger.info(`client Disconnected: ${socket.id}`);
      });
    });
  }

  public getIO(): SocketServer {
    return this.io;
  }

  public async start() {
    try {
      this.server.listen(this.PORT, () => {
        console.log(`Server running on port ${this.PORT}`);
      });
    } catch (e) {
      console.log(`Error starting the server : ${e}`);
    }
  }

  public getApp(): Application {
    return this.app;
  }
}

const server = new Server();
server.start();

export default server.getApp();
