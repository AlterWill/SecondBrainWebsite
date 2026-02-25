import express from "express";
import { getUserContent, addContent } from "../controllers/contentController";
import  authMiddleware  from "../middleware/authMiddleware";

const router = express.Router();

router.use(authMiddleware)

router.get("/home/:userId", getUserContent);
router.post("/add", addContent);

export default router;
