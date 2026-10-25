import prisma from "../config/database.js";

export const getEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: [{ eventDate: "asc" }, { createdAt: "desc" }],
    });

    return res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    console.error("Get events error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch events",
    });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: req.params.id },
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error("Get event error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch event",
    });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { description, eventDate } = req.body;

    if (
      typeof description !== "string" ||
      !description.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Event description is required",
      });
    }

    // The Event model requires an image.
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Event image is required",
      });
    }

    let parsedEventDate;

    if (eventDate !== undefined && eventDate !== "") {
      parsedEventDate = new Date(eventDate);

      if (Number.isNaN(parsedEventDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid event date",
        });
      }
    }

    const event = await prisma.event.create({
      data: {
        image: `/uploads/events/${req.file.filename}`,
        description: description.trim(),
        ...(parsedEventDate
          ? { eventDate: parsedEventDate }
          : {}),
      },
    });

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event,
    });
  } catch (error) {
    console.error("Create event error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create event",
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, eventDate } = req.body;

    const existingEvent = await prisma.event.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const data = {};

    if (description !== undefined) {
      if (
        typeof description !== "string" ||
        !description.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "Event description cannot be empty",
        });
      }

      data.description = description.trim();
    }

    if (eventDate !== undefined) {
      if (eventDate === "") {
        data.eventDate = null;
      } else {
        const parsedEventDate = new Date(eventDate);

        if (Number.isNaN(parsedEventDate.getTime())) {
          return res.status(400).json({
            success: false,
            message: "Invalid event date",
          });
        }

        data.eventDate = parsedEventDate;
      }
    }

    if (req.file) {
      data.image = `/uploads/events/${req.file.filename}`;
    }

    const event = await prisma.event.update({
      where: { id },
      data,
    });

    return res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: event,
    });
  } catch (error) {
    console.error("Update event error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update event",
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const existingEvent = await prisma.event.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    await prisma.event.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Delete event error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete event",
    });
  }
};