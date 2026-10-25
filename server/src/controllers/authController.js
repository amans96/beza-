
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/database.js";

const createToken = (user) => {
    return jwt.sign(
        {
            userId: user.id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

const publicUser = (user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
});

// POST /api/auth/signup
export const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string"
        ) {
            return res.status(400).json({
                message: "Name, email, and password are required.",
            });
        }

        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();

        if (cleanName.length < 2 || cleanName.length > 100) {
            return res.status(400).json({
                message: "Name must be between 2 and 100 characters.",
            });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
            return res.status(400).json({
                message: "Please provide a valid email address.",
            });
        }

        if (password.length < 8 || password.length > 72) {
            return res.status(400).json({
                message: "Password must be between 8 and 72 characters.",
            });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email: cleanEmail },
        });

        if (existingUser) {
            return res.status(409).json({
                message: "An account with this email already exists.",
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                name: cleanName,
                email: cleanEmail,
                passwordHash,
                role: "USER",
            },
        });

        const token = createToken(user);

        return res.status(201).json({
            message: "Account created successfully.",
            token,
            user: publicUser(user),
        });
    } catch (error) {
        // Handle a concurrent signup with the same email.
        if (error?.code === "P2002") {
            return res.status(409).json({
                message: "An account with this email already exists.",
            });
        }

        next(error);
    }
};

// POST /api/auth/signin
export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                message: "Email and password are required.",
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email.trim().toLowerCase(),
            },
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password.",
            });
        }

        if (!user.isActive) {
            return res.status(403).json({
                message: "This account is inactive. Please contact support.",
            });
        }

        const passwordMatches = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!passwordMatches) {
            return res.status(401).json({
                message: "Invalid email or password.",
            });
        }

        const token = createToken(user);

        return res.status(200).json({
            message: "Signed in successfully.",
            token,
            user: publicUser(user),
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/auth/me
export const getMe = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
        });

        if (!user || !user.isActive) {
            return res.status(404).json({
                message: "User account not found or inactive.",
            });
        }

        return res.status(200).json({
            user: publicUser(user),
        });
    } catch (error) {
        next(error);
    }
};

// PATCH /api/auth/me
export const updateMe = async (req, res, next) => {
    try {
        const { name, email } = req.body;

        if (name === undefined && email === undefined) {
            return res.status(400).json({
                message: "Provide a name or email to update.",
            });
        }

        const data = {};

        if (name !== undefined) {
            if (typeof name !== "string") {
                return res.status(400).json({
                    message: "Name must be a string.",
                });
            }

            const cleanName = name.trim();

            if (cleanName.length < 2 || cleanName.length > 100) {
                return res.status(400).json({
                    message: "Name must be between 2 and 100 characters.",
                });
            }

            data.name = cleanName;
        }

        if (email !== undefined) {
            if (typeof email !== "string") {
                return res.status(400).json({
                    message: "Email must be a string.",
                });
            }

            const cleanEmail = email.trim().toLowerCase();

if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return res.status(400).json({
        message: "Please provide a valid email address.",
    });
}

            data.email = cleanEmail;
        }

        const user = await prisma.user.update({
            where: { id: req.user.userId },
            data,
        });

        return res.status(200).json({
            message: "Profile updated successfully.",
            user: publicUser(user),
        });
    } catch (error) {
        if (error?.code === "P2002") {
            return res.status(409).json({
                message: "That email address is already in use.",
            });
        }

        if (error?.code === "P2025") {
            return res.status(404).json({
                message: "User account not found.",
            });
        }

        next(error);
    }
};

// PATCH /api/auth/change-password
export const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (
            typeof currentPassword !== "string" ||
            typeof newPassword !== "string"
        ) {
            return res.status(400).json({
                message: "Current password and new password are required.",
            });
        }

        if (
            newPassword.length < 8 ||
            newPassword.length > 72
        ) {
            return res.status(400).json({
                message: "New password must be between 8 and 72 characters.",
            });
        }

        if (currentPassword === newPassword) {
            return res.status(400).json({
                message: "New password must differ from the current password.",
            });
        }

        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
        });

        if (!user || !user.isActive) {
            return res.status(404).json({
                message: "User account not found or inactive.",
            });
        }

        const passwordMatches = await bcrypt.compare(
            currentPassword,
            user.passwordHash
        );

        if (!passwordMatches) {
            return res.status(401).json({
                message: "Current password is incorrect.",
            });
        }

        const passwordHash = await bcrypt.hash(newPassword, 12);

        await prisma.user.update({
            where: { id: user.id },
            data: { passwordHash },
        });

        return res.status(200).json({
            message: "Password changed successfully. Please sign in again.",
        });
    } catch (error) {
        next(error);
    }
};
