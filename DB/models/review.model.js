import mongoose, { Types } from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    product: {
      type: Types.ObjectId,
      ref: "product",
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    rate: {
      type: Number,
      min:1,
      max:5
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.pre(/^find/,function(){
  this.populate("user","name")
})

const reviewModel = mongoose.model("review", reviewSchema);

export default reviewModel;
