// scripts/test-db.js
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" }); // ⬅ loads MONGODB_URI from .env.local

import { dbConnect } from "../helpers/db.js";

async function main() {
  try {
    await dbConnect(); // uses process.env.MONGODB_URI
    console.log("✅ MongoDB connected successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
}

main();