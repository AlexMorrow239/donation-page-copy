const Goal = require("../models/goalModel");

const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find();
    res.status(200).json({
      message: "Get all goals",
      data: goals,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, data: {} });
  }
};

const getCurrentGoal = async (req, res) => {
  try {
    const goal = await Goal.findOne({ isCurrentGoal: true });
    res.status(200).json({
      message: "Get current goal",
      data: goal,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, data: {} });
  }
};

const createGoal = async (req, res) => {
  try {
    const goal = new Goal({
      goalAmount: req.body.goalAmount,
      currentTotal: req.body.currentTotal,
      isCurrentGoal: req.body.isCurrentGoal,
    });

    const newGoal = await goal.save();

    const goalRes = await Goal.findById(newGoal._id);

    res.status(200).json({
      message: "Goal created!",
      data: goalRes,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, data: {} });
  }
};

const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (goal) {
      goal.goalAmount = req?.body?.goalAmount || goal.goalAmount;
      goal.currentTotal = req?.body?.currentTotal || goal.currentTotal;
      goal.isCurrentGoal = req?.body?.isCurrentGoal || goal.isCurrentGoal;

      const updatedGoal = await goal.save();

      const goalRes = await Goal.findById(updatedGoal._id);

      res.status(200).json({ message: "Goal updated!", data: goalRes });
    } else {
      res.status(404).json({ message: "Goal not found!", data: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, data: {} });
  }
};

const updateCurrentGoal = async (req, res) => {
  try {
    const goal = await Goal.findOne({ isCurrentGoal: true });
    if (goal) {
      goal.goalAmount = req?.body?.goalAmount || goal.goalAmount;
      goal.currentTotal = req?.body?.currentTotal || goal.currentTotal;

      const updatedGoal = await goal.save();

      const goalRes = await Goal.findById(updatedGoal._id);

      res.status(200).json({ message: "Current goal updated!", data: goalRes });
    } else {
      res.status(404).json({ message: "No current goal!", data: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, data: {} });
  }
};

const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.id);
    if (goal) {
      return res
        .status(200)
        .json({ message: "Goal deleted!", id: req.params.id });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getGoals,
  getCurrentGoal,
  createGoal,
  updateGoal,
  deleteGoal,
  updateCurrentGoal,
};
