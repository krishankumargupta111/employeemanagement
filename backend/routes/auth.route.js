import { Router } from "express";
import { changePassword, Login, session } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.js";

const authRouter=Router()
authRouter.post("/login",Login)
authRouter.get("/session",protect,session)
authRouter.post("/change-password",protect,changePassword)
export default authRouter