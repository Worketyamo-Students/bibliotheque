// import { PrismaClient, User } from "../generated/prisma";

import { NextFunction, Request, Response } from "express";
// import bcrypt from "bcrypt";
// import { userValidator } from "../utils/validate.entries.ts";
import { decodeToken } from "../utils/token-gen.ts";
// const prisma = new PrismaClient();

const validationMiddleware = {
  validateUser: async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization?.split("")[1];
    console.log(authorization);
    if (!authorization) {
      res.status(403).json({
        msg: "The user is not authorise to perform that action",
      });
    } else {
      const token = await decodeToken(authorization);
      next();
    }
  },
};

export default validationMiddleware;
