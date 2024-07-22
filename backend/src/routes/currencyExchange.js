const express = require("express");
const router = express.Router();
const currencyExchange = require("../controllers/currencyExchange");

router.get("/", async (req, res) => {
  currencyExchange.getCurrencyExchange(req, res);
});

router.put("/", async (req, res) => {
  currencyExchange.updateCurrencyExchange(req, res);
});

module.exports = router;
