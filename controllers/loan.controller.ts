
import { Request } from "utils/types.ts";
import { Response } from "express";
import prisma from "../utils/prisma.db";
import { Loan as LoanType } from "../generated/prisma";

const Loan = {
  getLoan: async (req: Request, res: Response) => {
    try {
      req;
      const loan = await prisma.loan.findMany();
      if (loan) res.status(200).json({ msg: "Loan found", data: loan });
      else res.status(404).json({ msg: "loan not found" });
    } catch (err) {
      console.error(err);
    }
  },

  getOneLoan: async (req: Request, res: Response) => {
    try {
      const { LoanId } = req.params;
      const loan = await prisma.loan.findUnique({
        where: {
          id: LoanId,
        },
      });
      if (loan) res.status(200).json({ msg: "Loan found", data: loan });
      else res.status(404).json({ msg: "loan not found" });
    } catch (err) {
      console.error(err);
    }
  },

  createLoan: async (req: Request, res: Response  ) => {
    const {userId , booksId , back }: LoanType = req.body
      if (!userId || !booksId || !back) {
         res.status(400).json({ msg: "veuillez remplir tout les champs" })
      } else {
            try {
                const findbook = await prisma.books.findUnique({
                    where : { id: booksId }
                })
                if(findbook?.etat !== "disponible"){
                    res.status(400).json({ msg: "le livre n'est pas disponible pour l'emprunt" })
                }
                else{
                    const emprunts = await prisma.loan.create({
                        data: {
                            userId,
                            booksId,
                            back
                        }
                    })
                    await prisma.books.update({
                        where: { id: booksId },
                        data: {
                            etat: "emprunte"
                        } // Assuming you have an isAvailable field to mark the book as loaned out
                    })

                    console.log(emprunts)
                    res.status(201).json({
                    msg: "emprunt cree et ajoute avec succes",
                    })

                }
            } catch (error) {
               
                res.status(500).json({ msg: "Internal server error" })
            }
      }

  },

  updateLoan: async (req: Request, res: Response) => {
    try {
      const { userId, back, booksId }: LoanType = req.body;
      const { LoanId } = req.params;
      const Loan = await prisma.loan.update({
        where: {
          id: LoanId,
        },
        data: {
          booksId,
          userId,
          back,
        },
      });
      if (Loan)
        res.status(201).json({ msg: "Book updated Successfully", data: Loan });
      else res.status(404).json({ msg: "loan not found" });
    } catch (err) {
      console.error(err);
    }
  },

  deleteLoan: async (req: Request, res: Response) => {
    try {
      const { LoanId } = req.params;
      const loan = await prisma.loan.delete({
        where: {
          id: LoanId,
        },
      });
      if (loan)
        res.status(201).json({ msg: "Book Deleted Successfully", data: loan });
      else res.status(404).json({ msg: "loan not found" });
    } catch (err) {
      console.error(err);
    }
  },
};

export default Loan;
