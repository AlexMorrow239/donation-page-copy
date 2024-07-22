const express = require("express");
const connectDB = require("./database/db");
require("dotenv").config();
const cors = require("cors");
const cron = require("node-cron");
const bodyParser = require("body-parser");
const {
  exportToExcelByYear,
  exportToExcelNewData,
} = require("./exports/taxFormExport.js");

connectDB();

const app = express();
const port = process.env.PORT || 8000;

// Middleware to parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to parse application/json
app.use(bodyParser.json());

// Middleware to log raw response data for debugging
app.use(express.json());
// Middleware to enable CORS
app.use(cors());

//Routes for production
app.use("/api/currency-exchange", require("./routes/currencyExchange"));
app.use("/api/payfast", require("./routes/payFast"));

//Routes for backend use
app.use("/api/users", require("./routes/users"));
app.use("/api/payments", require("./routes/payments"));
app.use("/api/goal", require("./routes/goal"));

//manual exporter route
//NOTE: manual exporter only gets all data from the current year
app.get("/export", (req, res) => {
  exportToExcelByYear(new Date().getFullYear())
    .then(() => res.send('Export completed!'))
    .catch(err => res.status(500).send('Export failed: ' + err.message));
});

//export scheduler
//exports all data from today
//this is not tested! must be tested on deploy
cron.schedule("0 0 * * *", async () => {
  console.log("Running daily export task");
  try {
    await exportToExcelNewData();
    console.log("Export completed successfully.");
  } catch (err) {
    console.error("Failed to complete export:", err);
  }
});

app.listen(port, () => {
  console.log(`Donation app listening on port ${port}`);
});
