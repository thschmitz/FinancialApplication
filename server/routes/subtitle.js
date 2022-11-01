import express from "express";
import { addSubtitle, deleteSubtitle, getSubtitle, updateSubtitle } from "../controllers/subtitles.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/addSub", verifyToken, addSubtitle);

router.delete("/deleteSub", verifyToken, deleteSubtitle);

router.put("/updateSub", verifyToken, updateSubtitle);

router.get("/getSub", verifyToken, getSubtitle);

export default router;