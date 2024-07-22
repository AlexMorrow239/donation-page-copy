const updatePayment = async (updatedPayment) => {
  const response = await fetch(
    "http://localhost:9000/api/payments/" + updatedPayment.email,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPayment),
    }
  );

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

  return response.json();
};

const fetchPayments = async () => {
  const response = await fetch("http://localhost:9000/api/payments/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    try {
      let res = await response.json();
      throw res.message || console.log(res);
    } catch (err) {
      const error = new Error("Something went wrong");
      throw new Error(error);
    }
  }

  const dataAPI = await response.json();
  return dataAPI.data;
};

const PaymentsService = {
  updatePayment,
  fetchPayments,
};

export default PaymentsService;
