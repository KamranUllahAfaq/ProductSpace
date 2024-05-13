import express from "express";
import { verifyToken } from "../middleware/auth.js";

import {
  addDiscussion,
  getAllDiscussions,
  getDiscussion,
  likeDiscussion,
  getAllComments,
  commentDiscussion,
} from "../controllers/discussion.js";
const router = express.Router();

router.get("/:id", verifyToken, getDiscussion);
router.get("/", getAllDiscussions);
router.put("/upvote/:id", verifyToken, likeDiscussion);
router.post("/", verifyToken, addDiscussion);
router.get("/comments/:id", verifyToken, getAllComments);
router.post("/comments/:id", verifyToken, commentDiscussion);
export default router;
