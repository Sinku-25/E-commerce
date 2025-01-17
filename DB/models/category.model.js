import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "name is required"],
      trim: true,
      required: true,
      minLength: [2, "too short category name"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
categorySchema.post("init", (doc) => {
  doc.image = process.env.BASE_URL +  "category/" + doc.image;
});
const categoryModel = mongoose.model("category", categorySchema);

export default categoryModel;
