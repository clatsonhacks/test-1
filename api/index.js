import express from "express";
import cors from "cors";
import morgan from "morgan";
import { VercelRequest, VercelResponse } from "@vercel/node";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// In-memory storage
let dataStore: { id: number; address: string }[] = [];

// POST endpoint to save data
app.post("/api/save", (req: VercelRequest, res: VercelResponse) => {
  const { address } = req.body;
  if (!address || typeof address !== "string") {
    return res.status(400).json({ error: "A valid address is required." });
  }

  const newData = { id: dataStore.length + 1, address };
  dataStore.push(newData);

  res.status(201).json({ message: "Data saved successfully.", data: newData });
});

// GET endpoint to retrieve data
app.get("/api/data", (req: VercelRequest, res: VercelResponse) => {
  res.json(dataStore);
});

// Error handling middleware
app.use((err: any, req: VercelRequest, res: VercelResponse, next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong on the server." });
});

export default app;
