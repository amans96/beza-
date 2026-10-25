
import jwt from "jsonwebtoken";
import prisma from "../config/database.js";

export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authentication required. Please sign in.",
            });
        }

        const token = authHeader.slice(7).trim();

        if (!token) {
            return res.status(401).json({
                message: "Authentication token is missing.",
            });
        }

        let decoded;

        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch {
            return res.status(401).json({
                message: "Invalid or expired token. Please sign in again.",
            });
        }

        if (
            typeof decoded !== "object" ||
            typeof decoded.userId !== "string"
        ) {
            return res.status(401).json({
                message: "Invalid authentication token.",
            });
        }

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                role: true,
                isActive: true,
            },
        });

        if (!user || !user.isActive) {
            return res.status(401).json({
                message: "Your account is unavailable. Please sign in again.",
            });
        }

        req.user = {
            userId: user.id,
            role: user.role,
        };

        next();
    } catch (error) {
        next(error);
    }
};

// Optional middleware for routes restricted to administrators.
export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "You do not have permission to access this resource.",
            });
        }

        next();
    };
};
