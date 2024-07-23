import AppError from "../../utils/services/AppError.js";
import catchAsyncError from "../../utils/middleware/catchAsyncError.js";
import deleteOne from "../../utils/middleware/handler/refactor.handler.js";
import userModel from "../../../DB/models/user.model.js";

export const addToWishList =
  catchAsyncError(
  async (req, res, next) => {
    let { product } = req.body;

    let wish = await userModel.findOneAndUpdate(
       req.user._id ,
      { 
        $addToSet: { wishList: product }, 
      },
      {
        new: true,
      }
    );
    !wish && next(new AppError("not found review", 404));
    wish && res.json({ message: "done", wish });
  }
);

export const removeFromWishList =
  catchAsyncError(
  async (req, res, next) => {
    let { product } = req.body;

    let wish = await userModel.findOneAndUpdate(
       req.user._id ,
      { 
        $pull: { wishList: product }, 
      },
      {
        new: true,
      }
    );
    !wish && next(new AppError("not found review", 404));
    wish && res.json({ message: "done", wish });
  }
);

export const getAllWishList =
  catchAsyncError(
  async (req, res, next) => {

    let wish = await userModel.findById( req.user._id );
    !wish && next(new AppError("not found review", 404));
    wish && res.json({ message: "done", wish:wish.wishList});
  }
);
