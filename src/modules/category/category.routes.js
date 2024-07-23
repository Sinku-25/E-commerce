import express from "express";
import * as categoryController from "./controller/category.controller.js";
import SubCategoryRouter from "../subcategory/subCategory.routes.js";
import { validation } from "../../utils/middleware/validation.js";
import {addCategorySchema, getCategoryByIdSchema, updateCategorySchema,} from "./category.validator.js";
import { uploadSingleFile } from "../../utils/middleware/fileUpload.js";
const categoryRouter = express.Router();
categoryRouter.use("/:_id/subcategory", SubCategoryRouter);

categoryRouter
  .route("/")
  .get(categoryController.getAllCategories)
  .post(uploadSingleFile('category','image'),validation(addCategorySchema), categoryController.addCategory);
categoryRouter
  .route("/:_id")
  .get(validation(getCategoryByIdSchema), categoryController.getCategoryById)
  .put(validation(updateCategorySchema), categoryController.updateCategory)
  .delete(categoryController.deleteCategory);
export default categoryRouter;
