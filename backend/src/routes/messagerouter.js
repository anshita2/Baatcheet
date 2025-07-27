import express from "express";
import { getMessages, sendMessage } from "../controllers/messagecontroller.js";
import isAuthenticated from "../middleware/authmiddleware.js";

const router = express.Router();

router.route("/send/:id").post(isAuthenticated,sendMessage);
router.route("/:id").get(isAuthenticated, getMessages);

export default router;