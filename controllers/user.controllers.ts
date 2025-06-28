import { PrismaClient } from "generated/prisma";
import { User } from "generated/prisma";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const UserController = {
  signup: async (req: Request, res: Response) => {
    try {
      const { name, email, password }: User = req.body;
      if (!name || !email || !password) {
        res.status(400).json({ msg: "veuillez remplir tout les champs" });
      } else {
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (user) {
          res.status(403).json({ msg: "user already exist" });
        }
        const saveduser = await prisma.user.create({
          data: {
            email,
            name,
            password: encryptedPassword,
          },
        });
        if (saveduser)
          res.status(201).json({
            msg: "le user a ete cree avec succes",
          });
      }
    } catch (err) {
      throw err;
    }
  },
  login: async (req: Request, res: Response) => {
    const { email, password }: User = req.body;
    if (!email || !password) {
      res.status(401).json({ msg: "veuillez remplir tout les champs" });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
     const compare =  await bcrypt.compare(password, user.password);
     if (compare)
    }
  },
  logout: async (req: Request, res: Response) => {},
  profile: async (req: Request, res: Response) => {},
  getProfile: async (req: Request, res: Response) => {},
  deleteProfile: async (req: Request, res: Response) => {},
  updateProfile: async (req: Request, res: Response) => {},
};

export default UserController;
