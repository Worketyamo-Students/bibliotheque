import { NextFunction, Request, Response } from "express";

import { verifyToken } from "../utils/token-gen.ts";

interface RequesUser extends Request {
  user_id: string;
}

const validationMiddleware = {
  validateUser: async (req: RequesUser, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization?.split(" ")[0];
    console.log(authorization);
    try {
      if (!authorization) {
        res.status(403).json({
          msg: "The user is not authorise to perform that action",
        });
      } else {
        const token = await verifyToken(authorization);
        req.user_id = token.data.id;
        next();
      }
    } catch (err) {
      res.status(403).json({ msg: "token invalid" });
    }
  },
};

export default validationMiddleware;
