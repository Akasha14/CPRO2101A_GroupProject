const express = require("express");
const { authenticateToken } = require("../middleware/authToken");

const {
  createTransaction,
  getTransactionById,
  getDailyTransactions,
  getTransactionsByEmployee,
} = require("../controllers/transactionController");

const router = express.Router();

// Create a new transaction
router.post("/", authenticateToken, createTransaction);

// Get a transaction by ID
router.get("/:transactionId", authenticateToken, getTransactionById);

// Get daily transactions
router.get("/daily", authenticateToken, getDailyTransactions);

// Get transactions by employee
router.get(
  "/employee/:employeeId",
  authenticateToken,
  getTransactionsByEmployee
);

module.exports = router;
