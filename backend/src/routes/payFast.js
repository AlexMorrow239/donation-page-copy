const router = require("express").Router();
const payFastController = require("../controllers/payFast");

router.post("/itn", (req, res) => {
  payFastController.createTransaction(req, res);
});

module.exports = router;
