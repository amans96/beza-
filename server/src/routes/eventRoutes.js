
import express from "express";

import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

import {
  protect,
  restrictTo,
} from "../middleware/authMiddleware.js";

import { uploadEventImage } from "../middleware/eventUpload.js";

const router = express.Router();

// Public routes
router.get("/", getEvents);
router.get("/:id", getEventById);

// Admin-only routes
router.post(
  "/",
  protect,
  restrictTo("ADMIN"),
  uploadEventImage.single("image"),
  createEvent
);

router.patch(
  "/:id",
  protect,
  restrictTo("ADMIN"),
  uploadEventImage.single("image"),
  updateEvent
);

router.delete(
  "/:id",
  protect,
  restrictTo("ADMIN"),
  deleteEvent
);

export default router;
