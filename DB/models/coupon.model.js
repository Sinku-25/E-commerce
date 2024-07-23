import mongoose, { Types } from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      unique:true
    },
    expires: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const couponModel = mongoose.model("coupon", couponSchema);

export default couponModel;
