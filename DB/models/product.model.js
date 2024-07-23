import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: [true, "product is unique"],
      required: true,
      trim: true,
      minLength: [5, "too short product title"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
    },
    priceAfterDiscount: {
      type: Number,
      default: 0,
      min: 0,
    },
    description: {
      type: String,
      minLength: [5, "Too short product description"],
      maxLength: [100, "Too long product description"],
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      default: 0,
      min: 0,
      required: [true, "product quantity required"],
    },
    sold: {
      type: Number,
      default: 0,
      min: 0,
    },
    imageCover: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "category",
      required: [true, "prouct category required"],
    },
    subcategory: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "subCategory",
      required: [true, "procut subcategory required"],
    },
    brand: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "brand",
      required: [true, "product brand required"],
    },
    ratingAvg: {
      type: Number,
      min: [1, "rating average must be greater than 1"],
      max: [5, "rating average must be less than 1"],
    },
    ratingCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

productSchema.post('init',function(doc){

  if(doc.imageCover && doc.images){

    doc.imageCover = `${process.env.BASE_URL}products/${doc.imageCover}`
    doc.images = doc.images.map((ele)=>{
     return `${process.env.BASE_URL}products/${ele}`
    })
  }


})

// productSchema.post("init", (doc) => {
//   doc.imageCover = process.env.BASE_URL + "product/" + doc.imageCover;
//   if(doc.images)doc.images = doc.images.map((path) => process.env.BASE_URL + "product/" + path);
// });

productSchema.virtual("myReview", {
  ref: "review",
  localField: "_id",
  foreignField: "product",
});
productSchema.pre(/^find/, function () {
  this.populate("myReview");
});
const productModel = mongoose.model("product", productSchema);

export default productModel;
