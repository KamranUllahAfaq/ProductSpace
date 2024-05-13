import express from "express";
import { verifyToken } from "../middleware/auth.js";

import {
  getAllCollections,
  getCollection,
  addCollection,
  updateCollection,
  getUserCollections,
} from "../controllers/collection.js";
const router = express.Router();

router.get("/:id", getCollection);
router.get("/user/:id", getUserCollections);
router.get("/", getAllCollections);
router.post("/", verifyToken, addCollection);
router.put("/:id", verifyToken, updateCollection);
export default router;
