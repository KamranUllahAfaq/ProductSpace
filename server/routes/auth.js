import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  login,
  changePassword,
  forgotPassword,
  googleLogin,
} from "../controllers/auth.js";
const router = express.Router();
router.post("/login", login);
router.put("/changePassword", verifyToken, changePassword);
router.put("/forgotPassword", forgotPassword);
router.post("/auth/google", googleLogin);

export default router;
