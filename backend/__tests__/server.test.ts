import { Server } from "../src/index";
import { Application } from "express";

jest.mock("dotenv", () => ({
  config: jest.fn(),
}));
jest.mock("express", () => {
  const expressMock = () => ({
    use: jest.fn(),
    listen: jest.fn(),
  });
  expressMock.json = jest.fn();
  return expressMock;
});
jest.mock("http", () => ({
  createServer: jest.fn(() => ({
    listen: jest.fn((port, callback) => callback()),
  })),
}));
jest.mock("socket.io", () => ({
  Server: jest.fn(() => ({
    use: jest.fn(),
    on: jest.fn(),
  })),
}));
jest.mock("../src/api/test", () => ({}));
jest.mock("../src/api/user", () => ({}));
jest.mock("../src/api/admin", () => ({}));
jest.mock("../src/api/team-manager", () => ({}));
jest.mock("../src/utils/sessionToken", () => ({
  socketAuthMiddleware: jest.fn(),
}));
jest.mock("../src/services/UserPresenceService", () => ({
  UserPresenceService: jest.fn().mockImplementation(() => ({
    setUserOnline: jest.fn(),
    handleSocketDisconnect: jest.fn(),
  })),
}));
jest.mock("../src/handlers/messageHandler", () => jest.fn());
jest.mock("../src/handlers/roomHandler", () => jest.fn());
jest.mock("../src/lib/logger", () => ({
  logger: {
    info: jest.fn(),
  },
}));

describe("Server", () => {
  it("initializes the Express app and logs the start message", () => {
    process.env.PORT = "4000";
    const server = new Server();
    const app: Application = server.getApp();

    expect(app).toBeDefined(); // Check that app exists
    expect(typeof app.use).toBe("function");

    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    server.start();

    expect(consoleSpy).toHaveBeenCalledWith("Server running on port 4000");
    consoleSpy.mockRestore();
  });
});
