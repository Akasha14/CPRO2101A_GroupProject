const Customer = require("../models/customer");

// Add a new customer.
async function addCustomer(req, res) {
  const { firstName, lastName, phoneNumber, email } = req.body;
  try {
    const newCustomer = new Customer({
      firstName,
      lastName,
      phoneNumber,
      email,
    });
    await newCustomer.save();
    res.json({ message: "Customer added successfully" });
  } catch (err) {
    res.json({ error: "Internal server error" });
  }
}

// Search customers.
async function searchCustomer(req, res) {
  const { query } = req.query; // Example: ?query=John
  try {
    const customers = await Customer.find({
      $or: [
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
        { phoneNumber: { $regex: query, $options: "i" } },
      ],
    });
    res.json(customers);
  } catch (err) {
    res.json({ error: "Internal server error" });
  }
}

module.exports = { addCustomer, searchCustomer };
