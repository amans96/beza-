
import prisma from "../config/database.js";

export const getClubs = async (req, res) => {
  try {
    const clubs = await prisma.club.findMany({
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({
      success: true,
      count: clubs.length,
      data: clubs,
    });
  } catch (error) {
    console.error("Get clubs error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch clubs",
    });
  }
};

export const getClubById = async (req, res) => {
  try {
    const club = await prisma.club.findUnique({
      where: { id: req.params.id },
    });

    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Club not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: club,
    });
  } catch (error) {
    console.error("Get club error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch club",
    });
  }
};

export const createClub = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Club name is required",
      });
    }

    const club = await prisma.club.create({
      data: {
        name: name.trim(),
        description:
          typeof description === "string"
            ? description.trim() || null
            : null,
        image: req.file
          ? `/uploads/clubs/${req.file.filename}`
          : null,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Club created successfully",
      data: club,
    });
  } catch (error) {
    console.error("Create club error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create club",
    });
  }
};

export const updateClub = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const existingClub = await prisma.club.findUnique({
      where: { id },
    });

    if (!existingClub) {
      return res.status(404).json({
        success: false,
        message: "Club not found",
      });
    }

    const data = {};

    if (name !== undefined) {
      if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Club name cannot be empty",
        });
      }

      data.name = name.trim();
    }

    if (description !== undefined) {
      if (typeof description !== "string") {
        return res.status(400).json({
          success: false,
          message: "Description must be text",
        });
      }

      data.description = description.trim() || null;
    }

    if (req.file) {
      data.image = `/uploads/clubs/${req.file.filename}`;
    }

    const club = await prisma.club.update({
      where: { id },
      data,
    });

    return res.status(200).json({
      success: true,
      message: "Club updated successfully",
      data: club,
    });
  } catch (error) {
    console.error("Update club error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update club",
    });
  }
};

export const deleteClub = async (req, res) => {
  try {
    const { id } = req.params;

    const existingClub = await prisma.club.findUnique({
      where: { id },
    });

    if (!existingClub) {
      return res.status(404).json({
        success: false,
        message: "Club not found",
      });
    }

    await prisma.club.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Club deleted successfully",
    });
  } catch (error) {
    console.error("Delete club error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete club",
    });
  }
};
