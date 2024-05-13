import express from "express";
import multer from "multer";
import {
  getUser,
  saveImage,
  updateUser,
  getAllUsers,
  followUser,
  getAllFollowedProducts,
  getAllFollowedUsers,
  getAllFollowers,
} from "../controllers/user.js";
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

router.get("/:id", getUser);
router.put("/update", verifyToken, updateUser);

router.post("/uploadImage", verifyToken, upload.single("image"), saveImage);
router.get("/", getAllUsers);
router.get("/follow/:id", verifyToken, followUser);
router.get("/followedProducts/:id", verifyToken, getAllFollowedProducts);
router.get("/following/:id", verifyToken, getAllFollowedUsers);
router.get("/followers/:id", verifyToken, getAllFollowers);

export default router;
