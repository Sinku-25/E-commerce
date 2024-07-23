import mongoose from "mongoose";

export const connection = ()=>{
    mongoose.connect(process.env.DB_CONNECTION).then(()=>{
        console.log("Connected to MongoDB");
    }).catch((err)=>{
        console.log("Error connection to MongoDB",err);
    })
}