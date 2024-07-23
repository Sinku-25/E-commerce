import slugify from "slugify";
import AppError from "../../../utils/services/AppError.js";
import catchAsyncError from "../../../utils/middleware/catchAsyncError.js";
import deleteOne from "../../../utils/middleware/handler/refactor.handler.js";
import productModel from "../../../../DB/models/product.model.js";
import ApiFeatures from "../../../utils/ApiFeatures.js";

export const addProduct = catchAsyncError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  req.body.imageCover = req.files.imageCover[0].filename;
  req.body.images = req.files.images.map(ele => ele.filename);
  let product = new productModel(req.body);
  await product.save();
  res.json({ message: "added", product });
});

export const getAllProduct = catchAsyncError(async (req, res, next) => {
  let apiFeature = new ApiFeatures(productModel.find(), req.query)
    .pagination()
    .filter()
    .sort()
    .search()
    .fields();
  let product = await apiFeature.mongooseQuery;
  res.json({ messsage: "done", page: apiFeature.page, product });
});

export const getProductById = catchAsyncError(async (req, res, next) => {
  let { _id } = req.params;
  let product = await productModel.findById(_id);
  res.json({ messsage: "done", product });
});
export const updateProduct = catchAsyncError(async (req, res, next) => {
  let { _id } = req.params;
  let { title } = req.body;
  if (req.body.title) {
    req.body.slug = slugify(title);
  }
  let product = await productModel.findByIdAndUpdate(
    _id,
    { ...req.body },
    { new: true }
  );

  !product && next(new AppError("not found product", 404));
  product && res.json({ messsage: "done", product });
});

export const deleteProduct = deleteOne(productModel);
