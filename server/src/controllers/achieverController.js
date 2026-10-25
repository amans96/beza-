
import prisma from "../config/database.js";

export const getAchievers = async (req, res) => {
  try {
    const achievers = await prisma.achiever.findMany({
      orderBy: [{ rank: "asc" }, { createdAt: "desc" }],
    });

    return res.status(200).json({
      success: true,
      count: achievers.length,
      data: achievers,
    });
  } catch (error) {
    console.error("Get achievers error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch achievers",
    });
  }
};

export const getAchieverById = async (req, res) => {
  try {
    const { id } = req.params;

    const achiever = await prisma.achiever.findUnique({
      where: { id },
    });

    if (!achiever) {
      return res.status(404).json({
        success: false,
        message: "Achiever not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: achiever,
    });
  } catch (error) {
    console.error("Get achiever error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch achiever",
    });
  }
};

export const createAchiever = async (req, res) => {
  try {
    const { name, achievementClass, rank, description } = req.body;

    if (!name?.trim() || !achievementClass?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name and achievement class are required",
      });
    }

    if (rank === undefined || !Number.isInteger(Number(rank)) ||
        Number(rank) < 0) {
      return res.status(400).json({
        success: false,
        message: "Rank must be a non-negative integer",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Achiever photo is required",
      });
    }

    const achiever = await prisma.achiever.create({
      data: {
        name: name.trim(),
        achievementClass: achievementClass.trim(),
        rank: Number(rank),
        description: description?.trim() || null,
        photo: `/uploads/achievers/${req.file.filename}`,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Achiever created successfully",
      data: achiever,
    });
  } catch (error) {
    console.error("Create achiever error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create achiever",
    });
  }
};

export const updateAchiever = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, achievementClass, rank, description } = req.body;

    const existing = await prisma.achiever.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Achiever not found",
      });
    }

    const data = {};

    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Name cannot be empty",
        });
      }
      data.name = name.trim();
    }

    if (achievementClass !== undefined) {
      if (!achievementClass.trim()) {
        return res.status(400).json({
          success: false,
          message: "Achievement class cannot be empty",
        });
      }
      data.achievementClass = achievementClass.trim();
    }

    if (rank !== undefined) {
      if (!Number.isInteger(Number(rank)) || Number(rank) < 0) {
        return res.status(400).json({
          success: false,
          message: "Rank must be a non-negative integer",
        });
      }
      data.rank = Number(rank);
    }

    if (description !== undefined) {
      data.description = description.trim() || null;
    }

    if (req.file) {
      data.photo = `/uploads/achievers/${req.file.filename}`;
    }

    const achiever = await prisma.achiever.update({
      where: { id },
      data,
    });

    return res.status(200).json({
      success: true,
      message: "Achiever updated successfully",
      data: achiever,
    });
  } catch (error) {
    console.error("Update achiever error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update achiever",
    });
  }
};

export const deleteAchiever = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.achiever.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Achiever not found",
      });
    }

    await prisma.achiever.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Achiever deleted successfully",
    });
  } catch (error) {
    console.error("Delete achiever error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete achiever",
    });
  }
};
