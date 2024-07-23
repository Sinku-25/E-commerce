import AppError from "../../utils/services/AppError.js";
import catchAsyncError from "../../utils/middleware/catchAsyncError.js";
import orderModel from "../../../DB/models/order.model.js";
import cartModel from "../../../DB/models/cart.model.js";
import productModel from "../../../DB/models/product.model.js";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51NyIdcE6PSsRZPu9mNsgzU3Amj1LtCCi9GUYfTpTDbhQZZgvdOjMOpmOZ7XVpbzd6Je9M5bmxnj0DVFmdN2Hjfir00pRmufBJZ');


export const creatOrder = catchAsyncError(async (req, res, next) => {

  let cart = await cartModel.findById(req.params._id);

  let totalPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice;

  let order = new orderModel({
    user: req.user._id,
    cartItems: cart.cartItems,
    totalPrice,
    shippingAdress: req.body.shippingAdress,
  });

  if (order) {
    let options = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity, sold: item.quantity } },
      },
    }));
    await productModel.bulkWrite(options);
    await order.save();
  }else{
    return next(new AppError("Error occur",404))
  }
  await cartModel.findByIdAndDelete(req.params._id);
  res.json({ message: "Done", order });
});


export const getOrder = catchAsyncError(async(req,res,next)=>{
  let order = await orderModel.findOne({user:req.user._id}).populate("cartItems.product");
  res.json({message:"founded",order});
});


export const onlinePayment = catchAsyncError(async(req,res,next)=>{
  let cart = await cartModel.findById(req.params._id);
  let totalPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice;
let session = await stripe.checkout.sessions.create({
  line_items:[
    {
      price_data:{
        currency:'egp',
        unit_amount: totalPrice * 100,
        product_data:{
          name:req.user.name,
        },
      },
      quantity:1,
    },
  ],
  mode:"payment",
  success_url:"https://www.google.com/",
  cancel_url:"https://www.youtube.com/",
  customer_email:req.user.email,
  client_reference_id:req.params._id,
  metadata:req.body.shippingAdress,
});
res.json({message:"payed",session})
})