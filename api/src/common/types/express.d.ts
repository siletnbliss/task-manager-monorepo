import { JwtPayload } from "jsonwebtoken";

// 1. Define what your User payload looks like (matches your JWT structure)
export interface UserPayload extends JwtPayload {
  id: number;
  username: string;
}

// 2. Extend the Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload; // Use '?' because public routes won't have a user
    }
  }
}
