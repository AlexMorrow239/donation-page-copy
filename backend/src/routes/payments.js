const express = require("express");
const router = express.Router();
const {
  createPayment,
  getPayments,
  getPayment,
  updatePayment,
  deletePayment,
} = require("../controllers/payments");

router.post("/", (req, res) => {
  createPayment(req, res);
});

router.get("/", (req, res) => {
  getPayments(req, res);
});

router.get("/:id", (req, res) => {
  getPayment(req, res);
});

router.put("/:email", (req, res) => {
  updatePayment(req, res);
});

router.delete("/:id", (req, res) => {
  deletePayment(req, res);
});

module.exports = router;
