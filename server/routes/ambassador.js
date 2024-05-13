import express from "express";
import multer from "multer";
import {
  getAllApplicant,
  addApplicant,
  getApplicant,
  selectApplicant,
  getAmbassadorsProducts,
  deleteApplication,
  selectCandidateMail,
} from "../controllers/ambassador.js";
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

router.get("/:id", verifyToken, getApplicant);
router.post("/", verifyToken, upload.single("cv"), addApplicant);
router.get("/applicants/:id", verifyToken, getAllApplicant);
router.put(
  "/add/:id",
  verifyToken,
  selectApplicant,
  selectCandidateMail,
  deleteApplication
);
router.get("/myproducts/:id", verifyToken, getAmbassadorsProducts);
router.put("/select/:id", selectCandidateMail);

export default router;
