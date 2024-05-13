import express from "express";
import { verifyToken } from "../middleware/auth.js";
import multer from "multer";

import {
  addEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
  getMyEvents,
  goingInEvent,
  interestedInEvent,
} from "../controllers/event.js";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

router.get("/:id", verifyToken, getEvent);
router.get("/", getAllEvents);
router.post("/", verifyToken, upload.single("thumbnail"), addEvent);
router.put("/going/:id", verifyToken, goingInEvent);
router.put("/interested/:id", verifyToken, interestedInEvent);
router.get("/myevents/:id", verifyToken, getMyEvents);
router.delete("/:id", verifyToken, deleteEvent);

export default router;
