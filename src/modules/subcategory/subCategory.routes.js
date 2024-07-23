import express from "express";
import * as subCategoryController from "./controller/subCategory.controller.js";
import { validation } from "../../utils/middleware/validation.js";
import { createSubCategorySchema, deleteSubCategorySchema, getSubCategoryByIdSchema, updateSubCategorySchema } from "./subCategory.validator.js";
const SubCategoryRouter = express.Router({mergeParams:true});

SubCategoryRouter
  .route("/")
  .get(subCategoryController.getAllSubCategories)
  .post(validation(createSubCategorySchema),subCategoryController.createSubCategory);
  SubCategoryRouter
  .route("/:_id")
  .get(validation(getSubCategoryByIdSchema),subCategoryController.getSubCategoryById)
  .put(validation(updateSubCategorySchema),subCategoryController.updateSubCategory)
  .delete(validation(deleteSubCategorySchema),subCategoryController.deleteSubCategory);

  export default SubCategoryRouter;