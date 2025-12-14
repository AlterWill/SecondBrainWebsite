require("dotenv").config();

const express = require("express")
const cors = require("cors")

import { Request , Response } from "express"
import { connectDB , userModal , contentModal } from "../database/mongo"

connectDB();
const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup" , (req: Request , res: Response ) => {
})

app.post("/signin" , (req: Request , res: Response ) => {
})

app.get("/home/:userId" , async (req: Request , res: Response ) => {
  let userId = req.params.userId

  let result = await contentModal.find({ userId : userId })

  return res.status(200).json(result)
})

app.post("/add" , (req: Request , res: Response ) => {
  const { title , note} = req.body; 
  
  if( !title?.trim() || !note?.trim()){
    return res.json({ "succes":"false"})
  }
  
})

app.get("/" , (req: Request , res: Response ) => {
})

app.listen(process.env.PORT! , () => { console.log(" server is running ") })
