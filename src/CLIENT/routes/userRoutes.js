const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/sign-in", userController.signIn);
router.post("/sign-up", userController.signUp);
router.post("/logout", authMiddleware, userController.logout);

module.exports = router;
