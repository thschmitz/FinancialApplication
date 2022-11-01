import express from "express";
import { addTransaction } from "../controllers/transaction.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/addTransaction", verifyToken, addTransaction);

export default router;