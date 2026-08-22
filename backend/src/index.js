import express from "express";
import "dotenv/config";
import User from "./models/user.model.js";
import connectDB from "./lib/db.js";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import fs from "fs";
import path from "path"; 


const app = express();
const port = process.env.PORT || 3000;
const frontendUrl = process.env.FRONTEND_URL;
const publicDir = path.join(process.cwd(), "public");



app.use(express.json());
app.use(clerkMiddleware());
app.use(cors({ origin: frontendUrl, credentials: true }));

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy" });
});


// Serve static files from the public directory if it exists
// This is useful for serving a frontend application built with React, Vue, etc.
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));

  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(publicDir, "index.html"));
  });
}





app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
