import express from "express";
import multer from "multer";
import {
  getProductStats,
  getAmbassadorStats,
  fetchEventStats,
} from "../controllers/tools.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/product/:id", verifyToken, getProductStats);
router.get("/ambassador/:id", verifyToken, getAmbassadorStats);
router.get("/event/:id", fetchEventStats);

export default router;
