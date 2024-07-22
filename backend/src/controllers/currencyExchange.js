const CurrencyExchange = require("../models/currencyExchangeModel");

const getCurrencyExchange = async (req, res) => {
  try {
    const currencyExchange = await CurrencyExchange.find();
    res.status(200).json({ message: "Rates fetched", data: currencyExchange });
  } catch (error) {
    res.status(500).json(error.message || error);
  }
};

const updateCurrencyExchange = async (req, res) => {
  try {
    const existingEntry = await CurrencyExchange.findOne({ success: true }); // Find the existing entry, if any
    const currentTimestamp = Math.floor(Date.now() / 1000); // Current UNIX timestamp in seconds

    // Get today's date in the format "YYYY-MM-DD"
    const today = new Date().toLocaleString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    if (existingEntry && existingEntry.timestamp) {
      const dbTimestamp = existingEntry.timestamp; // This should already be in UNIX timestamp format
      const timeDifference = currentTimestamp - dbTimestamp;
      if (timeDifference > 43200) {
        // If an entry exists and it is a new day, update it
        const response = await fetch(
          "http://api.exchangeratesapi.io/v1/latest?access_key=e34c7223d9712c02869f8ba7858393b3&base=EUR",
          {
            method: "GET",
          }
        );
        const data = await response.json();

        existingEntry.success = data.success;
        existingEntry.timestamp = data.timestamp;
        existingEntry.base = data.base;
        existingEntry.date = data.date;
        existingEntry.rates = data.rates;
        await existingEntry.save();
        console.log("rates updated");
        res.status(200).json({ message: "Rates updated", data: existingEntry });
      } else {
        // If an entry exists and it is the same day, return the existing entry
        res
          .status(200)
          .json({ message: "Rates already up to date", data: existingEntry });
      }
    } else {
      // If no entry exists, create a new one
      const response = await fetch(
        "http://api.exchangeratesapi.io/v1/latest?access_key=e34c7223d9712c02869f8ba7858393b3&base=EUR",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      const newEntry = new CurrencyExchange({
        success: data.success,
        timestamp: data.timestamp,
        base: data.base,
        date: data.date,
        rates: data.rates,
      });
      await newEntry.save();
      res.status(201).json({ message: "Rates created", data: newEntry });
    }
  } catch (error) {
    res.status(500).json(error.message || error);
  }
};

module.exports = {
  getCurrencyExchange,
  updateCurrencyExchange,
};
