const Transaction = require("../models/transaction");
const TransactionDetail = require("../models/transactionDetails");
const Service = require("../models/service");
const { reset } = require("nodemon");

// Create a new transaction
const createTransaction = async (req, res) => {
  try {
    const { employee, customer, paymentType, transactionDetails } = req.body;

    // Calculate the total amount
    let totalAmount = 0;
    const transactionDetailsDocs = await Promise.all(
      transactionDetails.map(async (detail) => {
        const service = await Service.findById(detail.service);
        if (!service)
          throw new Error(`Service with ID ${detail.service} not found`);

        const subtotal = parseFloat(service.price) * detail.quantity;
        totalAmount += subtotal;

        return {
          service: service._id,
          quantity: detail.quantity,
          subtotal,
        };
      })
    );

    // Create the transaction
    const transaction = new Transaction({
      employee,
      customer,
      paymentType,
      transactionDate: new Date(),
      totalAmount,
      transactionDetails: transactionDetailsDocs,
    });

    await transaction.save();

    reset.json({ message: "Transaction created successfully", transaction });
  } catch (err) {
    res.json({ message: "Failed to create transaction", error: err.message });
  }
};

// Get a transaction by ID
const getTransactionById = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const transaction = await Transaction.findById(transactionId)
      .populate("employee", "name")
      .populate("customer", "name")
      .populate("transactionDetails.service", "serviceName price");

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json(transaction);
  } catch (err) {
    res.json({ message: "Failed to retrieve transaction", error: err.message });
  }
};

// Get daily transactions
const getDailyTransactions = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const transactions = await Transaction.find({
      transactionDate: { $gte: today },
    })
      .populate("employee", "name")
      .populate("transactionDetails.service", "serviceName price");

    res.json(transactions);
  } catch (err) {
    res.json({
      message: "Failed to retrieve daily transactions",
      error: err.message,
    });
  }
};

// Get transactions by employee
const getTransactionsByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const transactions = await Transaction.find({ employee: employeeId })
      .populate("employee", "name")
      .populate("transactionDetails.service", "serviceName price");

    res.json(transactions);
  } catch (err) {
    res.json({
      message: "Failed to retrieve transactions",
      error: err.message,
    });
  }
};

module.exports = {
  createTransaction,
  getTransactionById,
  getDailyTransactions,
  getTransactionsByEmployee,
};
