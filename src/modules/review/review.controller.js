import AppError from "../../utils/services/AppError.js";
import catchAsyncError from "../../utils/middleware/catchAsyncError.js";
import deleteOne from "../../utils/middleware/handler/refactor.handler.js";
import ApiFeatures from "../../utils/ApiFeatures.js";
import reviewModel from "../../../DB/models/review.model.js";

export const addReview = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user._id
  let isReview = await reviewModel.findOne({user:req.user._Id,product:req.body.product});
  if (isReview) return next(new AppError("Already has review", 409));
  let review = new reviewModel(req.body);
  let add = await review.save();
  res.status(201).json({ messsage: "added", add });
});

export const getAllReview = catchAsyncError(async (req, res, next) => {
  let apiFeature = new ApiFeatures(reviewModel.find(), req.query)
    .pagination()
    .filter()
    .sort()
    .search()
    .fields();
  let review = await apiFeature.mongooseQuery;
  res.json({ messsage: "done", review });
});

export const getReviewById = catchAsyncError(async (req, res, next) => {
  let { _id } = req.params;
  let review = await reviewModel.findById(_id);
  res.json({ messsage: "done", review });
});

export const updateReview = catchAsyncError(async (req, res, next) => {
  let { _id } = req.params;
  let review = await reviewModel.findOneAndUpdate({_id,user:req.user._id}, req.body, {
    new: true,
  });
  !review && next(new AppError("not found review", 404));
  review && res.json({ message: "done", review });
});

export const deleteReview = deleteOne(reviewModel);
