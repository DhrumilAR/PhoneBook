const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const userController = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");
const resetAuth = require("../middleware/resetMiddleware");

const router = express.Router();

router.get("/allUsers", userController.getAllUsers);
router.post("/register", auth, userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/logOut", validateToken, userController.logOut);
router.get("/current", validateToken, userController.currentUser);
router.delete("/deleteUser", validateToken, userController.deleteUser);
router.post("/forgotPassword", validateToken, userController.forgotPassword);
router.patch(
  "/resetPassword/:token",
  validateToken,
  resetAuth,
  userController.resetPassword
);

module.exports = router;
