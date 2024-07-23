import AppError from "../../../utils/services/AppError.js";
import catchAsyncError from "../../../utils/middleware/catchAsyncError.js";
import deleteOne from "../../../utils/middleware/handler/refactor.handler.js";
import ApiFeatures from "../../../utils/ApiFeatures.js";
import userModel from "../../../../DB/models/user.model.js";

export const addUser = catchAsyncError(async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (user) return next(new AppError("duplicated email", 409));
  let results = new userModel(req.body);
  let add = await results.save();
  res.status(201).json({ messsage: "added", add });
});

export const getAllUsers = catchAsyncError(async (req, res, next) => {
  let apiFeature = new ApiFeatures(userModel.find(), req.query)
    .pagination()
    .filter()
    .sort()
    .search()
    .fields();
  let user = await apiFeature.mongooseQuery;
  res.json({ messsage: "done", user });
});

export const getUserById = catchAsyncError(async (req, res, next) => {
  let { _id } = req.params;
  let user = await userModel.findById(_id);
  res.json({ messsage: "done", user });
});

export const updateUser = catchAsyncError(async (req, res, next) => {
  let { _id } = req.params;
  let user = await userModel.findByIdAndUpdate(_id, req.body, { new: true });
  !user && next(new AppError("not found user", 404));
  user && res.json({ message: "done", user });
});

export const deleteUser = deleteOne(userModel);

export const changePassword = catchAsyncError(async (req, res, next) => {
  let { _id } = req.params;
  req.body.changePasswordAt = Date.now();
  let user = await userModel.findByIdAndUpdate(_id, req.body, { new: true });
  !user && next(new AppError("not found user", 404));
  user && res.json({ message: "done", user });
});
