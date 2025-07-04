import { PrismaClient, User } from "../generated/prisma";
import { Request } from "utils/types.ts";

import { Response } from "express";
import bcrypt from "bcrypt";
import { userValidator } from "../utils/validate.entries.ts";
import { signToken, signRefreshToken } from "../utils/token-gen.ts";
const prisma = new PrismaClient();

const UserController = {
  signup: async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      const { error } = userValidator.validate({
        name,
        email,
        password,
      });
      if (error) {
        res.status(401).json({ msg: error.message });
      } else {
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (user) {
          res.status(403).json({ msg: "user already exist" });
        } else {
          const saveduser = await prisma.user.create({
            data: {
              email,
              name,
              password: encryptedPassword,
            },
          });
          saveduser &&
            res.status(201).json({
              msg: "le user a ete cree avec succes",
            });
        }
      }
    } catch (err) {
      res.status(500).json({ msg: "server error, try again later" });
    }
  },
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(401).json({ msg: "veuillez remplir tout les champs" });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      const compare = await bcrypt.compare(password, user.password);
      if (compare) {
        const token = await signToken(user.id);
        const refresh_token = await signRefreshToken(user.email);
        console.log(token);
        res.cookie("cookie-wyx", refresh_token);
        res.status(200).json({
          msg: {
            access_token: token,
          },
        });
      } else {
        res.status(401).json({ msg: `Mot de passe incorrect` });
      }
    } else {
      res.status(401).json({ msg: `L'utilisateur n'existe pas` });
    }
  },

  updateProfile: async (req: Request, res: Response) => {
    try {
      const { email, name }: User = req.body;
      const id = req.user_id;
      if (!id) res.status(401).json({ msg: "ID not provided" });
      const updateUser = await prisma.user.update({
        where: {
          id,
        },
        data: {
          name,
          email,
        },
      });
      console.log(updateUser);
      res.status(201).json({ msg: "user update successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "server error, try again later" });
    }
  },
  // logout: async (req: Request, res: Response) => {},
  profile: async (req: Request, res: Response) => {
    try {
      req.ip;
      const users = await prisma.user.findMany();
      if (users) {
        res.status(200).json({
          msg: "users found successfully",
          data: users,
        });
      } else {
        res.status(404).json({
          msg: "no users",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "server error, try again later" });
    }
  },
  deleteProfile: async (req: Request, res: Response) => {
    try {
      const id = req.user_id;
      if (id) {
        const deletedUser = await prisma.user.delete({
          where: {
            id,
          },
        });
        if (deletedUser) {
          res.status(201).json({
            msg: "user deleted successfully",
          });
        } else {
          res.status(403).json({ msg: "user not found" });
        }
      } else {
        res.status(401).json({
          msg: "you must provide id ",
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "server error, try again later" });
    }
  },
  getProfile: async (req: Request, res: Response) => {
    try {
      const id = req.user_id;
      if (id) {
        const users = await prisma.user.findUnique({
          where: {
            id,
          },
        });

        if (users) {
          res.status(200).json({
            msg: "users found successfully",
            data: users,
          });
        } else {
          res.status(404).json({
            msg: "no users",
          });
        }
      } else {
        res.status(401).json({
          msg: "you must provide id ",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "server error, try again later" });
    }
  },
};

export default UserController;
