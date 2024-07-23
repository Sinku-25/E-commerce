import AppError from "../../utils/services/AppError.js";
import catchAsyncError from "../../utils/middleware/catchAsyncError.js";
import deleteOne from "../../utils/middleware/handler/refactor.handler.js";
import ApiFeatures from "../../utils/ApiFeatures.js";
import couponModel from "../../../DB/models/coupon.model.js";
import QRCode from 'qrcode';
export const addCoupon = catchAsyncError(async (req, res, next) => {
  let result = new couponModel(req.body);
  let add = await result.save();
  res.status(201).json({ messsage: "added", add });
});

export const getAllCoupon = catchAsyncError(async (req, res, next) => {
  let apiFeature = new ApiFeatures(couponModel.find(), req.query)
    .pagination()
    .filter()
    .sort()
    .search()
    .fields();
  let result = await apiFeature.mongooseQuery;
  res.json({ messsage: "done", result });
});

export const getCouponById = catchAsyncError(async (req, res, next) => {
  let { _id } = req.params;
  let result = await couponModel.findById(_id);
  let url =await QRCode.toDataURL(result.code);
  res.json({ messsage: "done", result, url });
});

export const updateCoupon = catchAsyncError(async (req, res, next) => {
  let { _id } = req.params;
  let result = await couponModel.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  !result && next(new AppError("not found result", 404));
  result && res.json({ message: "done", result });
});

export const deleteCoupon = deleteOne(couponModel);
