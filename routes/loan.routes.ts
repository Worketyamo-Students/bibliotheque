import { Router } from "express";
import LoanController from "../controllers/loan.controller.ts";
import validationMiddleware from "../middleware/validate.ts";
const loan = Router();

loan.get("/loans", validationMiddleware.validateUser, LoanController.getLoan);
loan.get(
  "/loan/:LoanId",
  validationMiddleware.validateUser,
  LoanController.getOneLoan,
);
loan.put(
  "/update/:LoanId",
  validationMiddleware.validateUser,
  LoanController.updateLoan,
);
loan.delete(
  "/delete/:LoanId",
  validationMiddleware.validateUser,
  LoanController.deleteLoan,
);
loan.post(
  "/loan",
  validationMiddleware.validateUser,
  LoanController.createLoan,
);

export default loan;
