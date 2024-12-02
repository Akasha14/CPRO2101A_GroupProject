const express = require("express");
const { login } = require("../controllers/loginController");
const { register } = require("../controllers/registerController");

const router = express.Router();

router.post("/login", login);
router.post("/register", register); // Admin can use this route to register new staff.

module.exports = router;
