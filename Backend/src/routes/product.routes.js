import express from "express";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import {
  createProduct,
  getAllProducts,
  getSellerProducts,
} from "../controllers/product.controller.js";
import multer from "multer";
import { createProductValidator } from "../validator/product.validator.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB
  },
});

const router = express.Router();

/**
@route POST /api/products
@description create a new prodcut
Waccess Private(Seller Only)  
**/
router.post(
  "/",
  authenticateSeller,
  upload.array("images", 7),
  createProductValidator,
  createProduct,
);

/**
 * @route GET /api/products/seller
 * @description Get all products of the authencatted seller
 * @access Private (seller only)
 * **/
router.get("/seller", authenticateSeller, getSellerProducts);

/**
 * @Route GET /api/products
 * @description Get all products
 * @access Public
 */
router.get("/", getAllProducts)

export default router;
