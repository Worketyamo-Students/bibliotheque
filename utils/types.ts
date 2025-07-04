import { Request as Requested } from "express";

export interface Request extends Requested {
  user_id: string;
}
