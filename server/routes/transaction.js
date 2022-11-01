import express from "express";
import { addTransaction, deleteTransaction, getTransaction, updateTransaction } from "../controllers/transaction.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/addTransaction", verifyToken, addTransaction);

router.put("/updateTransaction", verifyToken, updateTransaction);

router.delete("/deleteTransaction", verifyToken, deleteTransaction);

router.get("/getTransaction", verifyToken, getTransaction);

export default router;