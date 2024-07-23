import slugify from "slugify";
import AppError from "../../../utils/services/AppError.js";
import catchAsyncError from "../../../utils/middleware/catchAsyncError.js";
import brandModel from "../../../../DB/models/brand.model.js";
import deleteOne from "../../../utils/middleware/handler/refactor.handler.js";
import ApiFeatures from "../../../utils/ApiFeatures.js";
import fs from 'fs';

export const addBrand = catchAsyncError(async (req, res, next) => {
 req.body.slug = slugify(req.body.name);
 req.body.logo = req.file.filename
  let category = new brandModel(req.body);
  let add = await category.save();
  res.status(201).json({ messsage: "added", add });
});

export const getAllBrand = catchAsyncError(async (req, res, next) => {
  let apiFeature = new ApiFeatures(brandModel.find(),req.query).pagination().filter().sort().search().fields();
  let brand = await apiFeature.mongooseQuery;
  res.json({ messsage: "done", brand });
});

export const getBrandById = catchAsyncError(async (req, res, next) => {
  let { _id } = req.params;
  let category = await brandModel.findById(_id);
  res.json({ messsage: "done", category });
});

export const updateBrand = catchAsyncError(async (req, res, next) => {
  let { _id } = req.params;
  req.body.slug = slugify(req.body.name);
  
  if (req.file) {
    // Delete the old image first
    const brand = await brandModel.findById(_id);
    if (brand && brand.logo) {
      const oldImagePath = `uploads/brands/${brand.logo}`;
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error('Error deleting old image:', err);
        }
      });
    }
    req.body.logo = req.file.filename;
  }
  
  let category = await brandModel.findByIdAndUpdate(_id, req.body, { new: true });
  !category && next(new AppError("not found category", 404));
  category && res.json({ message: "done", category });
});

export const deleteBrand = deleteOne(brandModel);
