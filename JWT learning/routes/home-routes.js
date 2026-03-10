const express = require("express");
const { welcomePage } = require("../controller/home-controller.js");
const { authMiddleware } = require("../middleware/auth-middleware");
const router = express.Router();

router.get("/welcome", authMiddleware, welcomePage);

module.exports = router;