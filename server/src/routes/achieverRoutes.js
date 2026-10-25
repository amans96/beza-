import express from "express";

import {
  getAchievers,
  getAchieverById,
  createAchiever,
  updateAchiever,
  deleteAchiever,
} from "../controllers/achieverController.js";

import {
  protect,
  restrictTo,
} from "../middleware/authMiddleware.js";

import { uploadAchieverPhoto } from "../middleware/achieverUpload.js";

const router = express.Router();

// Public routes
router.get("/", getAchievers);
router.get("/:id", getAchieverById);

// Admin-only routes
router.post(
  "/",
  protect,
  restrictTo("ADMIN"),
  uploadAchieverPhoto.single("photo"),
  createAchiever
);

router.patch(
  "/:id",
  protect,
  restrictTo("ADMIN"),
  uploadAchieverPhoto.single("photo"),
  updateAchiever
);

router.delete(
  "/:id",
  protect,
  restrictTo("ADMIN"),
  deleteAchiever
);

export default router;