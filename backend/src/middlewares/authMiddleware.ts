import { logger } from "@/lib/logger";
import { Cache } from "@/utils/cache";
import { AuthenticationError } from "@/utils/error";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    console.log("USER token", token);
    if (!token) throw new Error("No token provided");

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const cache = new Cache();
    const data = await cache.redisClient.get(`userId:${decoded.userId}`);
    logger.info("cache_data", {
      data: data,
    });
    req.user = data;
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication required" });
  }
};

export const adminAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("admin Cookie: ", req.headers.authorization);
    const token = req.headers.authorization
      ?.replace("Bearer", "")
      .replace(" ", "");
    console.log("admin user:", token);
    if (!token) throw new AuthenticationError("No Token provided");
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const cache = new Cache();
    const data = await cache.redisClient.get(`userId:${decoded.userId}`);
    const formatedData = JSON.parse(data);
    if (formatedData.role !== "ADMIN")
      throw new AuthenticationError("Not an Admin");
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof AuthenticationError) {
      res.status(401).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(401).json({
        error: "Authentication required",
      });
    }
  }
};

export const resetSession = async (
  // this need to be updated
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization
      ?.replace("Bearer", "")
      .replace(" ", "");
    if (!token) throw new AuthenticationError("No Token provided");
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication required" });
  }
};
