import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

export async function connectDB () {
  try {
    await mongoose.connect(process.env.MONGO_URL!)
    console.log(" database connected ")
  } catch (error) {
    console.log(" error connecting database",error)
  }
}

interface User {
  username : string,
  passwordHash : string,
}

interface Content {
  title : string,
  paragraph : string,
  tags : [string] ,
  userId : mongoose.Types.ObjectId
} 

const UserSchema = new mongoose.Schema<User> ({
  "username" : { type : String , unique : true , required : true },
  "passwordHash" : { type : String , required : true }
},{ timestamps : true })

const contentSchema = new mongoose.Schema<Content> ({
  "title" : { type : String , required : true },
  "paragraph" : { type : String , required : true },
  "tags" : [ { type : String , required : true } ],
  "userId" : {
    type : mongoose.Types.ObjectId,
    ref  : "User",
    required : true
  }
}, { timestamps : true }) 

export const userModal = mongoose.model("User" , UserSchema )
export const contentModal = mongoose.model("Content" , contentSchema )
