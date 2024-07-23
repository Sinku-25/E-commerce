import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true,'name is required'],
    required: true,
  },
  slug: {
    type: String,
    lowercase: true,
    required:true
  },
  logo: {
    type: String,
    require: true,
  },
},{
    timestamps:true
});
brandSchema.post("init", (doc) => {
  doc.logo = process.env.BASE_URL +  "brand/" + doc.logo;
});
const brandModel = mongoose.model("brand", brandSchema);

export default brandModel;
