import express from "express";
import { configDotenv } from "dotenv";
import morgan from "morgan";
import user from "routes/user.routes";
configDotenv();
const app = express();
const port = process.env.PORT;

app.use("/users", user);
app.use(morgan("combined"));
app.listen(port, () => {
  console.log("le serveur tourne sur http://localhost:" + port);
});
