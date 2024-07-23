import express from "express";
import * as brandController from "./controller/brand.controller.js";
import { validation } from "../../utils/middleware/validation.js";
import { addBrandSchema, deleteBrandSchema, getBrandByIdSchema, updateBrandSchema } from "./brand.validator.js";
import { uploadSingleFile } from "../../utils/middleware/fileUpload.js";
const brandRouter = express.Router();

brandRouter
  .route("/")
  .get(brandController.getAllBrand)
  .post(uploadSingleFile('brand','logo'),validation(addBrandSchema),brandController.addBrand);
  brandRouter
  .route("/:_id")
  .get(validation(getBrandByIdSchema),brandController.getBrandById)
  .put(uploadSingleFile('brand','logo'),validation(updateBrandSchema),brandController.updateBrand)
  .delete(validation(deleteBrandSchema),brandController.deleteBrand);
export default brandRouter;
