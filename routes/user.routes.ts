import { Router } from "express";
import UserController from "../controllers/user.controllers.ts";
import validationMiddleware from "../middleware/validate.ts";
const user = Router();

user.post("/signup", UserController.signup);
user.post("/login", UserController.login);
// user.post("/logout", () => {});
user.get("/profile", validationMiddleware.validateUser, UserController.profile);
user.put(
  "/profile",
  validationMiddleware.validateUser,
  UserController.updateProfile,
);
user.delete(
  "/profile",
  validationMiddleware.validateUser,
  UserController.deleteProfile,
);

export default user;
