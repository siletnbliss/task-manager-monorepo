import { NextFunction, Request, Response } from "express";
import { validateToken } from "../utils/tokens";
import { env } from "@/common/utils/envConfig";
import { UserPayload } from "@/common/types/express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }
  const payload = validateToken(token, env.ACCESS_TOKEN_SECRET);
  if (!payload) {
    res.status(403).json({ message: "Invalid or expired token" });
    return;
  }

  req.user = payload as UserPayload;
  next();
};
