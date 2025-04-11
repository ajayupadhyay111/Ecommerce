import express from "express";
import {
  newProduct,
  getLatestProducts,
  getAllCategories,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  searchedProducts
} from "../controllers/product.js";
import { singleUpload } from "../middleware/multer.js";
import { adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", adminOnly, singleUpload, newProduct);
router.get("/latest", getLatestProducts);
router.get("/category", getAllCategories);
router.get("/admin-products", getAllProducts);
router.get("/all",searchedProducts)
router.get("/:id", getSingleProduct);
router.delete("/:id", adminOnly,deleteProduct);
router.put("/:id",adminOnly,singleUpload, updateProduct);
export default router;
