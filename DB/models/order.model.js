import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
user:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:"user"
},
cartItems:[{
    product:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"product"
    },
    quantity:{
        type:Number,
        default:1
    },
    price:Number
}],
totalPrice:Number,
discount:Number,
totalPriceAfterDiscount:Number,
paymentMethod:{
    type:String,
    enums:['cache','credit'],
    default:'cache'
},
shippingAdress:{
    city:String,
    street:String
},
isPaid:Boolean,
paidAt:Date,
isDelivered:Boolean,
},{
    timestamps:true
});

const orderModel = mongoose.model("order", orderSchema);

export default orderModel;