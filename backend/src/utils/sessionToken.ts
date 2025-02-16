import { Socket } from "socket.io";
import { Cache } from "@/utils/cache";
import { logger } from "@/lib/logger";
import { AuthenticationError } from "@/utils/error";
import { decode } from "next-auth/jwt";

const decryptNextAuthToken = async (encryptedToken: string): Promise<any> => {
  try {
    const decoded = await decode({
      token: encryptedToken,
      secret: process.env.NEXTAUTH_SECRET!,
    });

    if (!decoded) {
      throw new Error("Failed to decode token");
    }

    return decoded;
  } catch (error) {
    logger.error("Token decryption failed", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return null;
  }
};

export const socketAuthMiddleware = async (
  socket: Socket,
  next: (err?: Error) => void
) => {
  try {
    const cookies = socket.handshake.headers.cookie;

    if (!cookies) {
      throw new AuthenticationError("No cookies provided");
    }

    // Parse cookies to get the session token
    const sessionToken = cookies
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith("next-auth.session-token="))
      ?.split("=")[1];

    if (!sessionToken) {
      throw new AuthenticationError("No session token found");
    }

    // Decrypt the session token
    const session = await decryptNextAuthToken(sessionToken);

    if (!session || !session.userId) {
      // Changed from session.sub to session.userId
      throw new AuthenticationError("Invalid session data");
    }

    // Get user data from Redis cache
    const cache = new Cache();
    const userData = await cache.redisClient.get(`userId:${session.userId}`); // Changed from session.sub

    if (!userData) {
      throw new AuthenticationError("Invalid session");
    }

    // Parse user data
    const user = JSON.parse(userData);

    logger.info("socket_auth_success", {
      userId: session.userId, // Changed from session.sub
      socketId: socket.id,
    });

    // Store in socket.data
    socket.data.userId = session.userId; // Changed from session.sub
    socket.data.user = user;

    next();
  } catch (error) {
    logger.error("socket_auth_error", {
      error: error instanceof Error ? error.message : "Unknown error",
      socketId: socket.id,
    });
    next(new AuthenticationError("Authentication failed"));
  }
};
