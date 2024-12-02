const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Employee = require("../models/employee");

// Login logic
async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await Employee.findOne({ email });
    if (!user) return res.json({ error: "User not found" });

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) return res.json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (err) {
    res.json({ error: "Internal server error" });
  }
}

module.exports = { login };
