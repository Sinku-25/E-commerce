import AppError from "../../utils/services/AppError.js";
import catchAsyncError from "../../utils/middleware/catchAsyncError.js";
import cartModel from "../../../DB/models/cart.model.js";
import productModel from "../../../DB/models/product.model.js";
import couponModel from "../../../DB/models/coupon.model.js";

function calcPrice(cart) {
  let totalPrice = 0;
  cart.cartItems.forEach((ele) => {
    totalPrice += ele.quantity * ele.price;
  });
  cart.totalPrice = totalPrice;
}

export const creatCart = catchAsyncError(async (req, res, next) => {
  let product = await productModel.findById(req.body.product).select("price");
  !product && next(new AppError("product not found", 404));
  req.body.price = product.price;
  let isCartExist = await cartModel.findOne({ user: req.user._id });
  if (!isCartExist) {
    let cart = new cartModel({
      user: req.user._id,
      cartItems: [req.body],
    });
    calcPrice(cart);
    await cart.save();
    res.status(201).json({ message: "Created", cart });
  }

  let item = isCartExist.cartItems.find(
    (ele) => ele.product == req.body.product
  );
  if (item) {
    item.quantity += 1;
  } else {
    isCartExist.cartItems.push(req.body);
  }
  calcPrice(isCartExist);
  await isCartExist.save();
  res.json({ message: " cart  ", isCartExist });
});

export const getAllCart = catchAsyncError(async (req, res, next) => {
  let cart = await cartModel.findOne({ user: req.user._id });
  res.json({ message: "Done", cart });
});

export const removeCartItem = catchAsyncError(async (req, res, next) => {
  let cart = await cartModel.findOneAndUpdate(
    { user: req.user._id, cartItems: { $elemMatch: { _id: req.params._id } } },
    { $pull: { cartItems: { _id: req.params._id } } },
    { new: true }
  );
  !cart && next(new AppError("Cart Item not found", 404));
  calcPrice(cart);
  res.json({ message: "Deleted", cart });
});

export const updateCart = catchAsyncError(async (req, res, next) => {
  const product = await productModel.findById(req.body.product).select("price");
  !product && next(new AppError("Product not found", 404));

  const isCartExist = await cartModel.findOneAndUpdate(
    { user: req.user._id, "cartItems.product": req.body.product },
    {
      $set: {
        "cartItems.$.quantity": req.body.quantity,
        "cartItems.$.price": product.price,
      },
    },
    { new: true }
  );

  calcPrice(isCartExist);
  await isCartExist.save();
  res.json({ message: "Cart updated", isCartExist });
});

export const applyCoupon =
catchAsyncError(
  async (req, res, next) => {
  let code = await couponModel.findOne({ code: req.body.code , expires: { $gt: Date.now() }, });
  let cart = await cartModel.findOne({ user: req.user._id });
  cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * code.discount) / 100;
  cart.discount = code.discount;
  await cart.save();
  res.json({ message: "Done", cart });
}
);
