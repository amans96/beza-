
import { Router } from "express";

import {
    signup,
    signin,
    getMe,
    updateMe,
    changePassword,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// Public routes
router.post("/signup", signup);
router.post("/signin", signin);

// Authenticated user routes
router.get("/me", protect, getMe);
router.patch("/me", protect, updateMe);
router.patch("/change-password", protect, changePassword);

export default router;
