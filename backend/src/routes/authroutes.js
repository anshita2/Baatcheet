import express from "express";
import {login,signup,logout, getAllUsers} from "../controllers/authcontroller.js"
import authMiddleware from "../middleware/authmiddleware.js";
const router=express.Router();

router.post("/login",login);
router.post("/signup",signup);
router.get("/logout",logout);
router.get("/", authMiddleware, getAllUsers);


export default router;