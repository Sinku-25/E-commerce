import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
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
totalPriceAfterDiscount:Number
},{
    timestamps:true
});

const cartModel = mongoose.model("cart", cartSchema);

export default cartModel;