import express from "express";
import "dotenv/config";
import User from "./models/user.model.js";
import connectDB from "./lib/db.js";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";

const app = express();
const port = process.env.PORT;
const frontendUrl = process.env.FRONTEND_URL;

app.use(express.json());
app.use(clerkMiddleware());
app.use(cors({ origin: frontendUrl, credentials: true }));

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy" });
});

app.listen(port, () => {
  connectDB();
  console.log("Server is running on port 3000");
});
