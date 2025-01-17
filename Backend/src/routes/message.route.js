import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUserForSidebar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router()

router.get("/users", protectRoute, getUserForSidebar)

//to get message when we go to the profile id
router.get("/:id", protectRoute, getMessages)

// to send text or image message as a sender
router.get("/send/:id", protectRoute, sendMessage)

export default router