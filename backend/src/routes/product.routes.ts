import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  bulkCreateProducts,
  getProductsByCategoryName,
  
  getGroupedProducts,
  getProductSuggestions
} from "../coontrollers/product.controller";

const router = express.Router();

router.post("/", createProduct); // Create product
router.get("/", getAllProducts); // Get all products
//@ts-ignore
router.get("/:id", getProductById); // Get product by ID
//@ts-ignore
router.put("/:id", updateProduct); // Update product
//@ts-ignore
router.delete("/:id", deleteProduct); // Delete product
//@ts-ignore
router.post("/bulk", bulkCreateProducts); // Bulk insert products

//@ts-ignore
router.get('/category/:categoryName', getProductsByCategoryName);

//@ts-ignore
router.get('/group/grouped', getGroupedProducts);

//@ts-ignore
router.get("/:id/suggestions", getProductSuggestions);

export default router;