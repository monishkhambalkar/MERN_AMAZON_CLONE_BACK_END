const express = require("express");
const shoppingController = require("../controllers/shoppingController");
const authMiddleware = require("../middleware/authMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");
const router = express.Router();

router.post(
  "/add-to-wishlist",
  authMiddleware,
  shoppingController.addToWishlist
);
router.post("/add-to-cart", authMiddleware, shoppingController.addToCart);
router.post("/checkout", authMiddleware, shoppingController.checkout);
router.post(
  "/process-payment",
  authMiddleware,
  validationMiddleware,
  shoppingController.processPayment
);

module.exports = router;
