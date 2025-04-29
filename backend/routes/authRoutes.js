const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// POST /api/auth/google
router.post("/google", authController.googleLogin);

module.exports = router;
