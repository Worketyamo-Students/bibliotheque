import { Router } from "express";
import BookController from "../controllers/books.controller.ts";
import validationMiddleware from "../middleware/validate.ts";
const book = Router();

book.get("/books", validationMiddleware.validateUser, BookController.getBooks);
book.get(
  "/book/:BookId",
  validationMiddleware.validateUser,
  BookController.getOneBooks,
);
book.put(
  "/update/:BookId",
  validationMiddleware.validateUser,
  BookController.updateBooks,
);
book.delete(
  "/delete/:BookId",
  validationMiddleware.validateUser,
  BookController.deleteBooks,
);
book.post(
  "/book",
  validationMiddleware.validateUser,
  BookController.createBooks,
);

export default book;
