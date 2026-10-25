
import express from "express";

import {
  getGalleryItems,
  getGalleryItemById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "../controllers/galleryController.js";

import {
  protect,
  restrictTo,
} from "../middleware/authMiddleware.js";

import { uploadGalleryImage } from "../middleware/galleryUpload.js";

const router = express.Router();

// Public routes
router.get("/", getGalleryItems);
router.get("/:id", getGalleryItemById);

// Admin-only routes
router.post(
  "/",
  protect,
  restrictTo("ADMIN"),
  uploadGalleryImage.single("image"),
  createGalleryItem
);

router.patch(
  "/:id",
  protect,
  restrictTo("ADMIN"),
  uploadGalleryImage.single("image"),
  updateGalleryItem
);

router.delete(
  "/:id",
  protect,
  restrictTo("ADMIN"),
  deleteGalleryItem
);

export default router;
