const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

// Seed Database on app start.
const mongoose = require("mongoose");
const seed = require("./seed");

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/pos-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");

    // Run the seed function
    seed(); // This will only seed if no data exists.
  })
  .catch((err) => console.log("Error connecting to MongoDB:", err));

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
