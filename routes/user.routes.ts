import { Router } from "express";
import UserController from "../controllers/user.controllers.ts";
import validationMiddleware from "../middleware/validate.ts";
const user = Router();

user.post("/signup", UserController.signup);
user.post("/login", UserController.login);
// user.post("/logout", () => {});
user.get("/profile", validationMiddleware.validateUser, UserController.profile);
user.put("/profile/:id", UserController.updateProfile);
user.delete("/profile/:id", UserController.deleteProfile);

export default user;
