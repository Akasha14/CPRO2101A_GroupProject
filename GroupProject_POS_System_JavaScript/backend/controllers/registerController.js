async function register(req, res) {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const existingUser = await Employee.findOne({ email });
    if (existingUser) return res.json({ error: "Email already in use" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newEmployee = new Employee({
      firstName,
      lastName,
      email,
      passwordHash: hashedPassword,
      role,
    });

    await newEmployee.save();
    res.json({ message: "Employee registered successfully" });
  } catch (err) {
    res.json({ error: "Internal server error" });
  }
}
module.exports = { register };
