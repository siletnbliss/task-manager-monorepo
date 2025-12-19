import { UserPayload } from "@/common/types/express";
import jwt from "jsonwebtoken";

export const generateToken = (
  user: UserPayload,
  secret: string,
  expiresIn?: string
) => {
  return jwt.sign({ id: user.id, username: user.username }, secret, {
    expiresIn: expiresIn as "7d",
  });
};

export const validateToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};
