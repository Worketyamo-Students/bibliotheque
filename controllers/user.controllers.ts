import { PrismaClient } from "../generated/prisma";
// import { User } from "../generated/prisma";
import { Request, Response } from "express";
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
      throw err;
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
        const token = await signToken(user.email);
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
  // logout: async (req: Request, res: Response) => {},
  // profile: async (req: Request, res: Response) => {},
  // getProfile: async (req: Request, res: Response) => {},
  // deleteProfile: async (req: Request, res: Response) => {},
  // updateProfile: async (req: Request, res: Response) => {},
};

export default UserController;
