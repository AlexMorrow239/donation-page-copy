// Exchange rates are fetched with a base currency of EUR
// MUST CONVERT FROM NATIVE TO EUR FIRST, THEN FROM EUR TO ZAR
const fetchExchangeRates = async () => {
  const response = await fetch("http://localhost:9000/api/currency-exchange", {
    method: "GET",
  });

  if (!response.ok) {
    try {
      let res = await response.json();
      throw res.message || JSON.stringify(res);
    } catch (err) {
      console.log(err);
      const error = new Error("Something went wrong");
      throw error.message;
    }
  }

  const exchangeRatesData = await response.json();
  return exchangeRatesData;
};

const updateExchangeRates = async (exchangeRates) => {
  const response = await fetch("http://localhost:9000/api/currency-exchange", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(exchangeRates),
  });

  if (!response.ok) {
    try {
      let res = await response.json();
      throw res.message || JSON.stringify(res);
    } catch (err) {
      console.log(err);
      const error = new Error("Something went wrong");
      throw error.message;
    }
  }
  const updatedExchangeRates = await response.json();
  return updatedExchangeRates;
};

const exchangeRatesService = {
  fetchExchangeRates,
  updateExchangeRates,
};

export default exchangeRatesService;
