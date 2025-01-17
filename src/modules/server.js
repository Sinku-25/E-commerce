import globalError from "../utils/middleware/globalErrorHandle.js";
import AppError from "../utils/services/AppError.js";
import adressRouter from "./Adress/adress.routes.js";
import authRouter from "./auth/auth.routes.js";
import brandRouter from "./brand/brand.routes.js";
import cartRouter from "./cart/cart.routes.js";
import categoryRouter from "./category/category.routes.js";
import couponRouter from "./coupon/coupon.routes.js";
import orderRouter from "./order/order.routes.js";
import productRouter from "./product/product.routes.js";
import reviewRouter from "./review/review.routes.js";
import SubCategoryRouter from "./subcategory/subCategory.routes.js";
import userRouter from "./user/user.routes.js";
import wishListRouter from "./wishList/wishList.routes.js";

export function init(app){
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/subcategory", SubCategoryRouter);
app.use("/api/v1/brand", brandRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/wishList", wishListRouter);
app.use("/api/v1/adress", adressRouter);
app.use("/api/v1/coupon", couponRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);
app.use("*", (req, res, next) => {
    next(new AppError(`can't find this route :${req.originalUrl}`, 404));
  });
  app.use(globalError);
}