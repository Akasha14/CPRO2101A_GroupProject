const Employee = require("../models/employee");
const Transaction = require("../models/transaction");

// Get all employees.
async function getAllEmployees(req, res) {
  try {
    const employees = await Employee.find().select("-passwordHash"); // Exclude password.
    res.json(employees);
  } catch (err) {
    res.json({ error: "Internal server error" });
  }
}

// Calculate total amount by employee.
async function getEmployeeEarnings(req, res) {
  const { employeeId } = req.params;
  try {
    const transactions = await Transaction.find({ employee: employeeId });
    const totalEarnings = transactions.reduce(
      (sum, t) => sum + parseFloat(t.totalAmount),
      0
    );
    res.json({ totalEarnings });
  } catch (err) {
    res.json({ error: "Internal server error" });
  }
}

module.exports = { getAllEmployees, getEmployeeEarnings };
