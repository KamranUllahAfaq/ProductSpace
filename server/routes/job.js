import express from "express";
import multer from "multer";
import {
  getAllJobs,
  addJob,
  getJob,
  getMyJobs,
  updateJob,
} from "../controllers/job.js";
import { verifyToken } from "../middleware/auth.js";

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

router.get("/:id", verifyToken, getJob);
router.post("/", verifyToken, upload.single("image"), addJob);
router.put("/:id", verifyToken, upload.single("image"), updateJob);

router.get("/", getAllJobs);
router.get("/myjobs/:id", verifyToken, getMyJobs);

export default router;
