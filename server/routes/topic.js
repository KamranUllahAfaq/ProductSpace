import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { addTopic, getAllTopics } from "../controllers/topic.js";
const router = express.Router();

router.get("/", getAllTopics);
router.post("/", addTopic);

export default router;
