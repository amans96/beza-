
import express from "express";
import path from "node:path";

import authRoutes from "./routes/authRoutes.js";
import achieverRoutes from "./routes/achieverRoutes.js";
import clubRoutes from "./routes/clubRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
const app = express();

app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static(path.resolve("uploads")));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/achievers", achieverRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/gallery", galleryRoutes);
// Register Event, Gallery, and other routes here when ready.

export default app;
