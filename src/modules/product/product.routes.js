import express from "express";
import * as productController from "./controller/product.controller.js";
import {
  deleteProductSchema,
  getProductByIdSchema,
  updateProductSchema,
} from "./product.validator.js";
import { validation } from "../../utils/middleware/validation.js";
import { uploadMixFiles } from "../../utils/middleware/fileUpload.js";
import { protectRoutes } from "../auth/auth.controller.js";
const productRouter = express.Router();

productRouter
  .route("/")
  .get(productController.getAllProduct)
  .post(
    protectRoutes,
    uploadMixFiles('product', [
      { name: "imageCover", maxCount: 1 },
      { name: "images", maxCount: 6 },
    ]),
    productController.addProduct
  );
productRouter
  .route("/:_id")
  .get(validation(getProductByIdSchema), productController.getProductById)
  .put(validation(updateProductSchema), productController.updateProduct)
  .delete(validation(deleteProductSchema), productController.deleteProduct);
export default productRouter;
