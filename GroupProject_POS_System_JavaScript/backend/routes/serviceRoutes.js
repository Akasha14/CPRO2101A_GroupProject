const express = require("express");
const { authenticateToken } = require("../middleware/authToken");
const {
  getAllServices,
  createService,
  getServiceById,
} = require("../controllers/serviceController");

const router = express.Router();

// Get all services
router.get("/", getAllServices);

// Get a service by ID
router.get("/:serviceId", authenticateToken, getServiceById);

// Create a new service
router.post("/", authenticateToken, createService);

module.exports = router;
