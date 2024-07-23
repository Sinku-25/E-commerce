import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'user name required'],
        minLength:[2,"name is too short"],
        trim:true
    },
    email:{
        type:String,
        required:[true,'email required'],
        unique:[true,'email must be unique'],
        trim:true
    },
    password:{
        type:String,
        minLength:[4,"password is too short"],
        maxLength:[100,"password is too long"],
        required:true
    },
    phone:{
        type:String,
        required:[true,'password number required']
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    changePasswordAt:Date,
    isActive:{
        type:Boolean,
        default:true,
    },
    wishList:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'product'
    }],
    Adress:[{
        city:String,
        street:String,
        phone:String,
    }],
    verified:{
        type:Boolean,
        default:false
    },
    blocked:{
        type:Boolean,
        default:false,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isOnline: {
        type: Boolean,
        default: false
    }
},{
    timestamps:true
})
userSchema.pre("save",function(){
    this.password = bcrypt.hashSync(this.password,7)
})
userSchema.pre(["findOneAndUpdate",'findByIdAndUpdate'],function(){
    this._update.password = bcrypt.hashSync(this._update.password,7)
})
const userModel = mongoose.model("user",userSchema);

export default userModel;