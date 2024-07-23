import AppError from "../../utils/services/AppError.js";
import catchAsyncError from "../../utils/middleware/catchAsyncError.js";
import deleteOne from "../../utils/middleware/handler/refactor.handler.js";
import userModel from "../../../DB/models/user.model.js";

export const addAdress =
  catchAsyncError(
  async (req, res, next) => {
    let { city, street, phone } = req.body;
    let result = await userModel.findOneAndUpdate(
       {_id:req.user._id} ,
      { 
        $addToSet: { Adress:{
          city:city,
          street:street,
          phone:phone,
        }}
      },
      {
        new: true,
      }
    );
    !result && next(new AppError("not found review", 404));
    result && res.json({ message: "done", result });
  }
);

export const removeAdress =
  catchAsyncError(
  async (req, res, next) => {

    let wish = await userModel.findOneAndUpdate(
       {_id:req.user._id} ,
      { 
        $pull: { Adress:{} }, 
      },
      {
        new: true,
      }
    );
    !wish && next(new AppError("not found review", 404));
    wish && res.json({ message: "done", wish });
  }
);

export const getAllAdresses =
  catchAsyncError(
  async (req, res, next) => {

    let result = await userModel.findById( req.user._id );
    !result && next(new AppError("not found review", 404));
    result && res.json({ message: "done", result:result.Adress});
  }
);
