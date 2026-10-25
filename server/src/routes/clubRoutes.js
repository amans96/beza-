
import express from "express";

import {
  getClubs,
  getClubById,
  createClub,
  updateClub,
  deleteClub,
} from "../controllers/clubController.js";

import {
  protect,
  restrictTo,
} from "../middleware/authMiddleware.js";

import { uploadClubImage } from "../middleware/clubUpload.js";

const router = express.Router();

// Public routes
router.get("/", getClubs);
router.get("/:id", getClubById);

// Admin-only routes
router.post(
  "/",
  protect,
  restrictTo("ADMIN"),
  uploadClubImage.single("image"),
  createClub
);

router.patch(
  "/:id",
  protect,
  restrictTo("ADMIN"),
  uploadClubImage.single("image"),
  updateClub
);

router.delete(
  "/:id",
  protect,
  restrictTo("ADMIN"),
  deleteClub
);

export default router;
