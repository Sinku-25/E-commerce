import slugify from "slugify";
import categoryModel from "../../../../DB/models/category.model.js";
import AppError from "../../../utils/services/AppError.js";
import catchAsyncError from "../../../utils/middleware/catchAsyncError.js";
import deleteOne from "../../../utils/middleware/handler/refactor.handler.js";
import ApiFeatures from "../../../utils/ApiFeatures.js";

export const addCategory = catchAsyncError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  req.body.image = req.file.filename;
  let category = new categoryModel(req.body);
  let add = await category.save();
  res.status(201).json({ messsage: "added", add });
});

export const getAllCategories = catchAsyncError(async (req, res, next) => {
  let apiFeature = new ApiFeatures(categoryModel.find(), req.query)
    .pagination()
    .filter()
    .sort()
    .search()
    .fields();
  let category = await apiFeature.mongooseQuery;
  res.json({ messsage: "done", page: apiFeature.page, category });
});

export const getCategoryById = catchAsyncError(async (req, res, next) => {
  let { _id } = req.params;
  let category = await categoryModel.findById(_id);
  res.json({ messsage: "done", category });
});
export const updateCategory = catchAsyncError(async (req, res, next) => {
  let { _id } = req.params;
  let { name } = req.body;
  let category = await categoryModel.findByIdAndUpdate(
    _id,
    { name, slug: slugify(name) },
    { new: true }
  );

  !category && next(new AppError("not found category", 404));
  category && res.json({ messsage: "done", category });
});
export const deleteCategory = deleteOne(categoryModel);
