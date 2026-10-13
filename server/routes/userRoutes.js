const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUserFavorites,
  updateSavedForm,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/update/:id", updateUserFavorites);
router.patch("/save-form/:id", updateSavedForm);

module.exports = router;
