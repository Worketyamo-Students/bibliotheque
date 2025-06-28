import { Router } from "express";
import UserController from "../controllers/user.controllers.ts";
const user = Router();

user.post("/signup", UserController.signup);
user.post("/login", UserController.login);
// user.post("/logout", () => {});
// user.get("/profile", () => {});
// user.put("/profile", () => {});
// user.delete("/profile", () => {});

export default user;
