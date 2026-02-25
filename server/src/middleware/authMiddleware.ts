import { Request , Response , NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";

interface AuthRequest extends Request { userId?:string }

export default ( req:AuthRequest , res:Response , next:NextFunction ) => {
  const authHeader = req.headers.authorization;

  if(!authHeader){ return res.status(400).json({ error : "No token given" }); }

  const token = authHeader.split(" ")[1];
  const decoded = verifyAccessToken(token);

  if(!decoded || typeof decoded != "object" || !("id" in decoded)){ 
      return res.status(400).json({ error : "Invalid Access Token" });
  }

  req.userId = decoded.id
  next();
};
