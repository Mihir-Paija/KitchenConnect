import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./configs/dbConnect.js";

// Call the connectToDB function
connectDB();

// Create an Express application
const app = express();

//global middleware
app.use(express.json());

// Define a route that responds with a message when accessed
app.get("/", (req, res) => {
  res.status(200).json({ message: "This is KitchenConnect" });
});

// Specify the port number
const port = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server for KitchenConnect is listening on port ${port}...`);
});
