import express from "express";
import { verifyToken } from "../middleware/auth.js";
import multer from "multer";
import {
  addStory,
  getAllStories,
  getStory,
  getMyStories,
  deleteStory,
} from "../controllers/story.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});

const upload = multer({ storage: storage });

router.get("/:id", verifyToken, getStory);
router.get("/mystories/:id", verifyToken, getMyStories);

router.get("/", getAllStories);
router.post("/", verifyToken, upload.single("thumbnail"), addStory);
router.delete("/:id", verifyToken, deleteStory);

export default router;
