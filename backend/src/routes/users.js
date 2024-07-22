const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

router.post("/", (req, res) => {
  createUser(req, res);
});

router.get("/", (req, res) => {
  getUsers(req, res);
});

router.get("/:id", (req, res) => {
  getUser(req, res);
});

router.put("/:id", (req, res) => {
  updateUser(req, res);
});

router.delete("/:id", (req, res) => {
  deleteUser(req, res);
});

module.exports = router;
