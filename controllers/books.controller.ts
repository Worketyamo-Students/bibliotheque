import { Request } from "utils/types.ts";
import { Response } from "express";
import prisma from "../utils/prisma.db";
import { Books as Book } from "../generated/prisma";
const Books = {
  getBooks: async (req: Request, res: Response) => {
    try {
      req;
      const books = await prisma.books.findMany();
      if (books) res.status(200).json({ msg: "Books found", data: books });
      else res.status(404).json({ msg: "books not found" });
    } catch (err) {
      console.error(err);
    }
  },

  getOneBooks: async (req: Request, res: Response) => {
    try {
      const { bookId } = req.params;
      const books = await prisma.books.findUnique({
        where: {
          id: bookId,
        },
      });
      if (books) res.status(200).json({ msg: "Books found", data: books });
      else res.status(404).json({ msg: "books not found" });
    } catch (err) {
      console.error(err);
    }
  },

  createBooks: async (req: Request, res: Response) => {
    try {
      const { title, author, description, year, isbn }: Book = req.body;
      if (!title || !author || !description || !year || !isbn) {
        res.status(401).json({ msg: "Missing Field" });
      }
      const books = await prisma.books.create({
        data: {
          title,
          author,
          description,
          year,
          isbn,
        },
      });
      if (books)
        res.status(201).json({ msg: "Book created Successfully", data: books });
      else res.status(400).json({ msg: "Bad request" });
    } catch (err) {
      console.error(err);
    }
  },

  updateBooks: async (req: Request, res: Response) => {
    try {
      const { title, author, description, year, isbn }: Book = req.body;
      const { bookId } = req.params;
      const books = await prisma.books.update({
        where: {
          id: bookId,
        },
        data: {
          title,
          author,
          description,
          year,
          isbn,
        },
      });
      if (books)
        res.status(201).json({ msg: "Book updated Successfully", data: books });
      else res.status(404).json({ msg: "books not found" });
    } catch (err) {
      console.error(err);
    }
  },

  deleteBooks: async (req: Request, res: Response) => {
    try {
      const { bookId } = req.params;
      const books = await prisma.books.delete({
        where: {
          id: bookId,
        },
      });
      if (books)
        res.status(201).json({ msg: "Book Deleted Successfully", data: books });
      else res.status(404).json({ msg: "books not found" });
    } catch (err) {
      console.error(err);
    }
  },
};

export default Books;
