var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from "../generated/prisma";
import bcrypt from "bcrypt";
import { userValidator } from "../utils/validate.entries.ts";
import { signToken, signRefreshToken } from "../utils/token-gen.ts";
const prisma = new PrismaClient();
const UserController = {
    signup: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, password } = req.body;
            const { error } = userValidator.validate({
                name,
                email,
                password,
            });
            if (error) {
                res.status(401).json({ msg: error.message });
            }
            else {
                const encryptedPassword = yield bcrypt.hash(password, 10);
                const user = yield prisma.user.findUnique({
                    where: {
                        email,
                    },
                });
                if (user) {
                    res.status(403).json({ msg: "user already exist" });
                }
                else {
                    const saveduser = yield prisma.user.create({
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
        }
        catch (err) {
            res.status(500).json({ msg: "server error, try again later" });
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(401).json({ msg: "veuillez remplir tout les champs" });
        }
        const user = yield prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (user) {
            const compare = yield bcrypt.compare(password, user.password);
            if (compare) {
                const token = yield signToken(user.email);
                const refresh_token = yield signRefreshToken(user.email);
                console.log(token);
                res.cookie("cookie-wyx", refresh_token);
                res.status(200).json({
                    msg: {
                        access_token: token,
                    },
                });
            }
            else {
                res.status(401).json({ msg: `Mot de passe incorrect` });
            }
        }
        else {
            res.status(401).json({ msg: `L'utilisateur n'existe pas` });
        }
    }),
    updateProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, name } = req.body;
            const { id } = req.params;
            if (!id)
                res.status(401).json({ msg: "ID not provided" });
            const updateUser = yield prisma.user.update({
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
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ msg: "server error, try again later" });
        }
    }),
    profile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            req.ip;
            const users = yield prisma.user.findMany();
            if (users) {
                res.status(200).json({
                    msg: "users found successfully",
                    data: users,
                });
            }
            else {
                res.status(404).json({
                    msg: "no users",
                });
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ msg: "server error, try again later" });
        }
    }),
    deleteProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params || "";
            if (id) {
                const deletedUser = yield prisma.user.delete({
                    where: {
                        id,
                    },
                });
                if (deletedUser) {
                    res.status(201).json({
                        msg: "user deleted successfully",
                    });
                }
                else {
                    res.status(403).json({ msg: "user not found" });
                }
            }
            else {
                res.status(401).json({
                    msg: "you must provide id ",
                });
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ msg: "server error, try again later" });
        }
    }),
    getProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params || "";
            if (id) {
                const users = yield prisma.user.findUnique({
                    where: {
                        id,
                    },
                });
                if (users) {
                    res.status(200).json({
                        msg: "users found successfully",
                        data: users,
                    });
                }
                else {
                    res.status(404).json({
                        msg: "no users",
                    });
                }
            }
            else {
                res.status(401).json({
                    msg: "you must provide id ",
                });
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ msg: "server error, try again later" });
        }
    }),
};
export default UserController;
