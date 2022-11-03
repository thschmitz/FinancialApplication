import express from "express";
import { addParcela, getParcelas } from "../controllers/parcelas.js";
import { addTransaction, deleteTransaction, getTransaction, updateTransaction } from "../controllers/transaction.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.get("/getParcelas", verifyToken, getParcelas);

router.get("/getTransaction", verifyToken, getTransaction);

router.post("/addParcela", verifyToken, addParcela);

router.post("/addTransaction", verifyToken, addTransaction);

router.put("/updateTransaction", verifyToken, updateTransaction);

router.delete("/deleteTransaction", verifyToken, deleteTransaction);




export default router;