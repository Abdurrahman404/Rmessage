import express from "express";
import "dotenv/config";
import connectDB from "./lib/db.js";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import fs from "fs";
import path from "path"; 
import clerkWebhook from "./webhooks/clerk.webhook.js";
import job from "./lib/crons.js";
import authRoutes from "./routes/auth.route.js";




const app = express();
const port = process.env.PORT || 3000;
const frontendUrl = process.env.FRONTEND_URL;
const publicDir = path.join(process.cwd(), "public");



// it is important to use raw middleware to receive the raw body of the request instead of express.json() middleware,
//  because express.json() will parse the body and we will not be able to verify the signature of the webhook request.
app.use(
  "/api/webhook/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhook,
);

app.use(express.json());
app.use(clerkMiddleware());
app.use(cors({ origin: frontendUrl, credentials: true }));


app.use('api/auth' , authRoutes); 

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
  if(process.env.NODE_ENV === "production"){
    (job.start())
  }
  console.log(`Server is running on port ${port}`);
});
