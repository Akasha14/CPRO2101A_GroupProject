const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1]; // Bearer Token
  if (!token) return res.json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach the user info to request
    next();
  } catch (err) {
    res.json({ error: "Invalid token" });
  }
}

module.exports = { authenticateToken };
