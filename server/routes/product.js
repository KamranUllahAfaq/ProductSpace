import express from "express";
import { verifyToken } from "../middleware/auth.js";
import multer from "multer";

import {
  getAllProducts,
  getAmbassadorProducts,
  getProductsByTopic,
  getProduct,
  deleteProduct,
  updateProduct,
  getMyProducts,
  addProduct,
  likeProduct,
  commentProduct,
  getAllComments,
  getMyAmbassadors,
  getAllNewProducts,
} from "../controllers/product.js";
const router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads");
  },
  filename: function (req, file, callback) {
    if (file.originalname.length > 6)
      callback(
        null,
        file.fieldname +
          "-" +
          Date.now() +
          file.originalname.substr(
            file.originalname.length - 6,
            file.originalname.length
          )
      );
    else callback(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

const cpUpload = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "gallery" },
]);

router.get("/:id", verifyToken, getProduct);
router.get("/", getAllProducts);

router.get("/newproducts/new", getAllNewProducts);
router.get("/ambassador/products", getAmbassadorProducts);
router.get("/topic/:id", getProductsByTopic);
router.get("/myproducts/:id", verifyToken, getMyProducts);
router.get("/myambassadors/:id", verifyToken, getMyAmbassadors);

router.put("/upvote/:id", likeProduct);
router.post("/", verifyToken, cpUpload, addProduct);
router.patch("/:id", verifyToken, cpUpload, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);

router.get("/comments/:id", getAllComments);
router.post("/comments/:id", verifyToken, commentProduct);

export default router;
