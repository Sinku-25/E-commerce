import slugify from "slugify";
import AppError from "../../../utils/services/AppError.js";
import catchAsyncError from "../../../utils/middleware/catchAsyncError.js";
import subCategoryModel from "../../../../DB/models/subcategory.model.js";
import deleteOne from "../../../utils/middleware/handler/refactor.handler.js";
import ApiFeatures from "../../../utils/ApiFeatures.js";

export const createSubCategory = catchAsyncError(async (req, res, next) => {
  let { name, categoryId } = req.body;
  let subCategory = new subCategoryModel({
    name,
    slug: slugify(name),
    category: categoryId,
  });
  let add = await subCategory.save();
  res.status(201).json({ messsage: "added", add });
});

export const getAllSubCategories = catchAsyncError(async (req, res, next) => {
  let filter = {};
  if (req.parames && req.parames._id) {
    filter = {
      category: req.params._id,
    };
  }
  let apiFeature = new ApiFeatures(subCategoryModel.find(),req.query).pagination().filter().sort().search().fields();
  let subCategory = await apiFeature.mongooseQuery;
  res.json({ messsage: "done",page:apiFeature.page ,subCategory });
});

export const getSubCategoryById = catchAsyncError(async (req, res, next) => {
  let { _id } = req.params;
  let subCategory = await subCategoryModel.findById(_id);
  res.json({ messsage: "done", subCategory });
});
export const updateSubCategory = catchAsyncError(async (req, res, next) => {
  let { _id } = req.params;
  let { name, categoryId } = req.body;
  let subCategory = await subCategoryModel.findByIdAndUpdate(
    _id,
    { name, slug: slugify(name), category: categoryId },
    { new: true }
  );

  !subCategory && next(new AppError("not found subCategory", 404));
  subCategory && res.json({ messsage: "updated", subCategory });
});
export const deleteSubCategory = deleteOne(subCategoryModel);
