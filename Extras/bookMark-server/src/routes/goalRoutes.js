const express = require("express");

const {
  createGoalController,
  addBookToGoalController,
  updateGoalProgressController,
} = require("../controllers/goalController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/createGoal", authMiddleware, createGoalController);
router.post("/:goalId/books", authMiddleware, addBookToGoalController);
router.patch("/:goalId/progress", authMiddleware, updateGoalProgressController);

module.exports = router;