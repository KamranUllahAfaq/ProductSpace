import express from "express";
import multer from "multer";
import {
  addCandidate,
  getCandidate,
  getAllJobCandidates,
  selectCandidate,
  rejectCandidate,
} from "../controllers/candidate.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".pdf");
  },
});

const upload = multer({ storage: storage });

router.get("/:id", verifyToken, getCandidate);
router.post("/", verifyToken, upload.single("cv"), addCandidate);
router.get("/job/:id", verifyToken, getAllJobCandidates);
router.put("/accept/:id", verifyToken, selectCandidate);
router.put("/reject/:id", verifyToken, rejectCandidate);

export default router;
