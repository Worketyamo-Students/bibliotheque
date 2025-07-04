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

  createLoan: async (req: Request, res: Response) => {
    try {
      const { loan, userId, back }: LoanType = req.body;
      if (!loan || !userId || !back) {
        res.status(401).json({ msg: "Missing Field" });
      }
      const Loan = await prisma.loan.create({
        data: {
          loan,
          userId,
          back,
        },
      });
      if (Loan)
        res.status(201).json({ msg: "Book created Successfully", data: loan });
      else res.status(400).json({ msg: "Bad request" });
    } catch (err) {
      console.error(err);
    }
  },

  updateLoan: async (req: Request, res: Response) => {
    try {
      const { loan, userId, back }: LoanType = req.body;
      const { LoanId } = req.params;
      const Loan = await prisma.loan.update({
        where: {
          id: LoanId,
        },
        data: {
          loan,
          userId,
          back,
        },
      });
      if (Loan)
        res.status(201).json({ msg: "Book updated Successfully", data: loan });
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
