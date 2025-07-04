import express from "express";
import { configDotenv } from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import user from "./routes/user.routes.ts";
import book from "./routes/books.routes.ts";
import loan from "./routes/loan.routes.ts";
configDotenv();
const app = express();
app.use(morgan("combined"));
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/users", user);
app.use("/books", book);
app.use("/loans", loan);

app.listen(port, () => {
  console.log("le serveur tourne sur http://localhost:" + port);
});
