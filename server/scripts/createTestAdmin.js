import "dotenv/config";
import bcrypt from "bcryptjs";
import prisma from "../src/config/database.js";

const email = "admin.test@beza.local";
const password = "BezaAdmin123!";

async function createTestAdmin() {
  try {
    const passwordHash = await bcrypt.hash(password, 12);

    const admin = await prisma.user.upsert({
      where: { email },
      update: {
        name: "Beza Test Admin",
        passwordHash,
        role: "ADMIN",
        isActive: true,
      },
      create: {
        name: "Beza Test Admin",
        email,
        passwordHash,
        role: "ADMIN",
        isActive: true,
      },
    });

    console.log("Test admin is ready!");
    console.log("Email:", admin.email);
    console.log("Password:", password);
    console.log("Role:", admin.role);
  } catch (error) {
    console.error("Could not create test admin:", error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

createTestAdmin();