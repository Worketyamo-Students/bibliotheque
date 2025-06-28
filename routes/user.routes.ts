import { Router } from "express";

const user = Router();

user.post("/signup", () => {});
user.post("/login", () => {});
user.post("/logout", () => {});
user.get("/profile", () => {});
user.put("/profile", () => {});
user.delete("/profile", () => {});

export default user;
