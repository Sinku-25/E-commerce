import mongoose, { Types } from "mongoose";

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true,'name is required'],
    required: true,
    minLength: [2, "too short subCategory name"],
  },
  slug: {
    type: String,
    lowercase: true,
    required:true
  },
  category: {
    type: Types.ObjectId,
    ref: "category",
    required: true,
  },
},{
    timestamps:true
});

const subCategoryModel = mongoose.model("subCategory", subCategorySchema);

export default subCategoryModel;
