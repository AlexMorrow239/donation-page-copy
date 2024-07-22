const express = require("express");
const router = express.Router();
const {
  createGoal,
  getGoals,
  getCurrentGoal,
  updateGoal,
  deleteGoal,
  updateCurrentGoal,
} = require("../controllers/goal");

router.post("/", (req, res) => {
  createGoal(req, res);
});

router.get("/all", (req, res) => {
  getGoals(req, res);
});

router.get("/", (req, res) => {
  getCurrentGoal(req, res);
});

router.put("/:id", (req, res) => {
  updateGoal(req, res);
});

router.put("/", (req, res) => {
  updateCurrentGoal(req, res);
});

router.delete("/:id", (req, res) => {
  deleteGoal(req, res);
});

module.exports = router;
