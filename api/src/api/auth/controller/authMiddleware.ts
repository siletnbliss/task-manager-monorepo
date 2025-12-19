import { NextFunction, Request, Response } from "express";
import { validateToken } from "../utils/tokens";
import { env } from "@/common/utils/envConfig";
import { UserPayload } from "@/common/types/express";
import { ServiceResponse } from "@/common/models/serviceResponse";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    const response = ServiceResponse.failure(
      "Authentication required",
      null,
      401
    );
    res.status(response.statusCode).json(response);
    return;
  }
  try {
    const payload = validateToken(token, env.ACCESS_TOKEN_SECRET);
    if (!payload) {
      throw new Error("Invalid token");
    }
    req.user = payload as UserPayload;
    next();
  } catch (error) {
    const response = ServiceResponse.failure(
      "Invalid or expired token",
      null,
      403
    );
    res.status(response.statusCode).json(response);
    return;
  }
};
