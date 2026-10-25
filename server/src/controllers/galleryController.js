
import prisma from "../config/database.js";

export const getGalleryItems = async (req, res) => {
  try {
    const { category, tag, year } = req.query;

    const where = {};

    if (category) where.category = category;
    if (tag) where.tag = tag;

    if (year !== undefined) {
      const parsedYear = Number(year);

      if (!Number.isInteger(parsedYear) || parsedYear < 1) {
        return res.status(400).json({
          success: false,
          message: "Year must be a positive integer",
        });
      }

      where.year = parsedYear;
    }

    const items = await prisma.gallery.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    console.error("Get gallery items error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch gallery items",
    });
  }
};

export const getGalleryItemById = async (req, res) => {
  try {
    const item = await prisma.gallery.findUnique({
      where: { id: req.params.id },
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    console.error("Get gallery item error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch gallery item",
    });
  }
};

export const createGalleryItem = async (req, res) => {
  try {
    const { title, description, tag, category, year } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Gallery image is required",
      });
    }

    let parsedYear = null;

    if (year !== undefined && year !== "") {
      parsedYear = Number(year);

      if (!Number.isInteger(parsedYear) || parsedYear < 1) {
        return res.status(400).json({
          success: false,
          message: "Year must be a positive integer",
        });
      }
    }

    const optionalText = (value) => {
      if (value === undefined || value === null) return null;
      if (typeof value !== "string") return null;
      return value.trim() || null;
    };

    const item = await prisma.gallery.create({
      data: {
        image: `/uploads/gallery/${req.file.filename}`,
        title: optionalText(title),
        description: optionalText(description),
        tag: optionalText(tag),
        category: optionalText(category),
        year: parsedYear,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Gallery item created successfully",
      data: item,
    });
  } catch (error) {
    console.error("Create gallery item error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create gallery item",
    });
  }
};

export const updateGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, tag, category, year } = req.body;

    const existing = await prisma.gallery.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    const data = {};

    const textFields = { title, description, tag, category };

    for (const [field, value] of Object.entries(textFields)) {
      if (value !== undefined) {
        if (typeof value !== "string") {
          return res.status(400).json({
            success: false,
            message: `${field} must be text`,
          });
        }

        data[field] = value.trim() || null;
      }
    }

    if (year !== undefined) {
      if (year === null || year === "") {
        data.year = null;
      } else {
        const parsedYear = Number(year);

        if (!Number.isInteger(parsedYear) || parsedYear < 1) {
          return res.status(400).json({
            success: false,
            message: "Year must be a positive integer",
          });
        }

        data.year = parsedYear;
      }
    }

    if (req.file) {
      data.image = `/uploads/gallery/${req.file.filename}`;
    }

    const item = await prisma.gallery.update({
      where: { id },
      data,
    });

    return res.status(200).json({
      success: true,
      message: "Gallery item updated successfully",
      data: item,
    });
  } catch (error) {
    console.error("Update gallery item error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update gallery item",
    });
  }
};

export const deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.gallery.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    await prisma.gallery.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Gallery item deleted successfully",
    });
  } catch (error) {
    console.error("Delete gallery item error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete gallery item",
    });
  }
};
